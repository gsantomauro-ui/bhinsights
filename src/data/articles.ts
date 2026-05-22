export interface ArticleDef {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  author: {
    name: string;
    role: string;
  };
  date: string;
  imageUrl: string;
  readTime: string;
  content?: string;
  featured?: boolean;
  isBreaking?: boolean;
  type?: string;
}

export const EXCERPTS = {
  hibridList: "Las estructuras tradicionales en farmacéuticas están cediendo terreno. La brecha entre el conocimiento técnico puro y la estrategia de negocio es el mayor cuello de botella en los laboratorios actuales.",
  pharma2030: "ESG ya no es un departamento de Relaciones Públicas; es el motor de I+D. Al mismo tiempo, la inteligencia artificial reduce los tiempos de 'Drug Discovery' en un 60%, cambiando las P&L para siempre.",
  farmaciaVsAde: "La indecisión clásica del estudiante de ciencias ante un techo de cristal. Mientras unos dominan el laboratorio y otros los balances financieros, ambos carecen de la visión cruzada indispensable hoy.",
  marcoHibridos: "Negocio, Liderazgo, Innovación y Ciencia. Las columnas vertebrales que están redefiniendo cómo operan compañías como Moderna, Novartis o Pfizer.",
  cientificLiaison: "El MSL (Medical Science Liaison) ya no es solo una enciclopedia médica ambulante. Hoy se le pide influencia, mentalidad de negocio y capacidad de gestionar la innovación y los stakeholders clave.",
  novartisMa: "En un movimiento estratégico que consolida su pipeline biotecnológico, el gigante suizo desembolsa más de $1.2B por una prometedora startup especializada en radioligandos.",
  emaApproval: "La Agencia Europea del Medicamento establece un nuevo marco regulatorio que acelera la aprobación de ensayos clínicos descentralizados, favoreciendo el uso de wearables.",
  crispr: "Un nuevo hito en terapia génica: El primer tratamiento basado en CRISPR consigue asegurar reembolso en tres mercados europeos críticos tras duros años de negociación.",
  upskillingPharma: "Las corporaciones biofarmacéuticas redoblan su inversión en universidades corporativas y programas de upskilling para cerrar la brecha de competencias digitales.",
  mbaSalud: "El auge de los programas MBA especializados en ciencias de la salud responde a la necesidad de perfiles capaces de liderar la comercialización de terapias avanzadas.",
  futuroTrabajo: "El trabajo híbrido y la flexibilidad geográfica se consolidan como las palancas de retención de talento más efectivas tras las últimas fusiones en el sector farma.",
  compensacion: "Nuevas políticas de remuneración en la industria biotecnológica priorizan el bienestar mental y la formación continua por encima del paquete salarial clásico.",
};

const getMockContent = (excerpt: string) => `## Un cambio de paradigma en la industria

${excerpt}

### Análisis del Mercado

El ecosistema de salud está experimentando una metamorfosis sin precedentes. La investigación ya no transcurre en el vacío; está inexorablemente ligada a la viabilidad de mercado y al imperativo ético.

Según un informe reciente, los tiempos de desarrollo estratégicos se alargan no por obstáculos científicos, sino por cuellos de botella en la gestión transversal.

> "No podemos seguir resolviendo problemas del siglo XXI con organigramas del siglo XX."

### Palancas de crecimiento

* **Innovación cruzada:** Integración de biología molecular y data science.
* **Agilidad regulatoria:** Nuevos marcos de aprobación 'fast-track'.
* **Atracción de talento intermedio:** Perfiles híbridos.

El sector está en una fase de consolidación. Las compañías que sobrevivan serán aquellas que operen como corporaciones integradas.`;

const REDACCION = {
  name: 'Redacción',
  role: 'BH Insights',
};

export const articles: ArticleDef[] = [
  {
    id: '1',
    slug: 'novartis-adquiere-startup-radioligandos',
    title: 'Novartis cierra la adquisición de RadiCore por $1.2B para liderar la terapia con radioligandos',
    excerpt: EXCERPTS.novartisMa,
    content: getMockContent(EXCERPTS.novartisMa),
    category: {
      id: 'mercado',
      name: 'Mercado y M&A',
      slug: 'mercado',
    },
    author: REDACCION,
    date: '28 Oct 2026',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=2070',
    readTime: '3 min read',
    featured: true,
    isBreaking: true,
    type: 'Última Hora'
  },
  {
    id: '2',
    slug: 'pharma-2030-impacto-sostenibilidad-ia-cuenta-resultados',
    title: 'Pharma 2030: El impacto de la sostenibilidad y la IA en la cuenta de resultados',
    excerpt: EXCERPTS.pharma2030,
    content: getMockContent(EXCERPTS.pharma2030),
    category: {
      id: 'healthtech',
      name: 'Tecnología Aplicada',
      slug: 'healthtech',
    },
    author: REDACCION,
    date: '27 Oct 2026',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070',
    readTime: '8 min read',
    type: 'Análisis'
  },
  {
    id: '3',
    slug: 'ema-aprueba-ensayos-descentralizados',
    title: 'La EMA da luz verde al nuevo marco europeo para ensayos clínicos descentralizados',
    excerpt: EXCERPTS.emaApproval,
    content: getMockContent(EXCERPTS.emaApproval),
    category: {
      id: 'novedades',
      name: 'Novedades de Marca',
      slug: 'novedades',
    },
    author: REDACCION,
    date: '27 Oct 2026',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070',
    readTime: '4 min read',
    type: 'Regulación'
  },
  {
    id: '4',
    slug: 'crispr-reembolso-europa',
    title: 'Victoria para la terapia génica: El primer tratamiento CRISPR asegura reembolso en Alemania, Francia y España',
    excerpt: EXCERPTS.crispr,
    content: getMockContent(EXCERPTS.crispr),
    category: {
      id: 'lanzamientos',
      name: 'Lanzamientos',
      slug: 'lanzamientos',
    },
    author: REDACCION,
    date: '26 Oct 2026',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=2070',
    readTime: '7 min read',
    type: 'Market Access'
  },
  {
    id: '5',
    slug: 'el-fin-del-perfil-unico-lideres-hibridos',
    title: 'El fin del perfil único: ¿Por qué la industria pharma busca ahora líderes híbridos?',
    excerpt: EXCERPTS.hibridList,
    content: getMockContent(EXCERPTS.hibridList),
    category: {
      id: 'mercado',
      name: 'Mercado y Talento',
      slug: 'mercado',
    },
    author: REDACCION,
    date: '25 Oct 2026',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070',
    readTime: '6 min read',
    type: 'Perspectivas'
  },
  {
    id: '6',
    slug: 'de-la-bata-blanca-al-despacho-evolucion-scientific-liaison',
    title: 'De la bata blanca al despacho de dirección: La evolución del Scientific Liaison',
    excerpt: EXCERPTS.cientificLiaison,
    content: getMockContent(EXCERPTS.cientificLiaison),
    category: {
      id: 'mercado',
      name: 'Mercado y Talento',
      slug: 'mercado',
    },
    author: REDACCION,
    date: '24 Oct 2026',
    imageUrl: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=2070',
    readTime: '6 min read',
    type: 'Opinión'
  },
  {
    id: '7',
    slug: 'upskilling-competencias-digitales-biotech',
    title: 'Academias corporativas: La respuesta de la industria ante el gap de habilidades analíticas',
    excerpt: EXCERPTS.upskillingPharma,
    content: getMockContent(EXCERPTS.upskillingPharma),
    category: {
      id: 'educacion',
      name: 'Educación',
      slug: 'educacion',
    },
    author: REDACCION,
    date: '23 Oct 2026',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2070',
    readTime: '5 min read',
    type: 'Formación'
  },
  {
    id: '8',
    slug: 'auge-mba-ciencias-salud',
    title: 'El fenómeno MBA en Health Science: Por qué los perfiles clínicos se matriculan en escuelas de negocios',
    excerpt: EXCERPTS.mbaSalud,
    content: getMockContent(EXCERPTS.mbaSalud),
    category: {
      id: 'educacion',
      name: 'Educación',
      slug: 'educacion',
    },
    author: REDACCION,
    date: '22 Oct 2026',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070',
    readTime: '6 min read',
    type: 'Tendencias'
  },
  {
    id: '9',
    slug: 'futuro-del-trabajo-hibrido-pharma',
    title: 'Retención estratégica: El modelo de trabajo híbrido se instala definitivamente en las oficinas corporativas farma',
    excerpt: EXCERPTS.futuroTrabajo,
    content: getMockContent(EXCERPTS.futuroTrabajo),
    category: {
      id: 'trabajo',
      name: 'Entorno Laboral',
      slug: 'trabajo',
    },
    author: REDACCION,
    date: '21 Oct 2026',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2070',
    readTime: '4 min read',
    type: 'Cultura'
  },
  {
    id: '10',
    slug: 'nuevas-politicas-compensacion-salud-mental',
    title: 'Más allá del bono: Las startups biotech lideran el cambio hacia beneficios centrados en la salud integral y el bienestar',
    excerpt: EXCERPTS.compensacion,
    content: getMockContent(EXCERPTS.compensacion),
    category: {
      id: 'trabajo',
      name: 'Entorno Laboral',
      slug: 'trabajo',
    },
    author: REDACCION,
    date: '20 Oct 2026',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070',
    readTime: '7 min read',
    type: 'Organización'
  }
];

export const getArticleBySlug = (slug: string) => articles.find(a => a.slug === slug);
export const getArticlesByCategory = (categorySlug: string) => articles.filter(a => a.category.slug === categorySlug);
export const getFeaturedArticle = () => articles.find(a => a.featured) || articles[0];
export const getRecentArticles = (limit: number) => [...articles].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0,limit);
