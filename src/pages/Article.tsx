import { useParams, Link } from 'react-router-dom';
import { useArticles } from '../lib/useArticles';
import { useAds } from '../lib/useAds';
import { ArrowLeft, ArrowRight, Share2, Linkedin, Twitter, Bookmark, Clock } from 'lucide-react';
import SEO from '../components/seo/SEO';
import { marked } from 'marked';
import { motion } from 'motion/react';

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const { articles, loading } = useArticles();
  const { ads } = useAds();
  const article = articles.find(a => a.slug === slug);
  
  const footerAds = ads.filter(a => a.position === 'article_footer_cta');
  const footerAd = footerAds.length > 0 ? footerAds[0] : null;

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center p-10 font-bold text-slate-500">Cargando...</div>;
  }

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-transparent">
        <h1 className="text-3xl font-display font-black text-slate-900 dark:text-white mb-4">Artículo no encontrado</h1>
        <Link to="/" className="text-brand-primary hover:underline flex items-center font-bold tracking-tight uppercase text-sm">
          <ArrowLeft size={16} className="mr-1" /> Volver a la portada
        </Link>
      </div>
    );
  }

  const currentUrl = `https://ais-pre-uzbljh3c3kzwfd4a7l6g4e-69707767979.europe-west2.run.app/articulo/${article.slug}`;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(article.title);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: currentUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(currentUrl);
      alert('Enlace copiado al portapapeles');
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://bhinsights.es/articulo/${article.slug}`
    },
    "headline": article.title,
    "description": article.excerpt,
    "image": [
      article.imageUrl
    ],
    "datePublished": new Date(article.date).toISOString(),
    "dateModified": new Date(article.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "jobTitle": article.author.role,
      "url": "https://bhinsights.es/sobre-el-observatorio"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BH Insights",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bhinsights.es/logo.png"
      }
    }
  };

  return (
    <article className="bg-transparent pb-24 min-h-screen">
      <SEO 
        title={article.title}
        description={article.excerpt}
        url={`https://bhinsights.es/articulo/${article.slug}`}
        type="article"
        image={article.imageUrl}
        jsonLd={jsonLd}
        breadcrumbs={[
          { name: "Inicio", url: "https://bhinsights.es" },
          { name: article.category.name, url: `https://bhinsights.es/categoria/${article.category.slug}` },
          { name: article.title, url: `https://bhinsights.es/articulo/${article.slug}` }
        ]}
      />
      {/* Article Header */}
      <motion.header initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 text-center">
        <div className="mb-6 flex justify-center items-center">
          <Link to={`/categoria/${article.category.slug}`} className="bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary text-[10px] md:text-sm font-black uppercase tracking-widest px-4 py-2 rounded-full hover:bg-brand-primary/20 transition-colors">
            {article.category.name}
          </Link>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-slate-900 dark:text-white leading-[1.05] mb-6 tracking-tighter text-balance">
          {article.title}
        </h1>
        <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 font-display font-medium leading-relaxed mb-10 max-w-4xl mx-auto">
          {article.excerpt}
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-between border-y border-slate-200 dark:border-white/10 py-6 px-4 md:px-0">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-lg font-display font-black shadow-lg">
              {article.author.name.charAt(0)}
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-slate-900 dark:text-white leading-none mb-1">
                Por <span className="text-brand-primary uppercase tracking-tight">{article.author.name}</span>
              </p>
              <div className="flex items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <Clock size={12} className="mr-1 inline" /> <time>{article.date}</time>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-slate-400">
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Compartir en LinkedIn" className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-brand-primary hover:text-white transition-all"><Linkedin size={18} strokeWidth={2} aria-hidden="true" /></a>
            <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Compartir en Twitter" className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-brand-primary hover:text-white transition-all"><Twitter size={18} strokeWidth={2} aria-hidden="true" /></a>
            <button onClick={handleShare} aria-label="Compartir" className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-brand-primary hover:text-white transition-all"><Share2 size={18} strokeWidth={2} aria-hidden="true" /></button>
          </div>
        </div>
      </motion.header>

      {/* Featured Image */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="aspect-[16/9] w-full rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl relative border border-slate-200 dark:border-white/10">
          <img src={article.imageUrl} alt={article.title} loading="eager" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <figcaption className="text-[10px] text-slate-400 mt-4 text-right font-sans uppercase tracking-widest font-bold">
          Foto: BH Insights Agencias
        </figcaption>
      </motion.div>

      {/* Content */}
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="font-display font-medium text-slate-800 dark:text-slate-200 leading-loose mb-20 text-lg md:text-xl space-y-6 article-content-html"
          dangerouslySetInnerHTML={{ __html: marked.parse(article.content || `**${article.excerpt}**\n\nContenido extendido en desarrollo por la redacción de BH Insights.`) as string }}
        />

        {/* Soft CTA to Degree (Dynamic or Fallback) */}
        {footerAd ? (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-900/20 rounded-3xl p-8 md:p-12 text-center mb-16 border border-indigo-100 dark:border-indigo-500/20 shadow-xl relative overflow-hidden">
            {footerAd.imageUrl && (
              <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
                <img src={footerAd.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-display font-black mb-4 tracking-tight text-slate-900 dark:text-white">{footerAd.title}</h3>
              {footerAd.description && (
                <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed font-display font-medium">
                  {footerAd.description}
                </p>
              )}
              <a 
                href={footerAd.linkUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm md:text-base font-bold text-white bg-brand-primary px-8 py-4 rounded-full hover:bg-brand-primary/90 transition-transform transform hover:-translate-y-1 shadow-lg shadow-brand-primary/30 uppercase tracking-widest"
              >
                {footerAd.buttonText || 'Conoce más'} <ArrowRight size={20} className="ml-2" />
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-900/20 rounded-3xl p-8 md:p-12 text-center mb-16 border border-indigo-100 dark:border-indigo-500/20 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-display font-black mb-4 tracking-tight text-slate-900 dark:text-white">La Evolución Educativa</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed font-display font-medium">
              La industria ya ha definido sus necesidades. Explora cómo el nuevo modelo educativo BLISS está inspirando currículos académicos para cerrar esta brecha de talento.
            </p>
            <a 
              href="https://bliss.farmaleaderstalento.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm md:text-base font-bold text-white bg-brand-primary px-8 py-4 rounded-full hover:bg-brand-primary/90 transition-transform transform hover:-translate-y-1 shadow-lg shadow-brand-primary/30 uppercase tracking-widest"
            >
              Formación BLISS <ArrowRight size={20} className="ml-2" />
            </a>
          </motion.div>
        )}
      </div>
    </article>
  );
}
