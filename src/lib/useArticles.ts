import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { articles as initialArticles } from '../data/articles';

export function useArticles() {
  const [articles, setArticles] = useState<any[]>([]); // Starts empty, fills from DB
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'articles'),
      where('published', '==', true)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let fetched = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          category: data.category || {
            id: data.categoryId || '1',
            name: data.categoryName || 'General',
            slug: data.categorySlug || 'general'
          },
          author: data.author || {
            name: data.authorName || 'Redacción',
            role: data.authorRole || 'Editor'
          }
        };
      });
      
      fetched.sort((a: any, b: any) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
      
      setArticles(fetched);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setArticles([]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { articles, loading };
}
