export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  tag: 'Interior' | 'Exterior' | 'Automatización';
  description: string;
  highlights: string[];
  image: string;
  startingHint: string;
}

export const STUDIO_SERVICES: ServiceItem[] = [
  {
    id: 'lambrin',
    title: 'Instalación de Lambrín',
    subtitle: 'Interior en Madera & Exterior WPC',
    tag: 'Interior',
    description:
      'Muros de acento con lambrín acanalado e iluminación LED indirecta cálida, además de lambrín WPC de alta densidad formulado para resistir el sol extremo de Hermosillo sin deformarse.',
    highlights: [
      'Lambrín WPC exterior con protección UV para Sonora',
      'Muros de TV, cabeceras, arcos y plafones iluminados',
      'Instalación limpia con nivelación láser en 24-48 hrs',
    ],
    image: './images/service-lambrin.jpg',
    startingHint: 'Cotización por m² instalado',
  },
  {
    id: 'portones',
    title: 'Portones Automáticos',
    subtitle: 'Corredizos, Abatibles y Ascendentes',
    tag: 'Automatización',
    description:
      'Diseño, herrería arquitectónica y automatización silenciosa con apertura desde control remoto, teclado o aplicación Wi-Fi. Combinamos acero estructural con acabados tipo madera y lambrín exterior.',
    highlights: [
      'Motores silenciosos de uso residencial e intensivo',
      'Apertura desde celular + respaldo de batería',
      'Diseños minimalistas en herrería, aluminio y WPC',
    ],
    image: './images/service-gate.jpg',
    startingHint: 'Diseño a medida + motorización',
  },
  {
    id: 'cocinas',
    title: 'Diseño de Cocinas',
    subtitle: 'Carpintería Fina & Cubiertas de Cuarzo',
    tag: 'Interior',
    description:
      'Cocinas integrales contemporáneas con islas acanaladas, herrajes de cierre suave, cubiertas en cuarzo o granito natural e iluminación cálida integrada bajo alacenas.',
    highlights: [
      'Render 3D previo antes de fabricar',
      'Herrajes cierre lento y optimización de espacio',
      'Materiales resistentes a humedad y temperatura',
    ],
    image: './images/service-kitchen.jpg',
    startingHint: 'Proyecto llave en mano',
  },
  {
    id: 'banos',
    title: 'Diseño de Baños',
    subtitle: 'Estilo Spa & Nichos Iluminados',
    tag: 'Interior',
    description:
      'Transformamos baños en santuarios de descanso: muebles flotantes con textura lambrín, espejos en arco retroiluminados, grifería en latón cepillado y cancelería templada.',
    highlights: [
      'Espejos con luz cálida indirecta y nichos en arco',
      'Recubrimientos en travertino y porcelanato gran formato',
      'Plomería, cancelería e iluminación integral',
    ],
    image: './images/service-bath.jpg',
    startingHint: 'Remodelación integral',
  },
  {
    id: 'salas-comedores',
    title: 'Salas y Comedores',
    subtitle: 'Espacios Sociales con Carácter',
    tag: 'Interior',
    description:
      'Interiorismo completo para áreas sociales: arcos arquitectónicos de yeso, muros de lambrín, centros de entretenimiento a medida, iluminación escénica y curaduría de mobiliario.',
    highlights: [
      'Arcos decorativos y nichos escultóricos iluminados',
      'Diseño de iluminación cálida por escenas',
      'Paleta orgánica en arenas, nogal y latón',
    ],
    image: './images/service-living.jpg',
    startingHint: 'Asesoría + ejecución completa',
  },
  {
    id: 'patios-terrazas',
    title: 'Patios y Terrazas',
    subtitle: 'Oasis Exteriores para Hermosillo',
    tag: 'Exterior',
    description:
      'Creamos áreas exteriores disfrutables todo el año en Sonora: pérgolas con sombreado térmico, áreas de asador, muros decorativos, iluminación ambiental y paisajismo desértico moderno.',
    highlights: [
      'Pérgolas de acero y WPC con confort térmico',
      'Barras de asador en piedra sinterizada y concreto',
      'Iluminación arquitectónica nocturna de bajo consumo',
    ],
    image: './images/service-terrace.jpg',
    startingHint: 'Diseño + construcción exterior',
  },
];

export const HERMOSILLO_ZONES = [
  'Colonia Pitic',
  'Los Lagos',
  'La Jolla',
  'Monterosa',
  'Centenario',
  'Valle Grande',
  'San Carlos (Proyectos especiales)',
  'Corredor Morelos y Kino',
];
