"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';
import Menu from './menu';

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  order: number;
  isAvailable: boolean;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  order: number;
  isActive: boolean;
  items: MenuItem[];
}

async function getMenuData(): Promise<Category[]> {
  try {
    // 1. Obtener metadata de categorías (ordenadas por 'order')
    const categoriesMetaRef = collection(db, '_categoriesMeta');
    const categoriesMetaSnapshot = await getDocs(query(categoriesMetaRef, orderBy('order')));
    
    const categories: Category[] = [];
    
    // 2. Para cada categoría, obtener sus ítems
    for (const categoryDoc of categoriesMetaSnapshot.docs) {
      const categoryData = categoryDoc.data();
      const categoryId = categoryDoc.id;
      
      // Usar el categoryId directamente (kebab-case: cafe-caliente)
      const collectionName = categoryId;
      
      // Obtener ítems de la categoría (ordenados por 'orden' en español)
      const itemsRef = collection(db, collectionName);
      const itemsSnapshot = await getDocs(query(itemsRef, orderBy('orden')));
      
      // Mapear campos de español a inglés para el frontend
      const items: MenuItem[] = itemsSnapshot.docs
        .filter(doc => doc.data().isAvailable !== false)
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.nombre || '',
            description: data.descripcion || '',
            price: data.precio || 0,
            order: data.orden || 0,
            isAvailable: data.isAvailable !== false,
            categoryId: data.categoryId || categoryId
          };
        });
      
      if (categoryData.isActive && items.length > 0) {
        categories.push({
          id: categoryId,
          name: categoryData.displayName || categoryData.name || '',
          order: categoryData.order || 0,
          isActive: categoryData.isActive,
          items
        });
      }
    }
    
    return categories;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return [];
  }
}

export default function MenuWrapper() {
  const [menuData, setMenuData] = useState<Category[]>([]);

  useEffect(() => {
    const loadMenuData = async () => {
      const data = await getMenuData();
      setMenuData(data);
    };

    loadMenuData();
  }, []);

  return <Menu categories={menuData} />;
}
