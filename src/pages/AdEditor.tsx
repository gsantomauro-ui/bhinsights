import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';
import { ArrowLeft } from 'lucide-react';

export default function AdEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
  const isNew = !id;
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    linkUrl: '',
    imageUrl: '',
    buttonText: '',
    position: 'inline',
    active: true
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
      return;
    }

    if (!isNew && id) {
      const fetchAd = async () => {
        try {
          const docRef = await getDoc(doc(db, 'ads', id));
          if (docRef.exists()) {
            const data = docRef.data();
            setFormData({
              title: data.title || '',
              description: data.description || '',
              linkUrl: data.linkUrl || '',
              imageUrl: data.imageUrl || '',
              buttonText: data.buttonText || '',
              position: data.position || 'inline',
              active: data.active !== undefined ? data.active : true
            });
          }
        } catch (e) {
          handleFirestoreError(e, OperationType.GET, 'ads');
        } finally {
          setLoading(false);
        }
      };
      
      fetchAd();
    }
  }, [id, isNew, isAdmin, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const docId = isNew ? doc(collection(db, 'ads')).id : id!;
      const docRef = doc(db, 'ads', docId);

      let existingData = {};
      if (!isNew) {
        const existingDoc = await getDoc(docRef);
        if (existingDoc.exists()) {
          existingData = existingDoc.data();
        }
      }

      await setDoc(docRef, {
        ...formData,
        createdAt: isNew ? serverTimestamp() : (existingData as any).createdAt || serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      navigate('/admin');
    } catch (e) {
      console.error(e);
      handleFirestoreError(e, OperationType.WRITE, 'ads');
      alert('Error guardando el anuncio');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-500 font-bold">Cargando anuncio...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 pb-20">
      <button 
        onClick={() => navigate('/admin')} 
        className="flex items-center text-sm text-slate-500 hover:text-brand-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Volver al panel
      </button>

      <h1 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">{isNew ? 'Nuevo Anuncio' : 'Editar Anuncio'}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-[#18181b] p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-white/10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-900 dark:text-white">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-1">Título</label>
            <input 
              required type="text" name="title" value={formData.title} onChange={handleChange}
              className="w-full border border-slate-300 dark:border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none bg-transparent" 
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-1">Descripción</label>
            <textarea 
              name="description" value={formData.description} onChange={handleChange} rows={2}
              className="w-full border border-slate-300 dark:border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none bg-transparent" 
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-1">URL de Destino</label>
            <input 
              required type="url" name="linkUrl" value={formData.linkUrl} onChange={handleChange} placeholder="https://ejemplo.com"
              className="w-full border border-slate-300 dark:border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none bg-transparent" 
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-1">URL de la Imagen (Opcional para formato Formación BLISS)</label>
            <input 
              type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" 
              className="w-full border border-slate-300 dark:border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none bg-transparent" 
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-1">Texto del Botón (Para formato Formación BLISS)</label>
            <input 
              type="text" name="buttonText" value={formData.buttonText} onChange={handleChange} placeholder="Ej. Formación BLISS" 
              className="w-full border border-slate-300 dark:border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none bg-transparent" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Formato / Posición</label>
            <select 
              name="position" value={formData.position} onChange={handleChange}
              className="w-full border border-slate-300 dark:border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none bg-transparent text-slate-900 dark:text-white"
            >
              <option value="inline" className="text-black bg-white">Inline (dentro del contenido)</option>
              <option value="sidebar" className="text-black bg-white">Sidebar (barra lateral)</option>
              <option value="top" className="text-black bg-white">Top (Arriba)</option>
              <option value="article_footer_cta" className="text-black bg-white">Banner Formación BLISS (Footer Artículo)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-white/10 mt-6 pt-6">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="w-5 h-5 accent-brand-primary" />
            <span className="text-sm font-bold text-green-600 dark:text-green-400">Activo (Visible en el sitio)</span>
          </label>
        </div>

        <div className="pt-6 flex justify-end gap-3">
          <button type="button" onClick={() => navigate('/admin')} className="px-6 py-3 border border-slate-300 dark:border-white/10 rounded-full bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-bold transition-colors text-slate-700 dark:text-slate-300">
            Cancelar
          </button>
          <button type="submit" disabled={saving} className="px-8 py-3 bg-brand-primary hover:bg-brand-primary/90 transition-colors rounded-full shadow-lg shadow-brand-primary/30 text-white text-sm font-bold disabled:opacity-50">
            {saving ? 'Guardando...' : 'Guardar Anuncio'}
          </button>
        </div>

      </form>
    </div>
  );
}
