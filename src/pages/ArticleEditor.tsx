import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';
import { ArrowLeft } from 'lucide-react';
import SimpleMdeReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

export default function ArticleEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
  const isNew = !id;
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    categoryId: '1',
    categoryName: 'General',
    categorySlug: 'general',
    authorName: 'Redacción',
    authorRole: 'Editor',
    date: new Date().toISOString().split('T')[0],
    imageUrl: '',
    readTime: '5 min',
    featured: false,
    isBreaking: false,
    type: 'article',
    published: false
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
      return;
    }

    if (!isNew && id) {
      const fetchArticle = async () => {
        try {
          const docRef = await getDoc(doc(db, 'articles', id));
          if (docRef.exists()) {
            const data = docRef.data();
            setFormData({
              title: data.title || '',
              slug: data.slug || '',
              excerpt: data.excerpt || '',
              content: data.content || '',
              categoryId: data.categoryId || '1',
              categoryName: data.categoryName || 'General',
              categorySlug: data.categorySlug || 'general',
              authorName: data.authorName || 'Redacción',
              authorRole: data.authorRole || 'Editor',
              date: data.date || new Date().toISOString().split('T')[0],
              imageUrl: data.imageUrl || '',
              readTime: data.readTime || '5 min',
              featured: data.featured || false,
              isBreaking: data.isBreaking || false,
              type: data.type || 'article',
              published: data.published || false
            });
          }
        } catch (e) {
          handleFirestoreError(e, OperationType.GET, 'articles');
        } finally {
          setLoading(false);
        }
      };
      
      fetchArticle();
    }
  }, [id, isNew, isAdmin, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    // Auto-generate slug from title
    if (name === 'title' && isNew && !formData.slug) {
      setFormData(prev => ({ 
        ...prev, 
        title: value, 
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') 
      }));
      return;
    }

    // Handle category change specifically to update name and slug
    if (name === 'categoryId') {
      let catName = 'General';
      let catSlug = 'general';
      if (value === '2') { catName = 'Industria'; catSlug = 'industria'; }
      if (value === '3') { catName = 'Healthtech'; catSlug = 'healthtech'; }
      if (value === '4') { catName = 'Mercado'; catSlug = 'mercado'; }
      if (value === '5') { catName = 'Educación'; catSlug = 'educacion'; }
      
      setFormData(prev => ({ 
        ...prev, 
        categoryId: value, 
        categoryName: catName, 
        categorySlug: catSlug 
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const docId = isNew ? formData.slug : id!;
      const docRef = doc(db, 'articles', docId);
      
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
      handleFirestoreError(e, OperationType.WRITE, 'articles');
      alert('Error guardando el artículo');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Cargando artículo...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 pb-20">
      <button 
        onClick={() => navigate('/admin')} 
        className="flex items-center text-sm text-gray-500 hover:text-black mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Volver al panel
      </button>

      <h1 className="text-3xl font-black mb-8">{isNew ? 'Nuevo Artículo' : 'Editar Artículo'}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 shadow-sm border border-gray-200">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-1">Título</label>
            <input 
              required type="text" name="title" value={formData.title} onChange={handleChange}
              className="w-full border border-gray-300 p-2 text-lg focus:ring-2 focus:ring-black outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">URL (Slug)</label>
            <input 
              required type="text" name="slug" value={formData.slug} onChange={handleChange} disabled={!isNew}
              className="w-full border border-gray-300 p-2 bg-gray-50 focus:ring-2 focus:ring-black outline-none" 
            />
            {isNew && <span className="text-xs text-gray-500">Este será el link de la nota, no se puede cambiar después de creada.</span>}
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Categoría</label>
            <select 
              name="categoryId" value={formData.categoryId} onChange={handleChange}
              className="w-full border border-gray-300 p-2 focus:ring-2 focus:ring-black outline-none bg-white"
            >
              <option value="1">General</option>
              <option value="2">Industria</option>
              <option value="3">Healthtech</option>
              <option value="4">Mercado</option>
              <option value="5">Educación</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-1">Resumen (Excerpt)</label>
            <textarea 
              required name="excerpt" value={formData.excerpt} onChange={handleChange} rows={2}
              className="w-full border border-gray-300 p-2 focus:ring-2 focus:ring-black outline-none" 
            />
            <span className="text-xs text-gray-500">Breve texto introductorio visible en las tarjetas.</span>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-1">Cuerpo del Artículo</label>
            <SimpleMdeReact 
              value={formData.content} 
              onChange={(value) => setFormData(prev => ({ ...prev, content: value }))} 
              options={{ 
                spellChecker: false,
                placeholder: 'Escribe el contenido del artículo en formato Markdown. Agrega ## subtítulos, **negritas** y listas.',
                status: false
              }}
            />
            <span className="text-xs text-gray-500">Usa Markdown para dar formato como un medio profesional: ## Subtítulo, **Negrita**, *Itálica*, [Enlaces](url).</span>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Autor - Nombre</label>
            <input required type="text" name="authorName" value={formData.authorName} onChange={handleChange} className="w-full border border-gray-300 p-2" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Autor - Rol</label>
            <input required type="text" name="authorRole" value={formData.authorRole} onChange={handleChange} className="w-full border border-gray-300 p-2" />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Fecha de publicación (Y-M-D)</label>
            <input required type="text" name="date" value={formData.date} onChange={handleChange} className="w-full border border-gray-300 p-2" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Tiempo de lectura</label>
            <input required type="text" name="readTime" value={formData.readTime} onChange={handleChange} className="w-full border border-gray-300 p-2" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-1">URL de la Imagen Principal</label>
            <input required type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" className="w-full border border-gray-300 p-2" />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-4 h-4 text-[#22d3ee]" />
            <span className="text-sm font-bold">Nota Destacada</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="isBreaking" checked={formData.isBreaking} onChange={handleChange} className="w-4 h-4 text-[#22d3ee]" />
            <span className="text-sm font-bold">Última Hora (Banner superior)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="w-4 h-4 text-[#22d3ee]" />
            <span className="text-sm font-bold text-green-700">Públicar en la web</span>
          </label>
        </div>

        <div className="pt-6 flex justify-end gap-3">
          <button type="button" onClick={() => navigate('/admin')} className="px-6 py-3 border border-gray-300 bg-white hover:bg-gray-50 text-sm font-bold">
            Cancelar
          </button>
          <button type="submit" disabled={saving} className="px-8 py-3 bg-[#22d3ee] hover:bg-black transition-colors text-white text-sm font-bold disabled:opacity-50">
            {saving ? 'Guardando...' : 'Guardar Artículo'}
          </button>
        </div>

      </form>

      <div className="mt-12 bg-gray-900 text-green-400 p-6 md:p-8 rounded-lg shadow-lg font-mono text-sm">
        <div className="flex items-center gap-2 mb-6 border-b border-green-800 pb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h2 className="text-xl font-bold text-white tracking-widest uppercase">Vista para IAs (Crawler / AEO View)</h2>
        </div>
        
        <p className="text-gray-400 mb-6">Así es como un modelo generativo (ChatGPT, Claude) o los rastreadores de motores de búsqueda leen este artículo en texto enriquecido y estructurado (JSON-LD):</p>
        
        <div className="space-y-6">
          <div>
            <span className="text-gray-500 block mb-1"># META DATA</span>
            <div className="bg-black p-4 rounded text-blue-300">
              <span className="text-pink-400">Title:</span> {formData.title || '(Sin título)'}{'\n'}
              <span className="text-pink-400">Description:</span> {formData.excerpt || '(Sin resumen)'}{'\n'}
              <span className="text-pink-400">Keywords:</span> {formData.categoryName}, farmacéutica, biotecnología{'\n'}
              <span className="text-pink-400">Author:</span> {formData.authorName} ({formData.authorRole}){'\n'}
              <span className="text-pink-400">Published:</span> {formData.date}
            </div>
          </div>
          
          <div>
            <span className="text-gray-500 block mb-1"># MACHINE-READABLE CONTENT (TEXT ONLY)</span>
            <div className="bg-black p-4 rounded text-gray-300 whitespace-pre-wrap max-h-96 overflow-y-auto">
              {formData.content.replace(/<[^>]*>?/gm, '') || '(Sin contenido para parsear)'}
            </div>
          </div>
          
          <div className="border border-green-800 p-4 rounded bg-green-900 bg-opacity-20 text-white">
             <strong className="text-green-400">💡 Tip de Optimización (AEO):</strong> Para que las IAs recomienden este contenido, asegúrate de mantener un lenguaje claro, incluir palabras clave de la industria en los primeros párrafos, y utilizar subtítulos (H2, H3) para estructurar el argumento principal.
          </div>
        </div>
      </div>
    </div>
  );
}
