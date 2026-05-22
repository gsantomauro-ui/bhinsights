import { Link } from 'react-router-dom';
import { useArticles } from '../lib/useArticles';
import { Mail, Clock, ChevronRight, TrendingUp, Zap } from 'lucide-react';
import SEO from '../components/seo/SEO';

export default function Home() {
  const { articles: allArticles, loading } = useArticles();
  
  const breakingNews = allArticles.find(a => a.isBreaking);
  const featuredArticle = allArticles.find(a => a.featured) || allArticles[0] || null;
  const topStories = allArticles.filter(a => a.id !== featuredArticle?.id && a.id !== breakingNews?.id).slice(0, 6);
  const techArticles = allArticles.filter(a => a.category?.slug === 'healthtech');
  const marketArticles = allArticles.filter(a => a.category?.slug === 'mercado');
  const edArticles = allArticles.filter(a => a.category?.slug === 'educacion');
  const generalArticles = allArticles.filter(a => a.category?.slug === 'general');

  const hbTips = [
    { title: "Optimiza tu P&L en Q3", p: "Revisa estrategias de hedging para mitigar exposición a divisas en LATAM.", color: "from-blue-500 to-cyan-400" },
    { title: "Adopción de IA Clínica", p: "Inicia programas piloto en fases II para acortar tiempos de reclutamiento.", color: "from-purple-500 to-pink-500" },
    { title: "Retención de Talento", p: "El upskilling técnico reduce la rotación en perfiles regulatorios.", color: "from-emerald-400 to-teal-500" },
    { title: "Due Diligence M&A", p: "Busca compatibilidad cultural, no solo sinergias operativas.", color: "from-orange-400 to-red-500" }
  ];

  return (
    <div className="bg-transparent">
      {/* Top Grid: Modern Card Layout */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 lg:min-h-[600px]">
          
          {/* Center Column: Featured (El principal) */}
          <div className="lg:col-span-8 flex flex-col group relative">
            {featuredArticle ? (
              <Link to={`/articulo/${featuredArticle.slug}`} className="block h-full relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <img 
                  src={featuredArticle.imageUrl} 
                  alt={featuredArticle.title}
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-brand-primary text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Zap size={14} fill="currentColor" /> TENDENCIA
                    </span>
                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {featuredArticle.category?.name || 'General'}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black leading-[1.05] mb-4 text-white drop-shadow-lg text-balance">
                    {featuredArticle.title}
                  </h1>
                  <p className="text-white/80 text-sm md:text-lg leading-relaxed mb-6 font-display max-w-3xl line-clamp-2 md:line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-white/60 text-xs font-bold uppercase tracking-widest mt-auto">
                    <span>Por <span className="text-white">{featuredArticle.author?.name || 'Redacción'}</span></span>
                    <div className="flex items-center"><Clock size={14} className="mr-1.5"/> Hace 2 horas</div>
                  </div>
                </div>
              </Link>
            ) : (
               <div className="py-20 text-center text-slate-500 bg-white dark:bg-white/5 rounded-3xl flex-1 flex items-center justify-center border border-slate-200 dark:border-white/10">
                 No hay artículos destacados en este momento.
               </div>
            )}
          </div>

          {/* Right Column: Breaking / Sidebar Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
             {breakingNews && (
               <Link to={`/articulo/${breakingNews.slug}`} className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 relative overflow-hidden shadow-xl group border border-indigo-500/30 hover:border-indigo-400 transition-colors">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 blur-[50px] rounded-full"></div>
                  <div className="flex items-center gap-2 mb-4 relative z-10">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                    <span className="text-cyan-400 font-black text-[10px] md:text-xs uppercase tracking-widest">ÚLTIMO MOMENTO</span>
                  </div>
                  <h4 className="text-xl md:text-2xl font-black font-display leading-tight text-white mb-3 group-hover:text-cyan-200 transition-colors relative z-10 text-balance">
                    {breakingNews.title}
                  </h4>
                  <p className="text-sm text-slate-300 line-clamp-3 mb-6 relative z-10">{breakingNews.excerpt}</p>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase relative z-10">
                    <span className="text-cyan-400">{breakingNews.category?.name || 'General'}</span>
                    <span className="flex items-center"><Clock size={12} className="mr-1"/> 15 min</span>
                  </div>
               </Link>
             )}
             
             {/* Market Mini-Card */}
             <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-white/10 flex-1 flex flex-col">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4 mb-4">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase flex items-center gap-2"><TrendingUp size={16} className="text-emerald-500" /> Mercado Hoy</h3>
                </div>
                <div className="flex flex-col gap-4 flex-1 justify-center">
                  <div className="flex justify-between items-center group cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors">
                    <div className="flex flex-col"><span className="font-black text-slate-900 dark:text-white text-lg">NVS</span><span className="text-[10px] text-slate-500 font-bold uppercase">Novartis</span></div>
                    <span className="font-bold text-emerald-500 text-lg flex items-center">+2.4%</span>
                  </div>
                  <div className="flex justify-between items-center group cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors">
                    <div className="flex flex-col"><span className="font-black text-slate-900 dark:text-white text-lg">PFE</span><span className="text-[10px] text-slate-500 font-bold uppercase">Pfizer</span></div>
                    <span className="font-bold text-rose-500 text-lg flex items-center">-0.8%</span>
                  </div>
                  <div className="flex justify-between items-center group cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors">
                    <div className="flex flex-col"><span className="font-black text-slate-900 dark:text-white text-lg">MRNA</span><span className="text-[10px] text-slate-500 font-bold uppercase">Moderna</span></div>
                    <span className="font-bold text-emerald-500 text-lg flex items-center">+5.1%</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Top Stories Grid (Horizontal scroll on mobile, grid on desktop) */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12 overflow-hidden">
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">Más Destacados <ChevronRight className="text-brand-primary" /></h3>
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 pb-4 scrollbar-hide -mx-4 px-4 md:px-0 md:mx-0 snap-x">
           {topStories.slice(0, 4).map((a, i) => (
              <Link key={a.id} to={`/articulo/${a.slug}`} className="snap-start min-w-[280px] md:min-w-0 bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-white/10 group flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                   <img src={a.imageUrl} alt={a.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                   <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full">
                     <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary">{a.category?.name || 'General'}</span>
                   </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="text-lg font-display font-black text-slate-900 dark:text-white leading-tight mb-3 group-hover:text-brand-primary transition-colors text-balance line-clamp-3">
                    {a.title}
                  </h4>
                  <div className="mt-auto flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-4 border-t border-slate-100 dark:border-white/5">
                    Hace 2 horas
                  </div>
                </div>
              </Link>
           ))}
        </div>
      </section>

      {/* NEW SECTION: BH TIPS (Gradient Cards) */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 border-y border-slate-200 dark:border-white/10 relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:items-center">
          <div className="lg:w-1/4 flex flex-col justify-center">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase leading-none tracking-tight">
              BH<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Tips</span>
            </h3>
            <p className="text-sm md:text-base font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-4">Smart <br/> Executive Briefings</p>
          </div>
          <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {hbTips.map((tip, i) => (
              <div key={i} className={`p-[2px] rounded-3xl bg-gradient-to-br ${tip.color} hover:scale-[1.02] transition-transform duration-300 cursor-pointer`}>
                <div className="bg-white dark:bg-slate-800 h-full rounded-[22px] p-6 flex flex-col justify-center relative overflow-hidden">
                  <div className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full opacity-20 bg-gradient-to-br ${tip.color} blur-[20px]`}></div>
                  <h4 className="text-lg md:text-xl font-black font-display text-slate-900 dark:text-white mb-2 leading-snug relative z-10">{tip.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium relative z-10">{tip.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech & Market Feed - Modern List Style */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Tech Column */}
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-slate-200 dark:border-white/10">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase flex items-center gap-2">
                HT<span className="text-rose-500 text-4xl leading-none">.</span>
              </h3>
              <Link to="/categoria/healthtech" className="bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-colors flex items-center">
                HealthTech <ChevronRight size={14} className="ml-1" />
              </Link>
            </div>
            <div className="flex flex-col gap-6">
              {techArticles.slice(0,4).map((a) => (
                <Link key={a.id} to={`/articulo/${a.slug}`} className="flex gap-5 group items-center bg-white dark:bg-slate-800 p-3 rounded-3xl border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-colors shadow-sm hover:shadow-xl">
                   <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative flex-shrink-0">
                      <img src={a.imageUrl} alt={a.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   </div>
                   <div className="flex flex-col justify-center py-2 pr-4">
                     <span className="text-[9px] font-black text-rose-500 mb-2 uppercase tracking-widest">{a.category?.name || 'Tech'}</span>
                     <h4 className="text-base md:text-lg font-black font-display leading-tight text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors line-clamp-2 md:line-clamp-3">{a.title}</h4>
                   </div>
                </Link>
              ))}
            </div>
          </div>

          {/* M&A Column */}
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-slate-200 dark:border-white/10">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase flex items-center gap-2">
                M&A<span className="text-emerald-500 text-4xl leading-none">.</span>
              </h3>
              <Link to="/categoria/mercado" className="bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-colors flex items-center">
                Mercado <ChevronRight size={14} className="ml-1" />
              </Link>
            </div>
            <div className="flex flex-col gap-6">
              {marketArticles.slice(0,4).map((a) => (
                <Link key={a.id} to={`/articulo/${a.slug}`} className="flex gap-5 group items-center bg-white dark:bg-slate-800 p-3 rounded-3xl border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-colors shadow-sm hover:shadow-xl">
                   <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative flex-shrink-0">
                      <img src={a.imageUrl} alt={a.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   </div>
                   <div className="flex flex-col justify-center py-2 pr-4">
                     <span className="text-[9px] font-black text-emerald-500 mb-2 uppercase tracking-widest">{a.category?.name || 'Economía'}</span>
                     <h4 className="text-base md:text-lg font-black font-display leading-tight text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-2 md:line-clamp-3">{a.title}</h4>
                   </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
