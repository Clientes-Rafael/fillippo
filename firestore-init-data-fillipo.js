const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey-fillipo.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// ==================== DATOS DEL MENÚ FILLIPO ====================

const FILLIPO_CATEGORIES = [
  { id: 'cafe-caliente', displayName: 'CAFÉ CALIENTE', order: 1 },
  { id: 'especiales', displayName: 'ESPECIALES', order: 2 },
  { id: 'frappes', displayName: 'FRAPPES', order: 3 },
  { id: 'smoothies', displayName: 'SMOOTHIES', order: 4 },
  { id: 'para-acompanar', displayName: 'PARA ACOMPAÑAR', order: 5 },
  { id: 'waffles', displayName: 'WAFFLES', order: 6 },
  { id: 'promociones', displayName: 'PROMOCIONES', order: 7 },
  { id: 'adicionales', displayName: 'ADICIONALES', order: 8 },
  { id: 'tortas-individuales', displayName: 'TORTAS INDIVIDUALES', order: 9 },
  { id: 'bizcochuelos', displayName: 'BIZCOCHUELOS', order: 10 },
  { id: 'bebidas-frias', displayName: 'BEBIDAS FRÍAS', order: 11 },
  { id: 'jugos-especiales', displayName: 'JUGOS ESPECIALES', order: 12 }
];

const FILLIPO_MENU_ITEMS = {
  'cafe-caliente': [
    { nombre: 'Pocillo', descripcion: 'Café con leche / Espresso / Cortado / Lágrima', precio: 2800, orden: 1 },
    { nombre: 'Jarrito', descripcion: 'Café con leche / Espresso / Cortado / Lágrima', precio: 3000, orden: 2 },
    { nombre: 'Doble', descripcion: 'Café con leche / Espresso / Cortado / Lágrima', precio: 3500, orden: 3 }
  ],
  'especiales': [
    { nombre: 'Ristreto', descripcion: '', precio: 2800, orden: 1 },
    { nombre: 'Capucchino', descripcion: '', precio: 4400, orden: 2 },
    { nombre: 'Mokacchino', descripcion: 'Con salsa de chocolate', precio: 5000, orden: 3 },
    { nombre: 'Caramel macchiato', descripcion: 'Con salsa de caramelo', precio: 5000, orden: 4 },
    { nombre: 'Pistacchino', descripcion: 'Con salsa de pistacho', precio: 5000, orden: 5 },
    { nombre: 'Submarino', descripcion: '', precio: 3800, orden: 6 },
    { nombre: 'Chocolatada', descripcion: '', precio: 3800, orden: 7 },
    { nombre: 'Té', descripcion: '', precio: 3500, orden: 8 },
    { nombre: 'Matecocido', descripcion: '', precio: 3500, orden: 9 },
    { nombre: 'Té con leche', descripcion: '', precio: 3800, orden: 10 },
    { nombre: 'Affogato', descripcion: '', precio: 4700, orden: 11 }
  ],
  'frappes': [
    { nombre: 'Frappuccino Común', descripcion: 'Helado de café, Leche, Decorado con crema batida y salsa', precio: 6400, orden: 1 },
    { nombre: 'Frappuccino Moka', descripcion: 'Helado de café, Helado de chocolate, Leche, Decorado con crema batida y salsa', precio: 6400, orden: 2 },
    { nombre: 'Frappuccino Caramel', descripcion: 'Helado de café, Helado de vainilla, Leche, Decorado con crema batida y salsa', precio: 6400, orden: 3 },
    { nombre: 'Frappuccino Dulce de Leche', descripcion: 'Helado de café, Helado de dulce de leche, Leche, Decorado con crema batida y salsa', precio: 6400, orden: 4 },
    { nombre: 'Frappuccino Avellana', descripcion: 'Helado de café, Helado de Nutella, Leche, Decorado con crema batida y salsa', precio: 6400, orden: 5 },
    { nombre: 'Frappuccino Blanco', descripcion: 'Helado de café, Helado de chocolate blanco, Leche, Decorado con crema batida y salsa', precio: 6400, orden: 6 },
    { nombre: 'Frappuccino Pistacho', descripcion: 'Helado de café, Helado de pistacho, Leche, Decorado con crema batida y salsa', precio: 6400, orden: 7 }
  ],
  'smoothies': [
    { nombre: 'N° 1 Cool mango', descripcion: 'Mango, Durazno, Frutilla', precio: 6800, orden: 1 },
    { nombre: 'N° 2 Ananá groove', descripcion: 'Ananá, Banana, Durazno', precio: 6800, orden: 2 },
    { nombre: 'N° 3 Passion blend', descripcion: 'Maracuyá, Ananá, Durazno', precio: 6800, orden: 3 },
    { nombre: 'N° 4 Vitalight', descripcion: 'Durazno, Ananá, Frutilla', precio: 6800, orden: 4 },
    { nombre: 'N° 5 Power mix', descripcion: 'Granada, Frutilla, Banana', precio: 6800, orden: 5 },
    { nombre: 'N° 6 Sublime', descripcion: 'Kiwi, Ananá, Durazno', precio: 6800, orden: 6 },
    { nombre: 'N° 7 Blueberry sunset', descripcion: 'Arándano, Frutilla, Banana', precio: 6800, orden: 7 }
  ],
  'para-acompanar': [
    { nombre: 'Tostado de miga', descripcion: '', precio: 6900, orden: 1 },
    { nombre: 'Tostado de pan árabe', descripcion: '', precio: 7100, orden: 2 },
    { nombre: 'Tostadas de pan de campo', descripcion: '', precio: 7000, orden: 3 },
    { nombre: 'Medialunas', descripcion: '', precio: 1400, orden: 4 },
    { nombre: 'Churros', descripcion: 'Con chocolate y dulce de leche caliente', precio: 5700, orden: 5 },
    { nombre: 'Masas secas', descripcion: 'Por 1/4kg', precio: 6100, orden: 6 },
    { nombre: 'Yogurt griego', descripcion: 'Con frutas frescas y granola', precio: 8400, orden: 7 },
    { nombre: 'Macarons', descripcion: '', precio: 2100, orden: 8 }
  ],
  'waffles': [
    { nombre: 'Waffle con helado y frutas frescas', descripcion: '', precio: 8600, orden: 1 },
    { nombre: 'Waffle con helado y topping de chocolate', descripcion: '', precio: 8600, orden: 2 },
    { nombre: 'Waffle con dulce de leche', descripcion: '', precio: 7500, orden: 3 }
  ],
  'promociones': [
    { nombre: 'Café con leche y dos medialunas', descripcion: '', precio: 5900, orden: 1 },
    { nombre: 'Café con leche y tostado de miga', descripcion: '', precio: 9700, orden: 2 }
  ],
  'adicionales': [
    { nombre: 'Crema', descripcion: '', precio: 700, orden: 1 },
    { nombre: 'Helado', descripcion: '', precio: 2900, orden: 2 }
  ],
  'tortas-individuales': [
    { nombre: 'Cheesecake de maracuyá', descripcion: '', precio: 6600, orden: 1 },
    { nombre: 'Cheesecake de frutos rojos', descripcion: '', precio: 6600, orden: 2 },
    { nombre: 'Cheesecake de pistacho', descripcion: '', precio: 6600, orden: 3 },
    { nombre: 'Cheesecake de Nutella', descripcion: '', precio: 6600, orden: 4 },
    { nombre: 'Torta Oreo', descripcion: '', precio: 6600, orden: 5 },
    { nombre: 'Mousse de tres chocolates', descripcion: 'Chocolate semiamargo, con leche y blanco', precio: 6600, orden: 6 },
    { nombre: 'Tiramisú', descripcion: '', precio: 6600, orden: 7 },
    { nombre: 'Chocotorta', descripcion: '', precio: 6600, orden: 8 },
    { nombre: 'Brownie', descripcion: 'Con dulce de leche y merengue italiano', precio: 6600, orden: 9 },
    { nombre: 'Crumble de manzana', descripcion: '', precio: 6100, orden: 10 },
    { nombre: 'Ricota y dulce de leche', descripcion: '', precio: 6900, orden: 11 }
  ],
  'bizcochuelos': [
    { nombre: 'Bizcochuelo de manzana', descripcion: 'Por porción - Invertida de manzana con base de membrillo', precio: 4800, orden: 1 },
    { nombre: 'Marmolada', descripcion: 'Vainilla y chocolate con base de dulce de leche', precio: 4800, orden: 2 },
    { nombre: 'Bizcochuelo de naranja', descripcion: 'Bizcochuelo húmedo de naranja con rodajas de naranja', precio: 4800, orden: 3 },
    { nombre: 'Lemonie', descripcion: 'Cuadrado húmedo de limón', precio: 5800, orden: 4 },
    { nombre: 'Brownie', descripcion: '', precio: 6100, orden: 5 },
    { nombre: 'Budín de frutos secos', descripcion: '', precio: 4400, orden: 6 },
    { nombre: 'Budín de limón', descripcion: '', precio: 4400, orden: 7 }
  ],
  'bebidas-frias': [
    { nombre: 'Milkshake', descripcion: 'Hasta dos gustos de helado a elección', precio: 7600, orden: 1 },
    { nombre: 'Batidos frutales de agua', descripcion: 'Hechos con helados', precio: 5700, orden: 2 },
    { nombre: 'Licuados', descripcion: 'Frutilla / Banana / Durazno', precio: 6300, orden: 3 },
    { nombre: 'Jugo de naranja', descripcion: 'Citric', precio: 5000, orden: 4 },
    { nombre: 'Gaseosa', descripcion: '', precio: 3400, orden: 5 },
    { nombre: 'Agua saborizada', descripcion: '', precio: 3400, orden: 6 },
    { nombre: 'Agua mineral', descripcion: '', precio: 3200, orden: 7 }
  ],
  'jugos-especiales': [
    { nombre: 'Energético', descripcion: 'Jugo de naranja, pomelo, menta, jengibre y miel', precio: 5900, orden: 1 },
    { nombre: 'Pomelada', descripcion: 'Base de helado de pomelo con menta y jengibre', precio: 5900, orden: 2 },
    { nombre: 'Limonada', descripcion: 'Base de helado de limón con menta y jengibre', precio: 5900, orden: 3 }
  ]
};

// ==================== FUNCIONES DE INICIALIZACIÓN ====================

async function initializeFirestore() {
  console.log('🔥 Inicializando Firestore con datos de Fillipo...\n');

  try {
    // 1. Crear metadatos de categorías en _categoriesMeta
    console.log('📁 Creando metadatos de categorías...');
    for (const category of FILLIPO_CATEGORIES) {
      await db.collection('_categoriesMeta').doc(category.id).set({
        displayName: category.displayName,
        order: category.order,
        isActive: true
      });
      console.log(`   ✅ ${category.displayName} (orden: ${category.order})`);
    }

    console.log('\n🍽️ Agregando ítems del menú...\n');

    // 2. Crear colecciones por categoría con sus ítems
    for (const category of FILLIPO_CATEGORIES) {
      const categoryId = category.id;
      // Usar el categoryId directamente como nombre de colección (kebab-case)
      const collectionName = categoryId;

      const items = FILLIPO_MENU_ITEMS[categoryId] || [];
      
      console.log(`📂 Categoría: ${category.displayName} (${items.length} ítems)`);

      for (const item of items) {
        const itemId = item.nombre.toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remover acentos
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');

        await db.collection(collectionName).doc(itemId).set({
          nombre: item.nombre,
          descripcion: item.descripcion || '',
          precio: item.precio,
          orden: item.orden,
          isAvailable: true,
          categoryId: categoryId
        });

        console.log(`   ✓ ${item.nombre} - $${item.precio}`);
      }
      console.log('');
    }

    console.log('✅ ¡Inicialización completada exitosamente!\n');
    console.log('📊 Resumen:');
    console.log(`   - Categorías: ${FILLIPO_CATEGORIES.length}`);
    console.log(`   - Ítems totales: ${Object.values(FILLIPO_MENU_ITEMS).reduce((sum, items) => sum + items.length, 0)}`);
    console.log('\n🎉 El menú de Fillipo está listo en Firestore!\n');

  } catch (error) {
    console.error('❌ Error durante la inicialización:', error);
    process.exit(1);
  }
}

// Ejecutar la inicialización
initializeFirestore()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
