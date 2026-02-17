"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';
import IceCreamMenu from './IceCreamMenu';

export interface IceCreamFlavor {
  id: string;
  name: string;
  order: number;
  isAvailable: boolean;
  categoryId: string;
}

export interface IceCreamCategory {
  id: string;
  name: string;
  order: number;
  isActive: boolean;
  flavors: IceCreamFlavor[];
}

async function getHeladeriaData(): Promise<IceCreamCategory[]> {
  try {
    const metaSnap = await getDocs(
      query(collection(db, '_heladeriaCategories'), orderBy('order'))
    );
    const categories: IceCreamCategory[] = [];

    for (const catDoc of metaSnap.docs) {
      const catData = catDoc.data();
      const catId = catDoc.id;

      const flavorsSnap = await getDocs(
        query(collection(db, catId), orderBy('orden'))
      );

      const flavors: IceCreamFlavor[] = flavorsSnap.docs
        .filter(d => d.data().isAvailable !== false)
        .map(d => ({
          id: d.id,
          name: d.data().nombre || '',
          order: d.data().orden || 0,
          isAvailable: d.data().isAvailable !== false,
          categoryId: d.data().categoryId || catId,
        }));

      if (catData.isActive && flavors.length > 0) {
        categories.push({
          id: catId,
          name: catData.displayName || '',
          order: catData.order || 0,
          isActive: catData.isActive,
          flavors,
        });
      }
    }
    return categories;
  } catch (error) {
    console.error('Error fetching heladería:', error);
    return [];
  }
}

export default function IceCreamWrapper() {
  const [categories, setCategories] = useState<IceCreamCategory[]>([]);

  useEffect(() => {
    getHeladeriaData().then(setCategories);
  }, []);

  return <IceCreamMenu categories={categories} />;
}
