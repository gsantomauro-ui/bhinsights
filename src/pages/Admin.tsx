import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, getDocs, setDoc, doc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { articles as initialArticles } from '../data/articles';
import { Ad } from '../lib/useAds';

export default function Admin() {
  const navigate = useNavigate();
  const { user, isAdmin, loading, login, logout } = useAuth();
  const [articles, setArticles] = useState<any[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [fetching, setFetching] = useState(false);
  const [fetchingAds, setFetchingAds] = useState(false);
  const [aeoPreview, setAeoPreview] = useState<any | null>(null);

  const fetchArticles = async () => {
    if (!isAdmin) return;
    setFetching(true);
    try {
      const snap = await getDocs(collection(db, 'articles'));
      let fetched = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      fetched.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setArticles(fetched);
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'articles');
    } finally {
      setFetching(false);
    }
  };

  const fetchAds = async () => {
    if (!isAdmin) return;
    setFetchingAds(true);
    try {
      const snap = await getDocs(collection(db, 'ads'));
      let fetched = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Ad[];
      fetched.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      
      setAds(fetched);
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'ads');
    } finally {
      setFetchingAds(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchArticles();
      fetchAds();
    }
  }, [isAdmin]);

  const handleSeedData = async () => {
    try {
      for (const article of initialArticles) {
        await setDoc(doc(db, 'articles', article.id), {
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          categoryId: article.category.id,
          categoryName: article.category.name,
          categorySlug: article.category.slug,
          authorName: article.author.name,
          authorRole: article.author.role,
          date: article.date,
          imageUrl: article.imageUrl,
          readTime: article.readTime,
          content: article.content || '<p>Contenido del artículo de prueba.</p>',
          featured: article.featured || false,
          isBreaking: article.isBreaking || false,
          type: article.type || 'article',
          published: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      fetchArticles();
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'articles');
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-500 font-bold">Cargando...</div>;

  if (!user) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-4 bg-transparent">
        <h1 className="text-3xl font-black mb-6 text-slate-900 dark:text-white">Acceso a Redacción</h1>
        <button 
          onClick={login}
          className="bg-brand-primary text-white px-6 py-3 rounded-full font-bold hover:bg-brand-primary/90 transition-colors shadow-lg"
        >
          Iniciar sesión con Google
        </button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-4 bg-transparent">
        <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Acceso Denegado</h1>
        <p className="mb-6 text-slate-600 dark:text-slate-400">Tu cuenta ({user.email}) no tiene permisos de administrador o editor.</p>
        <button onClick={logout} className="text-brand-primary hover:underline font-bold">Cerrar sesión</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 py-10 min-h-screen">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200 dark:border-white/10">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Panel de Redacción</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">{user.email}</span>
          <button onClick={logout} className="text-sm border border-slate-200 dark:border-white/10 px-4 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 font-bold transition-colors text-slate-900 dark:text-white">Salir</button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#18181b] p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-white/10 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Tus Artículos</h2>
          <div className="flex gap-2">
            <button 
              onClick={handleSeedData}
              className="bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-sm font-bold py-2 px-6 rounded-full text-slate-700 dark:text-slate-300 transition-colors"
            >
              Cargar datos de prueba
            </button>
            <button 
              onClick={() => navigate('/admin/editor')}
              className="bg-brand-primary hover:bg-brand-primary/90 transition-colors text-white text-sm font-bold py-2 px-6 rounded-full shadow-lg shadow-brand-primary/30"
            >
              + Nuevo Artículo
            </button>
          </div>
        </div>

        {fetching ? (
          <p className="text-slate-500 py-10 text-center font-bold">Cargando notas...</p>
        ) : (
          <div className="overflow-x-auto">
             <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="uppercase tracking-widest text-[10px] text-slate-500 border-b border-slate-200 dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-black">Título</th>
                    <th scope="col" className="px-6 py-4 font-black">Categoría</th>
                    <th scope="col" className="px-6 py-4 font-black">Estado</th>
                    <th scope="col" className="px-6 py-4 font-black">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 dark:text-slate-300">
                  {articles.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-500 font-bold">
                        No hay artículos todavía. Usa "Cargar datos de prueba" o crea uno nuevo.
                      </td>
                    </tr>
                  ) : (
                    articles.map(a => (
                      <tr key={a.id} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 overflow-hidden truncate max-w-xs font-bold text-slate-900 dark:text-white">{a.title}</td>
                        <td className="px-6 py-4 font-medium">{a.categoryName}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-[10px] uppercase tracking-widest font-black rounded-full ${a.published ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'}`}>
                            {a.published ? 'Publicado' : 'Borrador'}
                          </span>
                        </td>
                         <td className="px-6 py-4 font-bold text-xs">
                          <button onClick={() => setAeoPreview(a)} className="text-emerald-500 hover:text-emerald-400 uppercase tracking-widest mr-4 transition-colors">Ver Info IA</button>
                          <button onClick={() => navigate(`/admin/editor/${a.id}`)} className="text-brand-primary hover:text-brand-primary/80 uppercase tracking-widest mr-4 transition-colors">Editar</button>
                          <button 
                            className="text-red-500 hover:text-red-400 uppercase tracking-widest transition-colors" 
                            onClick={async (e) => {
                               const btn = e.currentTarget;
                               if (btn.innerText === 'BORRAR') {
                                 btn.innerText = '¿SEGURO?';
                                 setTimeout(() => { if (btn.innerText === '¿SEGURO?') btn.innerText = 'BORRAR'; }, 3000);
                                 return;
                               }
                               btn.innerText = 'BORRANDO...';
                               try {
                                 await deleteDoc(doc(db, 'articles', a.id));
                                 fetchArticles();
                               } catch (error) {
                                 handleFirestoreError(error, OperationType.DELETE, 'articles');
                                 btn.innerText = 'BORRAR';
                               }
                            }}
                          >
                            Borrar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
             </table>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-[#18181b] p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-white/10 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Anuncios y Promociones</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => navigate('/admin/ad-editor')}
              className="bg-brand-primary hover:bg-brand-primary/90 transition-colors text-white text-sm font-bold py-2 px-6 rounded-full shadow-lg shadow-brand-primary/30"
            >
              + Nuevo Anuncio
            </button>
          </div>
        </div>

        {fetchingAds ? (
          <p className="text-slate-500 py-10 text-center font-bold">Cargando anuncios...</p>
        ) : (
          <div className="overflow-x-auto">
             <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="uppercase tracking-widest text-[10px] text-slate-500 border-b border-slate-200 dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-black">Título</th>
                    <th scope="col" className="px-6 py-4 font-black">Posición</th>
                    <th scope="col" className="px-6 py-4 font-black">Estado</th>
                    <th scope="col" className="px-6 py-4 font-black">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 dark:text-slate-300">
                  {ads.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-500 font-bold">
                        No hay anuncios todavía. Crea uno nuevo.
                      </td>
                    </tr>
                  ) : (
                    ads.map(ad => (
                      <tr key={ad.id} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 overflow-hidden truncate max-w-xs font-bold text-slate-900 dark:text-white">{ad.title}</td>
                        <td className="px-6 py-4 font-medium uppercase text-xs tracking-wider">{ad.position}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-[10px] uppercase tracking-widest font-black rounded-full ${ad.active ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400'}`}>
                            {ad.active ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                         <td className="px-6 py-4 font-bold text-xs">
                          <button onClick={() => navigate(`/admin/ad-editor/${ad.id}`)} className="text-brand-primary hover:text-brand-primary/80 uppercase tracking-widest mr-4 transition-colors">Editar</button>
                          <button 
                            className="text-red-500 hover:text-red-400 uppercase tracking-widest transition-colors" 
                            onClick={async (e) => {
                               const btn = e.currentTarget;
                               if (btn.innerText === 'BORRAR') {
                                 btn.innerText = '¿SEGURO?';
                                 setTimeout(() => { if (btn.innerText === '¿SEGURO?') btn.innerText = 'BORRAR'; }, 3000);
                                 return;
                               }
                               btn.innerText = 'BORRANDO...';
                               try {
                                 await deleteDoc(doc(db, 'ads', ad.id));
                                 fetchAds();
                               } catch (error) {
                                 handleFirestoreError(error, OperationType.DELETE, 'ads');
                                 btn.innerText = 'BORRAR';
                               }
                            }}
                          >
                            Borrar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
             </table>
          </div>
        )}
      </div>

      {aeoPreview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto backdrop-blur-sm">
          <div className="bg-slate-900/90 border border-emerald-500/20 text-emerald-400 p-6 md:p-8 rounded-3xl shadow-2xl max-w-4xl w-full font-mono text-sm relative my-20 backdrop-blur-md">
            <button 
              onClick={() => setAeoPreview(null)}
              className="absolute top-6 right-6 text-emerald-500 hover:text-white transition-colors"
            >
              Cerrar [X]
            </button>
            <div className="flex items-center gap-3 mb-8 border-b border-emerald-900/50 pb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h2 className="text-xl font-bold text-white tracking-widest uppercase">Vista para IAs (Crawler / AEO View)</h2>
            </div>
            
            <p className="text-slate-400 mb-6">Así es como un modelo generativo (ChatGPT, Claude) lee este artículo:</p>
            
            <div className="space-y-6">
              <div>
                <span className="text-slate-500 block mb-2 font-bold tracking-widest"># META DATA</span>
                <div className="bg-black/50 p-6 rounded-2xl text-emerald-300 font-medium">
                  <span className="text-emerald-500 mr-2">Title:</span> {aeoPreview.title}{'\n'}
                  <span className="text-emerald-500 mr-2">Description:</span> {aeoPreview.excerpt}{'\n'}
                  <span className="text-emerald-500 mr-2">Keywords:</span> {aeoPreview.categoryName}, farmacéutica, biotecnología{'\n'}
                  <span className="text-emerald-500 mr-2">Author:</span> {aeoPreview.authorName} ({aeoPreview.authorRole}){'\n'}
                  <span className="text-emerald-500 mr-2">Published:</span> {aeoPreview.date}
                </div>
              </div>
              
              <div>
                <span className="text-slate-500 block mb-2 font-bold tracking-widest"># MACHINE-READABLE CONTENT (TEXT ONLY)</span>
                <div className="bg-black/50 p-6 rounded-2xl text-slate-300 whitespace-pre-wrap max-h-96 overflow-y-auto leading-relaxed">
                  {(aeoPreview.content || '').replace(/<[^>]*>?/gm, '') || '(Sin contenido para parsear)'}
                </div>
              </div>
              
              <div className="border border-emerald-900/50 p-4 rounded-2xl bg-emerald-950/20 text-emerald-100 flex gap-4 items-start">
                 <span className="text-2xl">💡</span>
                 <p><strong className="text-emerald-400 block mb-1">Tip de Optimización (AEO)</strong> Para que las IAs recomienden este contenido, asegúrate de mantener un lenguaje claro, incluir palabras clave de la industria en los primeros párrafos, y utilizar subtítulos (H2, H3) para estructurar el argumento principal.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
