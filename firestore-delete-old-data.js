const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey-fillipo.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function deleteCollection(collectionName) {
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.get();
  
  if (snapshot.empty) {
    console.log(`⚠️  Colección "${collectionName}" está vacía o no existe`);
    return;
  }

  console.log(`🗑️  Borrando ${snapshot.size} documentos de "${collectionName}"...`);
  
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  
  await batch.commit();
  console.log(`✅ Borrada colección: ${collectionName}`);
}

async function listAllCollections() {
  const collections = await db.listCollections();
  console.log('\n📂 Colecciones encontradas en Firestore:');
  collections.forEach(collection => {
    console.log(`   - ${collection.id}`);
  });
  return collections.map(c => c.id);
}

async function cleanDatabase() {
  console.log('🔍 Escaneando base de datos...\n');
  
  // Listar todas las colecciones
  const allCollections = await listAllCollections();
  
  // Identificar colecciones que NO son de Fillipo
  const fillipoCollections = [
    '_categoriesMeta',
    'CafeCaliente',
    'Especiales',
    'Frappes',
    'Smoothies',
    'ParaAcompanar',
    'Waffles',
    'Promociones',
    'Adicionales',
    'TortasIndividuales',
    'Bizcochuelos',
    'BebidasFrias',
    'JugosEspeciales'
  ];
  
  const collectionsToDelete = allCollections.filter(
    col => !fillipoCollections.includes(col)
  );
  
  if (collectionsToDelete.length === 0) {
    console.log('\n✅ No hay colecciones antiguas para borrar');
    process.exit(0);
  }
  
  console.log('\n🗑️  Colecciones a borrar:');
  collectionsToDelete.forEach(col => console.log(`   ❌ ${col}`));
  
  console.log('\n🔥 Iniciando limpieza...\n');
  
  for (const collection of collectionsToDelete) {
    try {
      await deleteCollection(collection);
    } catch (error) {
      console.log(`❌ Error borrando ${collection}:`, error.message);
    }
  }
  
  console.log('\n✅ Limpieza completada');
  console.log('🔄 Recargá el admin panel para ver los cambios\n');
  process.exit(0);
}

cleanDatabase().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
