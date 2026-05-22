import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-0 pt-20 pb-12 bg-slate-950 dark:bg-black border-t border-slate-900 dark:border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-extrabold tracking-tighter text-white mb-2 font-display flex items-center leading-none">
              BH<span className="text-brand-primary ml-1">Insights</span>
            </h2>
            <p className="text-[10px] font-bold text-slate-400 tracking-widest mb-6 uppercase">
              Business & Health Network
            </p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              El observatorio de la industria de la salud dedicado a la intersección entre datos, venture capital, tecnología y ciencias biológicas.
            </p>
          </div>
          
          <div>
            <h3 className="text-[10px] font-bold mb-6 tracking-widest uppercase text-slate-500">Explorar</h3>
            <ul className="space-y-4 font-medium">
              <li><Link to="/categoria/novedades" className="text-sm text-slate-300 hover:text-brand-primary transition-colors">Novedades</Link></li>
              <li><Link to="/categoria/mercado" className="text-sm text-slate-300 hover:text-brand-primary transition-colors">M&A y Mercado</Link></li>
              <li><Link to="/categoria/healthtech" className="text-sm text-slate-300 hover:text-brand-primary transition-colors">Tecnología</Link></li>
              <li><Link to="/categoria/educacion" className="text-sm text-slate-300 hover:text-brand-primary transition-colors">Educación</Link></li>
              <li><Link to="/categoria/trabajo" className="text-sm text-slate-300 hover:text-brand-primary transition-colors">Trabajo</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[10px] font-bold mb-6 tracking-widest uppercase text-slate-500">Network</h3>
            <ul className="space-y-4 font-medium">
              <li><Link to="/sobre-el-observatorio" className="text-sm text-slate-300 hover:text-brand-primary transition-colors">Sobre el Observatorio</Link></li>
              <li><Link to="/admin" className="text-sm text-slate-300 hover:text-brand-primary transition-colors">Portal de Administración</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 gap-6 font-bold uppercase tracking-widest">
          <span>© {new Date().getFullYear()} BH INSIGHTS</span>
        </div>
      </div>
    </footer>
  );
}
