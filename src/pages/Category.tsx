import { useParams, Link } from 'react-router-dom';
import { useArticles } from '../lib/useArticles';
import { ArrowLeft, Clock } from 'lucide-react';
import SEO from '../components/seo/SEO';
import { motion } from 'motion/react';

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const { articles: allArticles, loading } = useArticles();
  
  const categoryTitles: Record<string, string> = {
    'novedades': 'Novedades',
    'lanzamientos': 'Lanzamientos',
    'mercado': 'Mercado',
    'healthtech': 'HealthTech',
    'educacion': 'Educación',
    'trabajo': 'Entorno Laboral',
    'todas': 'Todos los Análisis'
  };

  const isAll = slug === 'todas';
  const categoryArticles = isAll ? allArticles : allArticles.filter(a => a.category?.slug === slug || a.categorySlug === slug);
  
  const categoryName = categoryTitles[slug || ''] || (categoryArticles[0]?.category?.name || categoryArticles[0]?.categoryName || 'Categoría');

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center p-10 font-bold text-slate-500">Cargando...</div>;
  }

  if (!isAll && categoryArticles.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-transparent">
        <h1 className="text-3xl font-display font-black text-slate-900 dark:text-white mb-4">Categoría no encontrada</h1>
        <Link to="/" className="text-brand-primary hover:underline flex items-center font-bold tracking-tight uppercase text-sm">
          <ArrowLeft size={16} className="mr-1" /> Volver a la portada
        </Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": categoryName,
    "description": isAll ? 'Explora toda nuestra hemeroteca de análisis, tendencias y perspectivas.' : `Análisis y tendencias sobre ${categoryName.toLowerCase()} en el sector farma.`,
    "url": `https://bhinsights.es/categoria/${slug}`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "BH Insights",
      "url": "https://bhinsights.es"
    }
  };

  return (
    <div className="bg-transparent min-h-[70vh]">
      <SEO 
        title={categoryName}
        description={isAll ? 'Explora toda nuestra hemeroteca de análisis, tendencias y perspectivas.' : `Análisis y tendencias sobre ${categoryName.toLowerCase()} en el sector farma.`}
        url={`https://bhinsights.es/categoria/${slug}`}
        jsonLd={jsonLd}
        breadcrumbs={[
          { name: "Inicio", url: "https://bhinsights.es" },
          { name: categoryName, url: `https://bhinsights.es/categoria/${slug}` }
        ]}
      />
      
      {/* Editorial Header */}
      <header className="py-12 md:py-24 border-b border-slate-200 dark:border-white/10 relative overflow-hidden bg-white/50 dark:bg-black/20">
        <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-brand-primary/10 to-transparent blur-[100px] pointer-events-none"></div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-slate-900 dark:text-white mb-4 tracking-tighter drop-shadow-sm">{categoryName}</h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-display font-medium">
            {isAll 
              ? 'Explora toda nuestra hemeroteca de análisis, tendencias y perspectivas sobre el futuro de la industria de la salud.'
              : `Análisis y tendencias sobre ${categoryName.toLowerCase()} en el sector farma y biotecnológico.`}
          </p>
        </motion.div>
      </header>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[50vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {categoryArticles.map((article, i) => (
            <motion.article 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-50px" }} 
              transition={{ delay: (i % 3) * 0.1 }} 
              key={article.id} 
              className="flex flex-col group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-slate-200 dark:border-white/10 transition-all duration-300"
            >
              <Link to={`/articulo/${article.slug}`} className="block overflow-hidden relative">
                <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {!isAll && (
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full z-10 text-[9px] uppercase tracking-widest font-black text-brand-primary hidden md:block">
                     {article.category?.name}
                  </div>
                )}
                {isAll && (
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full z-10 text-[9px] uppercase tracking-widest font-black text-brand-primary hidden md:block">
                     {article.category?.name}
                  </div>
                )}
              </Link>
              <div className="flex flex-col flex-1 p-6 md:p-8">
                <Link to={`/articulo/${article.slug}`}>
                  <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-brand-primary transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base line-clamp-3 mb-6 flex-grow leading-relaxed font-display">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-xs text-slate-500 mt-auto pt-6 border-t border-slate-100 dark:border-white/5 font-sans font-bold">
                  <span className="text-slate-900 dark:text-slate-300 uppercase tracking-wide mr-auto line-clamp-1">{article.author.name}</span>
                  <span className="uppercase flex items-center whitespace-nowrap"><Clock size={12} className="mr-1 inline" /> {article.date}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
