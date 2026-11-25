export type ProductCategory = 'puertas' | 'cerraduras';

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: ProductCategory;
  badge: string;
  /** Precio base de referencia en MercadoLibre México (MXN) */
  mercadoLibreBaseMXN: number;
  /** Porcentaje de utilidad aplicado (50%) */
  marginPercent: number;
  /** Precio final al público en Casa Amara (MXN) = base * 1.50 */
  priceMXN: number;
  /** Costo opcional de instalación profesional en Hermosillo */
  installationMXN: number;
  shortDesc: string;
  description: string;
  image: string;
  specs: string[];
  variants?: {
    label: string;
    options: string[];
  };
  dimensions?: string;
  warranty: string;
  inStock: boolean;
  rating: number;
  mlRank: string;
}

const applyMargin = (baseMXN: number, marginPercent = 50): number =>
  Math.round(baseMXN * (1 + marginPercent / 100));

export const CATALOG_PRODUCTS: Product[] = [
  // =========================================================================
  // TOP 5 PUERTAS DE SEGURIDAD (MERCADOLIBRE MÉXICO + 50% UTILIDAD)
  // =========================================================================
  {
    id: 'puerta-styrka-bismarck',
    sku: 'CA-PUE-STY-01',
    name: 'Puerta de Seguridad Styrka Bismarck',
    brand: 'Styrka',
    category: 'puertas',
    badge: 'Más Vendida ML #1',
    mercadoLibreBaseMXN: 4600,
    marginPercent: 50,
    priceMXN: applyMargin(4600, 50), // $6,900 MXN
    installationMXN: 1850,
    shortDesc: '100% acero acabado nogal/chocolate · 95×205 cm · Cerradura multipunto.',
    description:
      'Puerta de seguridad exterior fabricada en acero de alta resistencia con acabado estético tipo madera nogal/chocolate. Equipada con sistema de cerradura multipunto de 11 pasadores, marco reforzado y mirilla panorámica gran angular.',
    image: './images/door-wood-steel.jpg',
    specs: [
      'Medidas estándar: 95 × 205 cm',
      'Acero calibre reforzado con relleno aislante',
      'Cerradura multipunto con 11 pasadores de acero',
      'Mirilla óptica gran angular y timbre integrado',
      'Incluye juego de llaves de seguridad codificadas',
    ],
    variants: {
      label: 'Sentido de Apertura',
      options: ['Apertura Derecha', 'Apertura Izquierda'],
    },
    dimensions: '95 × 205 cm',
    warranty: '1 año directo con Casa Amara',
    inStock: true,
    rating: 4.8,
    mlRank: 'Top #1 en MercadoLibre MX',
  },
  {
    id: 'puerta-protecto-toledo',
    sku: 'CA-PUE-PRO-02',
    name: 'Puerta de Seguridad Protecto Home Toledo',
    brand: 'Protecto Home',
    category: 'puertas',
    badge: 'Más Vendida ML #2',
    mercadoLibreBaseMXN: 4490,
    marginPercent: 50,
    priceMXN: applyMargin(4490, 50), // $6,735 MXN
    installationMXN: 1850,
    shortDesc: 'Acero texturizado chocolate · 95×205 cm · Alta resistencia exterior.',
    description:
      'Uno de los modelos favoritos en México por su balance entre diseño minimalista y protección real. Estructura 100% de acero con recubrimiento anticorrosivo ideal para entradas principales expuestas al clima de Sonora.',
    image: './images/door-dark-luxury.jpg',
    specs: [
      'Medidas: 95 × 205 cm (marco incluido)',
      'Recubrimiento texturizado tono Chocolate',
      'Bisagras ocultas anti-palanca de acero',
      'Chapa multipunto con seguro nocturno interior',
      'Empaque perimetral contra polvo y calor',
    ],
    variants: {
      label: 'Sentido de Apertura',
      options: ['Apertura Derecha', 'Apertura Izquierda'],
    },
    dimensions: '95 × 205 cm',
    warranty: '1 año directo con Casa Amara',
    inStock: true,
    rating: 4.9,
    mlRank: 'Top #2 en MercadoLibre MX',
  },
  {
    id: 'puerta-protecto-sevilla',
    sku: 'CA-PUE-PRO-03',
    name: 'Puerta de Seguridad Protecto Home Sevilla',
    brand: 'Protecto Home',
    category: 'puertas',
    badge: 'Diseño Arquitectónico',
    mercadoLibreBaseMXN: 5990,
    marginPercent: 50,
    priceMXN: applyMargin(5990, 50), // $8,985 MXN
    installationMXN: 1950,
    shortDesc: 'Acero arquitectónico · Sello térmico/acústico ideal para Hermosillo.',
    description:
      'Eleva la fachada de tu hogar con líneas limpias contemporáneas y aislamiento térmico-acústico superior. Perfecta para residencias en Hermosillo que buscan conservar el aire acondicionado sin sacrificar máxima seguridad.',
    image: './images/door-wood-steel.jpg',
    specs: [
      'Medidas: 95 × 205 cm',
      'Aislamiento térmico y acústico reforzado',
      'Cerradura multipunto de 12 puntos de anclaje',
      'Acabado mate resistente a rayos UV',
      'Compatible con cerraduras inteligentes',
    ],
    variants: {
      label: 'Sentido de Apertura',
      options: ['Apertura Derecha', 'Apertura Izquierda'],
    },
    dimensions: '95 × 205 cm',
    warranty: '2 años en estructura y herrajes',
    inStock: true,
    rating: 4.9,
    mlRank: 'Top #3 en MercadoLibre MX',
  },
  {
    id: 'puerta-xe-luxury-s1',
    sku: 'CA-PUE-XE-04',
    name: 'Puerta de Seguridad XE Seguridad Luxury S1',
    brand: 'XE Seguridad',
    category: 'puertas',
    badge: 'Alta Gama',
    mercadoLibreBaseMXN: 7890,
    marginPercent: 50,
    priceMXN: applyMargin(7890, 50), // $11,835 MXN
    installationMXN: 2200,
    shortDesc: 'Calibre grueso 95×215 cm · 13 pasadores · Bisagras ocultas.',
    description:
      'Ingeniería de seguridad residencial superior de XE Seguridad. Altura estilizada de 2.15 m, lámina de acero de mayor calibre, 13 pasadores de cierre perimetral y estética sobria de lujo.',
    image: './images/door-dark-luxury.jpg',
    specs: [
      'Altura residencial de lujo: 95 × 215 cm',
      '13 pasadores de acero sólido en 4 direcciones',
      'Bisagras ocultas reforzadas de alta carga',
      'Umbral inferior en acero inoxidable',
      'Acabado arquitectura contemporánea Nogal Oscuro',
    ],
    variants: {
      label: 'Sentido de Apertura',
      options: ['Apertura Derecha', 'Apertura Izquierda'],
    },
    dimensions: '95 × 215 cm',
    warranty: '2 años garantía integral',
    inStock: true,
    rating: 4.9,
    mlRank: 'Top #4 en MercadoLibre MX',
  },
  {
    id: 'puerta-xe-serie-3l-fijo',
    sku: 'CA-PUE-XE-05',
    name: 'Puerta XE Seguridad Serie 3L con Fijo Lateral',
    brand: 'XE Seguridad',
    category: 'puertas',
    badge: 'Entrada Monumental',
    mercadoLibreBaseMXN: 11900,
    marginPercent: 50,
    priceMXN: applyMargin(11900, 50), // $17,850 MXN
    installationMXN: 2900,
    shortDesc: '120×215 cm con panel fijo lateral · Blindaje multipunto premium.',
    description:
      'Presencia imponente para entradas principales amplias. Combina la hoja principal blindada de acero con un panel fijo lateral de diseño arquitectónico con cristal templado esmerilado y reja de seguridad integrada.',
    image: './images/door-sidelight.jpg',
    specs: [
      'Medidas totales: 120 × 215 cm con fijo lateral',
      'Cristal templado esmerilado con protección interna',
      'Cerradura multipunto de alta seguridad XE',
      'Estructura de acero reforzado anti-impacto',
      'Ideal para fachadas modernas y residenciales',
    ],
    variants: {
      label: 'Sentido de Apertura',
      options: ['Apertura Derecha', 'Apertura Izquierda'],
    },
    dimensions: '120 × 215 cm',
    warranty: '2 años garantía integral',
    inStock: true,
    rating: 5.0,
    mlRank: 'Top #5 en MercadoLibre MX',
  },

  // =========================================================================
  // TOP 5 CERRADURAS INTELIGENTES (MERCADOLIBRE MÉXICO + 50% UTILIDAD)
  // =========================================================================
  {
    id: 'cerradura-dakuly-wifi',
    sku: 'CA-CER-DAK-01',
    name: 'Cerradura Inteligente Dakuly 5.0 Wi-Fi 5-en-1',
    brand: 'Dakuly / Tuya',
    category: 'cerraduras',
    badge: 'Más Vendida ML #1',
    mercadoLibreBaseMXN: 1290,
    marginPercent: 50,
    priceMXN: applyMargin(1290, 50), // $1,935 MXN
    installationMXN: 850,
    shortDesc: 'Huella 0.3s · App Tuya Wi-Fi · PIN anti-espía · RFID · Llave física.',
    description:
      'La cerradura inteligente con mejor relación calidad-precio en MercadoLibre México. Controla accesos desde tu celular vía Tuya Smart / Smart Life, genera códigos temporales para visitas y desbloquea al instante con huella biométrica.',
    image: './images/smart-lock-hero.jpg',
    specs: [
      '5 métodos: Huella, App Wi-Fi, PIN, Tarjeta RFID y Llave',
      'Compatible con Tuya Smart, Alexa y Google Home',
      'Lector biométrico semiconductor de 0.3 segundos',
      'Puerto USB de emergencia ante batería baja',
      'Compatible con puertas de 3.5 a 6.5 cm de grosor',
    ],
    variants: {
      label: 'Acabado',
      options: ['Negro Mate', 'Negro / Detalle Dorado'],
    },
    warranty: '1 año directo con Casa Amara',
    inStock: true,
    rating: 4.8,
    mlRank: 'Top #1 en MercadoLibre MX',
  },
  {
    id: 'cerradura-steren-lock510',
    sku: 'CA-CER-STE-02',
    name: 'Cerradura Inteligente Steren LOCK-510 Wi-Fi',
    brand: 'Steren',
    category: 'cerraduras',
    badge: 'Respaldo en México',
    mercadoLibreBaseMXN: 2490,
    marginPercent: 50,
    priceMXN: applyMargin(2490, 50), // $3,735 MXN
    installationMXN: 950,
    shortDesc: 'App Steren Home · Huella biométrica · Teclado táctil · RFID.',
    description:
      'Confiabilidad total de Steren México. Gestiona usuarios, recibe notificaciones de entrada en tiempo real en tu teléfono y crea contraseñas dinámicas con vigencia programada.',
    image: './images/smart-lock-yale.jpg',
    specs: [
      'Conexión Wi-Fi directa (sin hub adicional)',
      'App Steren Home en español (iOS y Android)',
      'Registro histórico de aperturas en tiempo real',
      'Alarma sonora ante intentos fallidos o forzado',
      'Alimentación con baterías AA + respaldo USB-C',
    ],
    variants: {
      label: 'Acabado',
      options: ['Negro Mate'],
    },
    warranty: '1 año garantía oficial Steren + Casa Amara',
    inStock: true,
    rating: 4.8,
    mlRank: 'Top #2 en MercadoLibre MX',
  },
  {
    id: 'cerradura-tocklock-tlx20',
    sku: 'CA-CER-TOC-03',
    name: 'Cerradura Biométrica Tock Lock TLX20',
    brand: 'Tock Lock',
    category: 'cerraduras',
    badge: 'Ideal Airbnb & Residencial',
    mercadoLibreBaseMXN: 3299,
    marginPercent: 50,
    priceMXN: applyMargin(3299, 50), // $4,949 MXN
    installationMXN: 950,
    shortDesc: 'Aleación de zinc alta resistencia · Códigos remotos · Alarma anti-forzado.',
    description:
      'Construcción robusta en aleación de zinc diseñada para puertas principales de alto tráfico. Genera códigos por fecha y hora para huéspedes, personal de servicio o familiares sin entregar llaves físicas.',
    image: './images/smart-lock-hero.jpg',
    specs: [
      'Cuerpo sólido en aleación de zinc resistente a intemperie',
      'Códigos temporales, cíclicos y de un solo uso',
      'Hasta 100 huellas digitales y 100 tarjetas RFID',
      'Bloqueo automático configurable al cerrar la puerta',
      'Función de código anti-espía (dígitos aleatorios)',
    ],
    variants: {
      label: 'Acabado',
      options: ['Negro Grafito', 'Bronce Oscuro'],
    },
    warranty: '1 año directo con Casa Amara',
    inStock: true,
    rating: 4.9,
    mlRank: 'Top #3 en MercadoLibre MX',
  },
  {
    id: 'cerradura-steren-lock480-cam',
    sku: 'CA-CER-STE-04',
    name: 'Cerradura Steren LOCK-480 con Videotimbre HD',
    brand: 'Steren',
    category: 'cerraduras',
    badge: 'Cámara + Intercomunicador',
    mercadoLibreBaseMXN: 3690,
    marginPercent: 50,
    priceMXN: applyMargin(3690, 50), // $5,535 MXN
    installationMXN: 1100,
    shortDesc: 'Videotimbre HD integrado · Audio bidireccional · Desbloqueo remoto.',
    description:
      'Mira quién toca a tu puerta en video HD desde cualquier lugar del mundo, conversa mediante audio bidireccional y autoriza la apertura de forma remota desde tu smartphone.',
    image: './images/smart-lock-camera.jpg',
    specs: [
      'Cámara gran angular HD con visión nocturna infrarroja',
      'Timbre integrado con notificación instantánea al celular',
      'Audio bidireccional + captura de foto al tocar',
      'Huella digital, código PIN, tarjeta RFID y llave mecánica',
      'Batería recargable de litio de larga duración',
    ],
    variants: {
      label: 'Acabado',
      options: ['Grafito / Detalle Oro'],
    },
    warranty: '1 año garantía oficial Steren + Casa Amara',
    inStock: true,
    rating: 4.9,
    mlRank: 'Top #4 en MercadoLibre MX',
  },
  {
    id: 'cerradura-yale-assure-yrl',
    sku: 'CA-CER-YAL-05',
    name: 'Cerradura Digital Yale Assure Lock YRL Wi-Fi',
    brand: 'Yale',
    category: 'cerraduras',
    badge: 'Lujo & Máxima Seguridad',
    mercadoLibreBaseMXN: 5490,
    marginPercent: 50,
    priceMXN: applyMargin(5490, 50), // $8,235 MXN
    installationMXN: 1200,
    shortDesc: 'Estándar mundial Yale · Pantalla táctil · Alexa, Google y Apple Home.',
    description:
      'El referente global en cerrajería arquitectónica. Pantalla táctil capacitiva libre de huellas residuales, integración nativa con ecosistemas de casa inteligente y certificación ANSI/BHMA Grado 2.',
    image: './images/smart-lock-yale.jpg',
    specs: [
      'Certificación de seguridad ANSI/BHMA Grado 2',
      'Teclado táctil iluminado de respuesta instantánea',
      'App Yale Connect Wi-Fi + Alexa y Google Assistant',
      'Auto-bloqueo inteligente y alerta de puerta entreabierta',
      'Acabado arquitectónico de alta durabilidad',
    ],
    variants: {
      label: 'Acabado',
      options: ['Negro Mate', 'Bronce Aceitado'],
    },
    warranty: '2 años garantía oficial Yale',
    inStock: true,
    rating: 5.0,
    mlRank: 'Top #5 en MercadoLibre MX',
  },
];

export const formatMXN = (amount: number): string =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(amount);
