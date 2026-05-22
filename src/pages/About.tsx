import { ShieldCheck, Users, Search } from 'lucide-react';
import SEO from '../components/seo/SEO';

export default function About() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://bhinsights.es/sobre-el-observatorio"
    },
    "name": "Sobre el Observatorio",
    "description": "Conoce la misión del Observatorio BH Insights: analizar la evolución del talento, el liderazgo y la innovación en la industria biotecnológica.",
    "publisher": {
      "@type": "Organization",
      "name": "BH Insights",
      "url": "https://bhinsights.es",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bhinsights.es/logo.png"
      }
    }
  };

  return (
    <div className="bg-white text-[#0f172a]">
      <SEO 
        title="Sobre el Observatorio"
        description="Conoce la misión del Observatorio BH Insights: analizar la evolución del talento, el liderazgo y la innovación en la industria biotecnológica."
        url="https://bhinsights.es/sobre-el-observatorio"
        jsonLd={jsonLd}
        breadcrumbs={[
          { name: "Inicio", url: "https://bhinsights.es" },
          { name: "Sobre el Observatorio", url: "https://bhinsights.es/sobre-el-observatorio" }
        ]}
      />
      <header className="py-12 md:py-24 border-b border-slate-200 dark:border-white/10 relative overflow-hidden bg-white/50 dark:bg-black/20">
        <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-brand-primary/10 to-transparent blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-slate-900 dark:text-white mb-4 tracking-tighter drop-shadow-sm">Sobre el Observatorio</h1>
          <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-display font-medium">
            Somos un think-tank editorial dedicado a analizar la evolución del talento, 
            el liderazgo y la innovación en la industria farmacéutica y biotecnológica.
          </p>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-black font-sans text-slate-900 dark:text-white mt-12 mb-6 tracking-tight">Nuestra Misión</h2>
          <p className="text-lg md:text-xl text-slate-800 dark:text-slate-200 leading-loose mb-6 font-display font-medium">
            El Observatorio BH Insights nació de una constatación evidente en el mercado de la salud: 
            la ciencia avanza a un ritmo exponencial, pero las estructuras de gestión empresarial 
            a menudo no siguen el mismo paso. 
          </p>
          <p className="text-lg md:text-xl text-slate-800 dark:text-slate-200 leading-loose mb-6 font-display font-medium">
            Nuestra labor es documentar, analizar y debatir cómo la intersección de negocio, ciencia e 
            innovación conforma el nuevo estándar de oro para los profesionales del futuro. Formar a estas 
            nuevas generaciones no es un capricho académico, es la respuesta estructural a un ecosistema que exige 
            agilidad y conocimiento cruzado.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 -mx-4 md:-mx-16">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:border-brand-primary dark:hover:border-brand-primary rounded-3xl p-8 text-center group shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <Users size={40} className="mx-auto text-slate-900 dark:text-white group-hover:text-brand-primary mb-6 transition-colors" />
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 font-sans group-hover:text-brand-primary transition-colors">Red de Expertos</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-display">
              Colaboramos con perfiles en activo de la industria, desde VP Médicos hasta 
              Directores de Sostenibilidad.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:border-brand-primary dark:hover:border-brand-primary rounded-3xl p-8 text-center group shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <Search size={40} className="mx-auto text-slate-900 dark:text-white group-hover:text-brand-primary mb-6 transition-colors" />
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 font-sans group-hover:text-brand-primary transition-colors">Análisis en Datos</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-display">
              Nuestras tendencias están respaldadas por reportes de mercado y fact-checking 
              riguroso.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:border-brand-primary dark:hover:border-brand-primary rounded-3xl p-8 text-center group shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <ShieldCheck size={40} className="mx-auto text-slate-900 dark:text-white group-hover:text-brand-primary mb-6 transition-colors" />
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 font-sans group-hover:text-brand-primary transition-colors">Independencia</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-display">
              El contenido editorial explora modelos macro, con el patrocinio intelectual 
              de expertos en talento de salud.
            </p>
          </div>
        </div>

        <section className="mb-20">
           <h2 className="text-3xl md:text-4xl font-black font-sans text-slate-900 dark:text-white mt-12 mb-8 tracking-tight">Manifiesto de Transparencia</h2>
           <div className="text-lg text-slate-800 dark:text-slate-200 font-display font-medium space-y-8 leading-loose">
              <p>
                Como observatorio clave del sector, declaramos lo siguiente con respecto a nuestro 
                contenido y nuestra financiación:
              </p>
              <ul className="list-disc pl-6 space-y-6 marker:text-brand-primary">
                <li><strong className="text-slate-900 dark:text-white font-sans font-black tracking-tight block mb-1 content-['']">Gobernanza Editorial</strong> Los temas tratados, las investigaciones realizadas y las conclusiones expuestas en este portal son dictadas por nuestro Consejo Editorial de manera independiente.</li>
                <li><strong className="text-slate-900 dark:text-white font-sans font-black tracking-tight block mb-1 content-['']">Patrocinio y Educación</strong> Reconocemos el déficit de perfiles híbridos y exploramos abiertamente vías formativas y tendencias del mercado. Este espacio cuenta con el apoyo de distintas iniciativas y patrocinadores. Sin embargo, no somos una plataforma de venta comercial; nuestro mandato es estrictamente informativo e independiente.</li>
                <li><strong className="text-brand-primary font-sans font-black tracking-tight block mb-1 content-['']">Política de IA</strong> Utilizamos herramientas de Inteligencia Artificial para el análisis de datos y la estructuración de información, pero toda pieza editorial es revisada y validada por expertos humanos (Cumplimiento de estándares de calidad YMYL - Your Money or Your Life).</li>
              </ul>
           </div>
        </section>

      </main>
    </div>
  );
}
