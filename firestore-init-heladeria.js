const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey-fillipo.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const HELADERIA_CATEGORIES = [
  { id: 'heladeria-cremas',         displayName: 'CREMAS',         order: 1 },
  { id: 'heladeria-chocolates',     displayName: 'CHOCOLATES',     order: 2 },
  { id: 'heladeria-dulces',         displayName: 'DULCES',         order: 3 },
  { id: 'heladeria-frutales',       displayName: 'FRUTALES',       order: 4 },
  { id: 'heladeria-nuevos-sabores', displayName: 'NUEVOS SABORES', order: 5 },
];

const HELADERIA_FLAVORS = {
  'heladeria-cremas': [
    'Almendrado','Amarena Italiana','Banana','Banana Split','Bananita Dolca',
    'Café Expresso','Cereza a la Crema','Coco','Crema Americana','Crema del Cielo',
    'Crema Flan','Crema Granizada','Crema Havana','Crema Marroc','Crema Nutella',
    'Crema Oreo','Crema Rusa','Frutilla a la Crema','Frutilla a la Reina',
    'Frutos del Bosque','Kinotos al Whisky','Mantecol','Mascarpone',
    'Menta Granizada','Mousse de Limón','Mousse de Maracuyá','Pistacho',
    'Sambayón','Sambayón con Almendras','Tiramisú','Tramontana','Vainilla',
  ],
  'heladeria-chocolates': [
    'Chocolate','Chocolate Amargo','Chocolate Bariloche','Chocolate Blanco',
    'Chocolate Cabsha','Chocolate con Almendras','Chocolate Ferrero',
    'Chocolate Fillippo','Chocolate Suizo',
  ],
  'heladeria-dulces': [
    'Dulce de Leche','Dulce de Leche c/Almendras','Dulce de Leche c/Brownies',
    'Dulce de Leche c/Nuez','Dulce de Leche Fillippo','Dulce de Leche Granizado',
    'Super Dulce de Leche',
  ],
  'heladeria-frutales': [
    'Ananá','Durazno','Frambuesa','Frutilla','Limón','Manzana','Melón','Naranja',
  ],
  'heladeria-nuevos-sabores': [
    'Choco Dubai','Creme Brulee','Lemon Cookies','Mousse de Mango',
    'Pomelo con Menta y Jengibre','Kinder','Franui','Baileys','Pino Pinguino',
  ],
};

function toId(name) {
  return name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

async function initHeladeria() {
  console.log('Inicializando menu de heladeria en Firestore...\n');
  let total = 0;
  for (const cat of HELADERIA_CATEGORIES) {
    await db.collection('_heladeriaCategories').doc(cat.id).set({
      displayName: cat.displayName,
      order: cat.order,
      isActive: true,
    });
    console.log('Categoria: ' + cat.displayName);
    const flavors = HELADERIA_FLAVORS[cat.id] || [];
    for (let i = 0; i < flavors.length; i++) {
      const nombre = flavors[i];
      await db.collection(cat.id).doc(toId(nombre)).set({
        nombre,
        orden: i + 1,
        isAvailable: true,
        categoryId: cat.id,
      });
      console.log('  - ' + nombre);
      total++;
    }
  }
  console.log('\nHeladeria lista: ' + HELADERIA_CATEGORIES.length + ' categorias, ' + total + ' gustos.');
  process.exit(0);
}

initHeladeria().catch(e => { console.error(e); process.exit(1); });
