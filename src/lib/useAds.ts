import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './firebase';

export interface Ad {
  id: string;
  title: string;
  description?: string;
  linkUrl: string;
  imageUrl?: string;
  buttonText?: string;
  position: 'top' | 'sidebar' | 'inline' | 'article_footer_cta';
  active: boolean;
  createdAt: string;
}

export function useAds() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'ads'), where('active', '==', true));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Ad[];
      
      setAds(fetched);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setAds([]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { ads, loading };
}
