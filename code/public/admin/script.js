// ==================== ESTADO GLOBAL ====================
let currentUser = null;
let categories = [];
let categoriesData = new Map(); // Map<categoryId, items[]>

// ==================== ELEMENTOS DEL DOM ====================
const loginPage = document.getElementById('loginPage');
const dashboardPage = document.getElementById('dashboardPage');
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const userEmail = document.getElementById('userEmail');
const loadingState = document.getElementById('loadingState');
const categoriesContainer = document.getElementById('categoriesContainer');

// ==================== AUTENTICACIÓN ====================

// Observador de estado de autenticación
auth.onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
    showDashboard();
    loadMenuData();
  } else {
    currentUser = null;
    showLogin();
  }
});

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  loginBtn.disabled = true;
  loginBtn.textContent = 'Iniciando sesión...';
  loginError.classList.add('hidden');
  
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.error('Error en login:', error);
    loginError.textContent = getErrorMessage(error.code);
    loginError.classList.remove('hidden');
    loginBtn.disabled = false;
    loginBtn.textContent = 'Iniciar Sesión';
  }
});

// Logout
logoutBtn.addEventListener('click', async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Error en logout:', error);
    alert('Error al cerrar sesión');
  }
});

// ==================== NAVEGACIÓN ====================

function showLogin() {
  loginPage.classList.remove('hidden');
  dashboardPage.classList.add('hidden');
}

function showDashboard() {
  loginPage.classList.add('hidden');
  dashboardPage.classList.remove('hidden');
  userEmail.textContent = currentUser.email;
}

// ==================== CARGA DE DATOS ====================

async function loadMenuData() {
  try {
    loadingState.classList.remove('hidden');
    categoriesContainer.classList.add('hidden');
    
    // 1. Cargar metadata de categorías
    const categoriesSnapshot = await db.collection('_categoriesMeta')
      .orderBy('order')
      .get();
    
    categories = [];
    categoriesSnapshot.forEach(doc => {
      categories.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // 2. Cargar ítems de cada categoría
    categoriesData.clear();
    
    for (const category of categories) {
      const itemsSnapshot = await db.collection(category.id)
        .orderBy('orden')
        .get();
      
      const items = [];
      itemsSnapshot.forEach(doc => {
        items.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      categoriesData.set(category.id, items);
    }
    
    // 3. Renderizar
    renderCategories();
    
    loadingState.classList.add('hidden');
    categoriesContainer.classList.remove('hidden');
    
  } catch (error) {
    console.error('Error cargando datos:', error);
    alert('Error al cargar los datos del menú');
    loadingState.classList.add('hidden');
  }
}

// ==================== RENDERIZADO ====================

function renderCategories() {
  categoriesContainer.innerHTML = '';
  
  categories.forEach(category => {
    const items = categoriesData.get(category.id) || [];
    const categoryCard = createCategoryCard(category, items);
    categoriesContainer.appendChild(categoryCard);
  });
}

function createCategoryCard(category, items) {
  const card = document.createElement('div');
  card.className = 'category-card';
  card.dataset.categoryId = category.id;
  
  card.innerHTML = `
    <div class="category-header">
      <div class="category-title-group">
        <span 
          class="category-icon editable-icon" 
          onclick="editCategoryIcon('${category.id}')"
          title="Clic para cambiar emoji"
        >${category.icon || '📁'}</span>
        <h3 class="category-name">${category.displayName}</h3>
      </div>
      <div class="category-order">
        <span>Orden:</span>
        <input 
          type="number" 
          class="order-input" 
          value="${category.order}" 
          min="1"
          data-category-id="${category.id}"
          onchange="updateCategoryOrder('${category.id}', this.value)"
        >
      </div>
    </div>
    
    <div class="category-actions">
      <button class="btn btn-add" onclick="addNewItem('${category.id}')">
        + Agregar Ítem
      </button>
    </div>
    
    <div class="items-container">
      ${items.length > 0 ? createItemsTable(category.id, items) : createEmptyState()}
    </div>
  `;
  
  return card;
}

function createItemsTable(categoryId, items) {
  const itemsHtml = items.map(item => {
    const nombre = escapeHtml(item.nombre || '');
    const description = escapeHtml(item.descripcion || '');
    const isMobile = window.innerWidth <= 768;
    const needsTruncate = description.length > 50 && isMobile;
    
    return `
    <tr data-item-id="${item.id}">
      <td class="item-name-cell">${nombre}</td>
      <td class="item-description-cell">
        <span 
          class="editable-description" 
          onclick="editDescription('${categoryId}', '${item.id}')"
          data-description="${description}"
          title="Clic para editar descripción"
        >
          <span class="item-description-text ${needsTruncate ? 'truncated' : ''}" data-full-text="${description}">
            ${description}
          </span>
          ${needsTruncate ? `<span class="description-toggle" onclick="event.stopPropagation(); toggleDescription(this)">ver más</span>` : ''}
        </span>
      </td>
      <td>
        <span 
          class="editable-price" 
          onclick="editPrice('${categoryId}', '${item.id}')"
          data-price="${item.precio}"
        >
          $${formatPrice(item.precio)}
        </span>
      </td>
      <td class="actions-cell">
        <button 
          class="btn-icon btn-danger" 
          onclick="deleteItem('${categoryId}', '${item.id}', '${nombre}')"
          title="Eliminar"
        >
          🗑️
        </button>
      </td>
    </tr>
  `;
  }).join('');
  
  return `
    <table class="items-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th style="text-align: right;">Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>
  `;
}

function createEmptyState() {
  return `
    <div class="empty-state">
      <div class="empty-state-icon">📋</div>
      <p class="empty-state-text">No hay ítems en esta categoría. Hacé clic en "Agregar Ítem" para empezar.</p>
    </div>
  `;
}

// ==================== OPERACIONES CRUD ====================

// Editar icono/emoji de categoría
window.editCategoryIcon = async function(categoryId) {
  const category = categories.find(c => c.id === categoryId);
  if (!category) return;
  
  const currentIcon = category.icon || '';
  const newIcon = prompt(
    `Emoji/Ícono para "${category.displayName}"\n\nIngresá un emoji o dejá vacío para sin ícono:`,
    currentIcon
  );
  
  // Si el usuario cancela, no hacer nada
  if (newIcon === null) return;
  
  try {
    await db.collection('_categoriesMeta').doc(categoryId).update({
      icon: newIcon.trim()
    });
    
    await loadMenuData();
  } catch (error) {
    console.error('Error actualizando ícono:', error);
    alert('Error al actualizar el ícono de la categoría');
  }
};

// Actualizar orden de categoría
window.updateCategoryOrder = async function(categoryId, newOrder) {
  try {
    const order = parseInt(newOrder);
    if (isNaN(order) || order < 1) {
      alert('El orden debe ser un número mayor a 0');
      await loadMenuData();
      return;
    }
    
    await db.collection('_categoriesMeta').doc(categoryId).update({
      order: order
    });
    
    await loadMenuData();
  } catch (error) {
    console.error('Error actualizando orden:', error);
    alert('Error al actualizar el orden de la categoría');
  }
};

// Editar precio inline
window.editPrice = function(categoryId, itemId) {
  const priceSpan = event.target;
  const currentPrice = priceSpan.dataset.price;
  
  const input = document.createElement('input');
  input.type = 'number';
  input.className = 'price-input';
  input.value = currentPrice;
  input.step = '0.01';
  input.min = '0';
  
  input.onblur = async function() {
    const newPrice = parseFloat(this.value);
    
    if (isNaN(newPrice) || newPrice < 0) {
      alert('El precio debe ser un número válido');
      priceSpan.style.display = 'inline-block';
      this.remove();
      return;
    }
    
    try {
      await db.collection(categoryId).doc(itemId).update({
        precio: newPrice
      });
      
      priceSpan.textContent = `$${formatPrice(newPrice)}`;
      priceSpan.dataset.price = newPrice;
      priceSpan.style.display = 'inline-block';
      this.remove();
      
      // Actualizar en memoria
      const items = categoriesData.get(categoryId);
      const item = items.find(i => i.id === itemId);
      if (item) {
        item.precio = newPrice;
      }
    } catch (error) {
      console.error('Error actualizando precio:', error);
      alert('Error al actualizar el precio');
      priceSpan.style.display = 'inline-block';
      this.remove();
    }
  };
  
  input.onkeydown = function(e) {
    if (e.key === 'Enter') {
      this.blur();
    } else if (e.key === 'Escape') {
      priceSpan.style.display = 'inline-block';
      this.remove();
    }
  };
  
  priceSpan.style.display = 'none';
  priceSpan.parentNode.insertBefore(input, priceSpan);
  input.focus();
  input.select();
};

// Editar descripción inline
window.editDescription = function(categoryId, itemId) {
  const descSpan = event.target;
  const currentDesc = descSpan.dataset.description;
  
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'description-input';
  input.value = currentDesc;
  input.placeholder = 'Descripción opcional';
  
  input.onblur = async function() {
    const newDesc = this.value.trim();
    
    try {
      await db.collection(categoryId).doc(itemId).update({
        descripcion: newDesc
      });
      
      descSpan.textContent = newDesc;
      descSpan.dataset.description = newDesc;
      descSpan.style.display = 'inline-block';
      this.remove();
      
      // Actualizar en memoria
      const items = categoriesData.get(categoryId);
      const item = items.find(i => i.id === itemId);
      if (item) {
        item.descripcion = newDesc;
      }
    } catch (error) {
      console.error('Error actualizando descripción:', error);
      alert('Error al actualizar la descripción');
      descSpan.style.display = 'inline-block';
      this.remove();
    }
  };
  
  input.onkeydown = function(e) {
    if (e.key === 'Enter') {
      this.blur();
    } else if (e.key === 'Escape') {
      descSpan.style.display = 'inline-block';
      this.remove();
    }
  };
  
  descSpan.style.display = 'none';
  descSpan.parentNode.insertBefore(input, descSpan);
  input.focus();
  input.select();
};

// Agregar nuevo ítem
window.addNewItem = async function(categoryId) {
  const nombre = prompt('Nombre del ítem:');
  if (!nombre || nombre.trim() === '') return;
  
  const descripcion = prompt('Descripción (opcional):') || '';
  const precioStr = prompt('Precio:', '9999');
  const precio = parseFloat(precioStr);
  
  if (isNaN(precio) || precio < 0) {
    alert('El precio debe ser un número válido');
    return;
  }
  
  try {
    // Obtener el orden más alto actual
    const items = categoriesData.get(categoryId) || [];
    const maxOrder = items.length > 0 
      ? Math.max(...items.map(i => i.orden || 0))
      : 0;
    
    await db.collection(categoryId).add({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: precio,
      orden: maxOrder + 1
    });
    
    await loadMenuData();
  } catch (error) {
    console.error('Error agregando ítem:', error);
    alert('Error al agregar el ítem');
  }
};

// Eliminar ítem
window.deleteItem = async function(categoryId, itemId, itemName) {
  const confirmed = confirm(`¿Estás seguro que querés eliminar "${itemName}"?`);
  if (!confirmed) return;
  
  try {
    await db.collection(categoryId).doc(itemId).delete();
    await loadMenuData();
  } catch (error) {
    console.error('Error eliminando ítem:', error);
    alert('Error al eliminar el ítem');
  }
};

// ==================== UTILIDADES ====================

function formatPrice(price) {
  return price.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

// Toggle description expansion (mobile)
window.toggleDescription = function(toggleElement) {
  const descriptionText = toggleElement.previousElementSibling;
  const isExpanded = descriptionText.classList.contains('expanded');
  
  if (isExpanded) {
    descriptionText.classList.remove('expanded');
    descriptionText.classList.add('truncated');
    toggleElement.textContent = 'ver más';
  } else {
    descriptionText.classList.remove('truncated');
    descriptionText.classList.add('expanded');
    toggleElement.textContent = 'ver menos';
  }
};

function getErrorMessage(errorCode) {
  const messages = {
    'auth/invalid-email': 'El email no es válido',
    'auth/user-disabled': 'Este usuario ha sido deshabilitado',
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/invalid-credential': 'Credenciales inválidas',
    'auth/too-many-requests': 'Demasiados intentos. Intentá más tarde',
    'auth/network-request-failed': 'Error de conexión. Verificá tu internet'
  };
  
  return messages[errorCode] || 'Error al iniciar sesión. Intentá nuevamente.';
}

// ==================== INICIALIZACIÓN ====================

console.log('☕ Ludlow Coffee House - Panel de Administración cargado');
