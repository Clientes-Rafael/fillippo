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
    return 0;
  }

  console.log(`🗑️  Borrando ${snapshot.size} documentos de "${collectionName}"...`);
  
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  
  await batch.commit();
  console.log(`✅ Borrada colección: ${collectionName}`);
  return snapshot.size;
}

async function cleanEverything() {
  console.log('🔥 LIMPIEZA COMPLETA DE FIRESTORE\n');
  
  let totalDeleted = 0;
  
  // Listar todas las colecciones
  const allCollections = await db.listCollections();
  
  console.log('📂 Colecciones encontradas:');
  allCollections.forEach(col => console.log(`   - ${col.id}`));
  
  console.log('\n🗑️  Borrando TODAS las colecciones...\n');
  
  for (const collection of allCollections) {
    try {
      const deleted = await deleteCollection(collection.id);
      totalDeleted += deleted;
    } catch (error) {
      console.log(`❌ Error borrando ${collection.id}:`, error.message);
    }
  }
  
  console.log(`\n✅ Limpieza completada: ${totalDeleted} documentos borrados`);
  console.log('📊 La base de datos está completamente vacía\n');
  process.exit(0);
}

cleanEverything().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
