import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, Activity, ChevronDown, X, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check local storage or system preference
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'dark' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <>
      <header className="bg-white dark:bg-[#09090b] text-slate-900 dark:text-white sticky top-0 z-40 font-sans border-b border-slate-200 dark:border-white/10 shadow-sm transition-colors duration-300">
        {/* Ticker / Top Bar (Electric Neon Style) */}
        <div className="bg-brand-primary text-white text-[10px] md:text-[11px] py-1.5 px-4 font-bold uppercase tracking-widest animate-gradient">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4 md:gap-6 text-white/90 overflow-x-auto whitespace-nowrap scrollbar-hide">
              <span className="flex items-center text-white font-black">
                <Activity size={14} className="mr-1.5 animate-pulse" /> TRENDING
              </span>
              <span className="cursor-pointer transition-colors hover:text-white flex-[0_0_auto]">AI IN HEALTHCARE <span className="font-display font-medium bg-white/20 px-1 rounded ml-1 text-[9px]">+2.4%</span></span>
              <span className="cursor-pointer transition-colors hover:text-white flex-[0_0_auto]">DIGITAL THERAPEUTICS <span className="font-display font-medium bg-white/20 px-1 rounded ml-1 text-[9px]">+5.1%</span></span>
            </div>
            <div className="hidden md:flex gap-4 opacity-90">
              <button onClick={() => setIsContactModalOpen(true)} className="hover:text-white transition-colors uppercase tracking-widest">Sponsorships</button>
            </div>
          </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 -ml-2 text-slate-900 dark:text-white hover:text-brand-primary transition-colors"
              aria-label="Abrir menú"
            >
              <Menu size={24} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
            <Link to="/" className="flex flex-col text-center md:text-left group select-none relative z-50">
              <span className="text-2xl md:text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white font-display leading-none flex items-center">
                BH<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary ml-1">Insights</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex flex-1 justify-center space-x-8 items-center" aria-label="Navegación principal">
            {[
              { name: 'Novedades', slug: 'novedades' },
              { name: 'Lanzamientos', slug: 'lanzamientos' },
              { name: 'Mercado', slug: 'mercado' },
              { name: 'HealthTech', slug: 'healthtech' },
              { name: 'Educación', slug: 'educacion' },
            ].map((cat) => (
              <Link 
                key={cat.slug}
                to={`/categoria/${cat.slug}`} 
                className={`text-[13px] font-bold transition-all uppercase tracking-widest flex items-center gap-1 ${
                  location.pathname === `/categoria/${cat.slug}`
                    ? 'text-brand-primary' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-brand-secondary dark:hover:text-white'
                }`}
              >
                {cat.name} 
              </Link>
            ))}
          </nav>

          <div className="flex justify-end items-center gap-3 md:gap-5">
            <button 
              onClick={toggleDarkMode} 
              className="p-1.5 md:p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-all"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
            </button>
            <button className="text-slate-900 dark:text-slate-300 hover:text-brand-primary transition-colors hidden md:block" aria-label="Buscar artículos">
              <Search size={20} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      </header>

      {/* Full-Screen Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-[#09090b] flex flex-col md:hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-white/10">
            <span className="text-2xl font-extrabold tracking-tighter text-slate-900 dark:text-white font-display">
                BH<span className="text-brand-primary">Insights</span>
            </span>
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white"
            >
              <X size={24} strokeWidth={2.5} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
            {[
              { name: 'Novedades', slug: 'novedades', color: 'from-blue-500 to-cyan-500' },
              { name: 'Lanzamientos', slug: 'lanzamientos', color: 'from-purple-500 to-pink-500' },
              { name: 'Mercado', slug: 'mercado', color: 'from-emerald-500 to-teal-500' },
              { name: 'HealthTech', slug: 'healthtech', color: 'from-orange-500 to-red-500' },
              { name: 'Educación', slug: 'educacion', color: 'from-indigo-500 to-blue-500' },
              { name: 'Trabajo', slug: 'trabajo', color: 'from-cyan-500 to-blue-500' }
            ].map((cat) => (
              <Link 
                key={cat.slug}
                onClick={() => setIsMenuOpen(false)} 
                to={`/categoria/${cat.slug}`} 
                className="text-3xl font-display font-black text-slate-900 dark:text-white flex items-center justify-between group"
              >
                <span>{cat.name}</span>
                <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300`}></span>
              </Link>
            ))}
            
            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/10 flex flex-col gap-4">
              <Link onClick={() => setIsMenuOpen(false)} to="/sobre-el-observatorio" className="text-lg font-bold text-slate-500 dark:text-slate-400">Sobre BH Insights</Link>
              <button onClick={() => { setIsMenuOpen(false); setIsContactModalOpen(true); }} className="text-lg font-bold text-slate-500 dark:text-slate-400 text-left">Sponsorships</button>
            </div>
          </div>
        </div>
      )}

    {isContactModalOpen && (
      <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[9999] overflow-y-auto">
        <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-2xl max-w-lg w-full relative border border-slate-200 dark:border-white/10">
          <button 
            onClick={() => setIsContactModalOpen(false)}
            className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 rounded-full p-2 transition-all"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
          
          <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white mb-2 uppercase tracking-tight flex items-center gap-2">
            <span className="w-2 h-6 bg-brand-primary rounded-sm"></span> Sponsorship
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">Déjanos tus datos y conectemos para potenciar tu marca con nuestra audiencia.</p>
          
          <form action="https://formsubmit.co/g.santomauro@farmaleaderstalento.com" method="POST" className="space-y-4">
            <input type="hidden" name="_subject" value="Nueva consulta de publicidad desde la web!" />
            <input type="hidden" name="_captcha" value="false" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-brand-primary uppercase mb-1 tracking-widest">Nombre</label>
                <input type="text" name="name" required className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-primary uppercase mb-1 tracking-widest">Empresa</label>
                <input type="text" name="company" required className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium" placeholder="Tu empresa" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-brand-primary uppercase mb-1 tracking-widest">Email Corporativo</label>
              <input type="email" name="email" required className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium" placeholder="email@empresa.com" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-brand-primary uppercase mb-1 tracking-widest">Propuesta</label>
              <textarea name="message" rows={4} required className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none font-medium" placeholder="¿Cómo podemos colaborar?"></textarea>
            </div>
            
            <button type="submit" className="w-full bg-brand-primary text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-brand-primary/90 transition-all transform hover:-translate-y-0.5 active:translate-y-0 mt-4 shadow-lg shadow-brand-primary/20">
              Enviar Propuesta
            </button>
          </form>
        </div>
      </div>
    )}
  </>
  );
}
