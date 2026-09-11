export type Category =
  | 'Templos y espiritualidad'
  | 'Palacios y fortalezas'
  | 'Agua y jardines'
  | 'Mercados y artesanía'
  | 'Historia y arquitectura';
export type Stage = {
  id: string;
  name: string;
  kind: 'city' | 'transit';
  subtitle: string;
  intro: string;
  image?: string;
  color: string;
};
export type Source = { title: string; url: string };
export type Place = {
  id: string;
  slug: string;
  stage: string;
  name: string;
  category: Category;
  image?: string;
  intro: string;
  history: string;
  highlights: string[];
  tip: string;
  sources: Source[];
  duration?: string;
  bestTime?: string;
  photo?: string;
  note?: string;
  zones?: { name: string; placeId?: string }[];
  gallery?: string[];
};
const rajasthan = (city: string): Source[] => [
  { title: 'Turismo de Rajasthan', url: `https://www.tourism.rajasthan.gov.in/${city}.html` },
];
const unesco = (id: string): Source[] => [
  { title: 'UNESCO · Patrimonio Mundial', url: `https://whc.unesco.org/en/list/${id}/` },
];
export const stages: Stage[] = [
  {
    id: 'udaipur',
    name: 'Udaipur',
    kind: 'city',
    subtitle: 'El comienzo, junto al agua',
    intro:
      'Templos, patios y lagos. Una primera etapa para alternar la mirada cercana con el horizonte abierto.',
    image: 'pichola',
    color: '#667b72',
  },
  {
    id: 'en-ruta-ranakpur',
    name: 'En ruta',
    kind: 'transit',
    subtitle: 'Nagda · Ranakpur',
    intro:
      'Dos paradas intermedias entre Udaipur y Jodhpur. La carretera también forma parte del viaje.',
    image: 'ranakpur',
    color: '#8b8265',
  },
  {
    id: 'jodhpur',
    name: 'Jodhpur',
    kind: 'city',
    subtitle: 'La piedra y la vida de la calle',
    intro:
      'De la escala del fuerte a los detalles del mercado. Cinco visitas para cambiar de perspectiva.',
    image: 'mehrangarh',
    color: '#526c82',
  },
  {
    id: 'ajmer',
    name: 'Ajmer',
    kind: 'city',
    subtitle: 'Una pausa para mirar despacio',
    intro: 'Una etapa dedicada a los templos jainistas, antes de continuar hacia Jaipur.',
    color: '#8d7257',
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    kind: 'city',
    subtitle: 'Geometría, color y oficio',
    intro:
      'Palacios y observación astronómica se alternan con una mirada a las telas y los mercados.',
    image: 'hawa',
    color: '#a45038',
  },
  {
    id: 'en-ruta-fatehpur',
    name: 'En ruta',
    kind: 'transit',
    subtitle: 'Fatehpur Sikri',
    intro: 'Una parada intermedia para acercarse a la arquitectura mogola antes de llegar a Agra.',
    image: 'fatehpur',
    color: '#986348',
  },
  {
    id: 'agra',
    name: 'Agra',
    kind: 'city',
    subtitle: 'Dos maneras de dejar huella',
    intro:
      'El Fuerte de Agra y el Taj Mahal: dos visitas que invitan a leer la arquitectura desde ángulos distintos.',
    image: 'taj',
    color: '#767669',
  },
  {
    id: 'delhi',
    name: 'Delhi',
    kind: 'city',
    subtitle: 'Un final de muchas capas',
    intro: 'Jardines, arquitectura, memoria y artesanía. Las seis últimas visitas del recorrido.',
    image: 'humayun',
    color: '#7c6958',
  },
];
export const places: Place[] = [
  {
    id: 'jagdish',
    slug: 'templo-jagdish',
    stage: 'udaipur',
    name: 'Templo Jagdish',
    category: 'Templos y espiritualidad',
    image: 'jagdish',
    intro:
      'Empieza por el detalle. Dedica la primera mirada a la piedra tallada y después deja que el conjunto aparezca.',
    history: 'Dedicado a Vishnu, fue construido en 1651 bajo el patrocinio de Jagat Singh I.',
    highlights: ['El trabajo de talla', 'La composición vertical', 'El ritmo de los pilares'],
    tip: 'Pregunta qué espacios permiten la visita y evita interrumpir las prácticas religiosas.',
    sources: rajasthan('udaipur'),
  },
  {
    id: 'city-palace-udaipur',
    slug: 'palacio-de-la-ciudad',
    stage: 'udaipur',
    name: 'Palacio de la Ciudad (City Palace)',
    category: 'Palacios y fortalezas',
    image: 'city-palace-udaipur',
    intro:
      'Una visita para pasar del paisaje al pequeño detalle. Alterna vistas generales y pausas en cada espacio.',
    history:
      'El complejo palaciego se alza junto al lago Pichola; sus patios y balcones muestran distintas etapas de construcción.',
    highlights: ['La sucesión de patios', 'Los balcones', 'La relación con el lago'],
    tip: 'Antes de entrar, confirma qué partes del complejo incluye la visita disponible.',
    sources: rajasthan('udaipur'),
  },
  {
    id: 'saheliyon',
    slug: 'saheliyon-ki-bari',
    stage: 'udaipur',
    name: 'Saheliyon Ki Bari',
    category: 'Agua y jardines',
    image: 'saheliyon',
    intro:
      'Baja el ritmo. Aquí la propuesta es detenerse entre recorridos arquitectónicos y prestar atención al jardín.',
    history:
      'Un jardín asociado a Sangram Singh II, conocido por sus fuentes, pabellones y elefantes de mármol.',
    highlights: ['Las fuentes', 'Los detalles de mármol', 'La relación entre agua y vegetación'],
    tip: 'Deja margen para sentarte y observar; no hace falta convertir cada pausa en otra fotografía.',
    sources: rajasthan('udaipur'),
  },
  {
    id: 'fateh-sagar',
    slug: 'lago-fateh-sagar',
    stage: 'udaipur',
    name: 'Lago Fateh Sagar',
    category: 'Agua y jardines',
    image: 'fateh-sagar',
    intro: 'Una pausa de horizonte abierto. Sigue con la mirada el agua y las líneas del paisaje.',
    history:
      'Este lago artificial está rodeado de colinas y conectado con Pichola mediante un canal.',
    highlights: ['El horizonte del lago', 'El contorno de las colinas', 'Los cambios de luz'],
    tip: 'Valora el calor y la sombra disponibles antes de decidir cuánto caminar.',
    sources: rajasthan('udaipur'),
  },
  {
    id: 'pichola',
    slug: 'lago-pichola',
    stage: 'udaipur',
    name: 'Lago Pichola',
    category: 'Agua y jardines',
    image: 'pichola',
    intro:
      'Agua, reflejos y arquitectura. Una invitación a mirar Udaipur con algo más de distancia.',
    history:
      'El Palacio de la Ciudad ocupa su orilla oriental. El lago es una referencia central del paisaje urbano.',
    highlights: ['El reflejo de la ciudad', 'El frente del palacio', 'La luz sobre el agua'],
    tip: 'Si deseas realizar una actividad en el agua, consulta primero disponibilidad y condiciones actuales.',
    sources: rajasthan('udaipur'),
  },
  {
    id: 'bagore',
    slug: 'bagore-ki-haveli',
    stage: 'udaipur',
    name: 'Bagore Ki Haveli',
    category: 'Palacios y fortalezas',
    image: 'bagore',
    intro:
      'Cierra esta etapa con una escala más íntima. Busca las transiciones entre el exterior y los espacios interiores.',
    history:
      'Esta haveli del siglo XVIII, junto al lago Pichola, conserva interiores con vidrio y espejos.',
    highlights: ['Los espacios interiores', 'El trabajo con espejos', 'La escala de la haveli'],
    tip: 'Consulta la programación por separado: no presupongas que un espectáculo está incluido o disponible.',
    sources: rajasthan('udaipur'),
  },
  {
    id: 'nagda',
    slug: 'nagda',
    stage: 'en-ruta-ranakpur',
    name: 'Nagda',
    category: 'Historia y arquitectura',
    intro:
      'La primera parada en carretera. Reserva una pausa para situarte y observar el lugar sin apresurar la siguiente etapa.',
    history:
      'La guía conserva Nagda como parada del recorrido entre Udaipur y Jodhpur. El punto preciso de visita debe confirmarse con el itinerario de viaje.',
    highlights: [
      'La pausa entre etapas',
      'El entorno de la parada',
      'Los detalles del lugar confirmado',
    ],
    tip: 'Confirma el punto exacto de encuentro antes del traslado.',
    note: 'Nagda no se amplía aquí con templos o visitas que no figuran en tu recorrido.',
    sources: [],
  },
  {
    id: 'ranakpur',
    slug: 'templo-jainista-de-ranakpur',
    stage: 'en-ruta-ranakpur',
    name: 'Templo Jainista de Ranakpur',
    category: 'Templos y espiritualidad',
    image: 'ranakpur',
    intro:
      'Una parada para mirar de cerca y caminar despacio. El interior invita a seguir el ritmo de sus columnas.',
    history: 'El templo jainista de Ranakpur es conocido por la talla de sus pilares de mármol.',
    highlights: ['Los pilares tallados', 'La luz entre columnas', 'Los detalles de las cubiertas'],
    tip: 'Confirma las condiciones de acceso y fotografía antes de entrar; respeta los espacios de culto.',
    sources: [
      {
        title: 'Turismo de Rajasthan · Ranakpur',
        url: 'https://www.tourism.rajasthan.gov.in/content/rajasthan-tourism/en/tourist-destinations/ranakpur-temple.html',
      },
    ],
  },
  {
    id: 'mehrangarh',
    slug: 'fuerte-mehrangarh',
    stage: 'jodhpur',
    name: 'Fuerte Mehrangarh',
    category: 'Palacios y fortalezas',
    image: 'mehrangarh',
    intro:
      'Primero, la escala. Después, los detalles. Deja que la visita alterne ambas formas de mirar.',
    history:
      'El fuerte domina Jodhpur desde una elevación rocosa y alberga espacios palaciegos y colecciones de museo.',
    highlights: [
      'El perfil de las murallas',
      'La arquitectura palaciega',
      'La relación con Jodhpur',
    ],
    tip: 'Consulta el recorrido accesible y los desniveles antes de elegir cómo hacer la visita.',
    sources: rajasthan('jodhpur'),
  },
  {
    id: 'jaswant',
    slug: 'jaswant-thada',
    stage: 'jodhpur',
    name: 'Jaswant Thada',
    category: 'Historia y arquitectura',
    image: 'jaswant',
    intro:
      'Tras la presencia del fuerte, una visita para concentrarse en la luz, el material y la memoria.',
    history: 'Memorial de mármol blanco construido en recuerdo del maharajá Jaswant Singh II.',
    highlights: [
      'La superficie del mármol',
      'La silueta del memorial',
      'El contraste de luz y sombra',
    ],
    tip: 'Mantén una actitud respetuosa con el carácter conmemorativo del lugar.',
    sources: rajasthan('jodhpur'),
  },
  {
    id: 'umaid',
    slug: 'palacio-umaid-bhawan',
    stage: 'jodhpur',
    name: 'Palacio Umaid Bhawan',
    category: 'Palacios y fortalezas',
    image: 'umaid',
    intro:
      'Un cambio de lenguaje arquitectónico dentro de la etapa. Mira las proporciones antes de acercarte al detalle.',
    history:
      'El palacio combina usos de residencia, hotel y museo; esos ámbitos no equivalen a un único recorrido público.',
    highlights: ['La composición del edificio', 'La cúpula', 'La parte visitable del museo'],
    tip: 'Verifica qué zona está abierta al público. La ficha no implica acceso a espacios privados.',
    sources: rajasthan('jodhpur'),
  },
  {
    id: 'clock',
    slug: 'torre-del-reloj',
    stage: 'jodhpur',
    name: 'Torre del Reloj',
    category: 'Historia y arquitectura',
    image: 'clock',
    intro:
      'Vuelve a la escala de la calle. Usa la torre como referencia visual antes de continuar hacia el mercado.',
    history:
      'La torre del reloj es un hito urbano de Jodhpur vinculado al entorno comercial de la ciudad.',
    highlights: ['El reloj', 'La estructura de la torre', 'Su presencia en el espacio urbano'],
    tip: 'Detente a fotografiar desde un lugar que no interrumpa el paso.',
    sources: rajasthan('jodhpur'),
  },
  {
    id: 'mercado-jodhpur',
    slug: 'mercado-local',
    stage: 'jodhpur',
    name: 'Mercado Local',
    category: 'Mercados y artesanía',
    intro:
      'La última visita de Jodhpur propone otra forma de observar: materiales, conversaciones y ritmos cotidianos.',
    history:
      'La entrada se mantiene como Mercado Local, sin atribuirla a un comercio ni ampliar las zonas indicadas en el viaje.',
    highlights: [
      'Los materiales que encuentres',
      'Las formas de exposición',
      'El ritmo de la actividad',
    ],
    tip: 'Pregunta antes de tocar productos o fotografiar a las personas. Compara con calma y sin compromiso de compra.',
    sources: [],
  },
  {
    id: 'ajmer-jain',
    slug: 'templos-jainistas-de-ajmer',
    stage: 'ajmer',
    name: 'Templos Jainistas de Ajmer',
    category: 'Templos y espiritualidad',
    intro:
      'Una pausa dedicada a mirar y escuchar. Aborda esta etapa con tiempo para comprender el contexto de la visita.',
    history:
      'El itinerario no identifica los recintos concretos. Se conserva su denominación conjunta, sin sustituirla por un templo específico.',
    highlights: [
      'El contexto del culto',
      'Los detalles del recinto confirmado',
      'Los espacios permitidos a visitantes',
    ],
    tip: 'Confirma los templos previstos y sus normas con la organización del viaje antes de desplazarte.',
    note: 'La información histórica específica se incorporará cuando estén confirmados los recintos de esta etapa.',
    sources: [],
  },
  {
    id: 'purohit',
    slug: 'purohit-ji-ka-katla',
    stage: 'jaipur',
    name: 'Purohit Ji Ka Katla',
    category: 'Mercados y artesanía',
    intro:
      'El primer contacto con Jaipur en este recorrido pasa por el mercado. Mira, compara y deja espacio para descubrir.',
    history:
      'Purohit Ji Ka Katla figura como visita propia y también como subzona de Mercado. Ambas referencias corresponden al mismo lugar.',
    highlights: [
      'El recorrido por la zona',
      'Los productos disponibles',
      'Los detalles y acabados',
    ],
    tip: 'Anota lo que te interesa antes de decidir. Comprueba materiales y condiciones directamente con quien vende.',
    sources: [],
  },
  {
    id: 'textil',
    slug: 'mercado-textil',
    stage: 'jaipur',
    name: 'Mercado Textil',
    category: 'Mercados y artesanía',
    intro:
      'Una visita para mirar texturas y aprender a distinguir lo que tienes delante, sin una lista de compras obligatoria.',
    history:
      'La denominación del itinerario no fija tiendas ni calles concretas. Esta ficha organiza la visita sin atribuir especialidades no verificadas.',
    highlights: ['Textura y caída de las telas', 'Costuras y acabados', 'Colores bajo luz natural'],
    tip: 'Pregunta por composición, medidas y cuidados. No deduzcas el material o la técnica únicamente por el aspecto.',
    sources: [],
  },
  {
    id: 'amber',
    slug: 'fuerte-amber',
    stage: 'jaipur',
    name: 'Fuerte Amber',
    category: 'Palacios y fortalezas',
    image: 'amber',
    intro:
      'Una arquitectura que se entiende al recorrerla. Alterna la vista del conjunto con las pausas en sus patios.',
    history:
      'Amber reúne arquitectura defensiva y palaciega en un conjunto situado sobre una colina.',
    highlights: ['La implantación en el relieve', 'Los patios', 'La ornamentación interior'],
    tip: 'Consulta las opciones de acceso y el esfuerzo del recorrido antes de iniciar la subida.',
    sources: rajasthan('jaipur'),
  },
  {
    id: 'jal-mahal',
    slug: 'jal-mahal',
    stage: 'jaipur',
    name: 'Jal Mahal',
    category: 'Palacios y fortalezas',
    image: 'jal-mahal',
    intro:
      'Aquí la distancia también forma parte de la visita. La silueta del palacio y el agua componen una sola escena.',
    history:
      'Jal Mahal se sitúa en el agua; esta ficha propone contemplar su exterior, sin presuponer acceso al edificio.',
    highlights: ['La silueta del palacio', 'Los reflejos', 'El equilibrio entre edificio y agua'],
    tip: 'No des por hecho el acceso al interior o la disponibilidad de paseos en barca. Consulta información actualizada.',
    sources: rajasthan('jaipur'),
  },
  {
    id: 'city-palace-jaipur',
    slug: 'palacio-de-la-ciudad',
    stage: 'jaipur',
    name: 'Palacio de la Ciudad',
    category: 'Palacios y fortalezas',
    image: 'city-palace-jaipur',
    intro:
      'Una visita para seguir la relación entre patios, puertas y fachadas. Busca qué cambia al cruzar cada umbral.',
    history:
      'El Palacio de la Ciudad de Jaipur reúne patios, edificios palaciegos y espacios de museo.',
    highlights: ['La secuencia de patios', 'Las puertas decoradas', 'Los detalles de las fachadas'],
    tip: 'Confirma qué salas y áreas comprende la entrada disponible antes de organizar el recorrido.',
    sources: rajasthan('jaipur'),
  },
  {
    id: 'jantar',
    slug: 'jantar-mantar',
    stage: 'jaipur',
    name: 'Jantar Mantar',
    category: 'Historia y arquitectura',
    image: 'jantar',
    intro:
      'La geometría se convierte en una forma de mirar el cielo. Dedica tiempo a entender una pieza antes de pasar a la siguiente.',
    history:
      'Observatorio de Jai Singh II con instrumentos arquitectónicos para la observación astronómica; está inscrito en la lista de UNESCO.',
    highlights: [
      'Las formas geométricas',
      'La relación con las sombras',
      'La escala de los instrumentos',
    ],
    tip: 'Busca explicaciones de funcionamiento durante la visita: las formas se comprenden mejor con contexto.',
    sources: rajasthan('jaipur'),
  },
  {
    id: 'hawa',
    slug: 'hawa-mahal',
    stage: 'jaipur',
    name: 'Hawa Mahal',
    category: 'Palacios y fortalezas',
    image: 'hawa',
    intro:
      'Mira de lejos para descubrir el ritmo. Acércate después para encontrar las variaciones de cada ventana.',
    history:
      'La fachada de cinco pisos, con pequeñas ventanas en celosía, permitía observar la vida de la calle sin ser visto.',
    highlights: ['La repetición de ventanas', 'Las celosías', 'El perfil de la fachada'],
    tip: 'Separa la contemplación exterior de la visita interior y comprueba sus accesos por adelantado.',
    sources: rajasthan('jaipur'),
  },
  {
    id: 'mercado-jaipur',
    slug: 'mercado',
    stage: 'jaipur',
    name: 'Mercado',
    category: 'Mercados y artesanía',
    intro:
      'Tres subzonas, una misma experiencia. Un pequeño índice para orientar esta parte del paseo sin convertirla en una lista de tiendas.',
    history:
      'Esta entrada agrupa únicamente las tres subzonas indicadas en el recorrido. Purohit Ji Ka Katla reutiliza su ficha inicial.',
    highlights: ['Purohit Ji Ka Katla', 'Lal Ji Sand Ka Rasta', 'Navjeevan Plaza'],
    tip: 'Confirma la localización de cada subzona sobre el terreno. La secuencia de la guía no calcula distancias ni tiempos de paseo.',
    zones: [
      { name: 'Purohit Ji Ka Katla', placeId: 'purohit' },
      { name: 'Lal Ji Sand Ka Rasta' },
      { name: 'Navjeevan Plaza' },
    ],
    sources: [],
  },
  {
    id: 'fatehpur',
    slug: 'fatehpur-sikri',
    stage: 'en-ruta-fatehpur',
    name: 'Fatehpur Sikri',
    category: 'Historia y arquitectura',
    image: 'fatehpur',
    intro:
      'Entre Jaipur y Agra, una pausa para leer la arquitectura a través de sus espacios abiertos y sus volúmenes.',
    history:
      'Capital construida bajo Akbar en el siglo XVI, conserva un conjunto monumental de arquitectura mogola reconocido por UNESCO.',
    highlights: [
      'La composición de los espacios',
      'Los volúmenes de arenisca',
      'La relación entre patios y edificios',
    ],
    tip: 'Reserva margen para el acceso al conjunto y confirma las áreas abiertas el día de la visita.',
    sources: unesco('255'),
  },
  {
    id: 'agra-fort',
    slug: 'fuerte-de-agra',
    stage: 'agra',
    name: 'Fuerte de Agra',
    category: 'Palacios y fortalezas',
    image: 'agra-fort',
    intro:
      'Una primera mirada a Agra desde la arquitectura del poder. Recorre el contraste entre el recinto y sus interiores.',
    history:
      'La fortaleza mogola de arenisca roja contiene edificios palaciegos y está inscrita en la lista del Patrimonio Mundial.',
    highlights: ['El recinto de arenisca', 'Los patios palaciegos', 'Los cambios de material'],
    tip: 'Consulta el recorrido público actual; no todas las áreas del conjunto tienen por qué ser visitables.',
    sources: unesco('251'),
  },
  {
    id: 'taj',
    slug: 'taj-mahal',
    stage: 'agra',
    name: 'Taj Mahal',
    category: 'Historia y arquitectura',
    image: 'taj',
    intro:
      'Deja un momento para la primera mirada. Después, cambia de escala: del eje del conjunto a los detalles del mármol.',
    history:
      'Shah Jahan encargó este mausoleo en memoria de Mumtaz Mahal. Su arquitectura combina mármol blanco, simetría e incrustaciones.',
    highlights: [
      'La composición simétrica',
      'La talla y las incrustaciones',
      'La relación con el jardín',
    ],
    tip: 'Comprueba accesos, entradas y restricciones antes de ir. No planifiques la visita basándote en horarios recordados.',
    sources: unesco('252'),
  },
  {
    id: 'humayun',
    slug: 'tumba-de-humayun',
    stage: 'delhi',
    name: 'Tumba de Humayun',
    category: 'Historia y arquitectura',
    image: 'humayun',
    intro:
      'Delhi comienza con una invitación a entender el edificio desde el jardín. Camina, mira atrás y compara perspectivas.',
    history:
      'Este mausoleo-jardín del siglo XVI constituye una referencia temprana de la arquitectura funeraria mogola en India.',
    highlights: [
      'La relación entre tumba y jardín',
      'El volumen de la cúpula',
      'Los ejes de la composición',
    ],
    tip: 'Alterna recorridos y pausas según el calor y la sombra del día.',
    sources: unesco('232'),
  },
  {
    id: 'india-gate',
    slug: 'puerta-de-la-india-y-eje-ceremonial',
    stage: 'delhi',
    name: 'Puerta de la India y Eje Ceremonial',
    category: 'Historia y arquitectura',
    image: 'india-gate',
    intro:
      'Una visita de escala urbana. Observa cómo el monumento ordena el espacio y cómo cambia al recorrer su entorno.',
    history:
      'La Puerta de la India es un monumento conmemorativo de Delhi. Se conserva junto al Eje Ceremonial como una única visita.',
    highlights: ['La escala del arco', 'La perspectiva del eje', 'El espacio conmemorativo'],
    tip: 'Comprueba posibles restricciones de acceso o actos antes de acercarte; el recorrido puede variar.',
    sources: [
      { title: 'Delhi Tourism', url: 'https://delhitourism.gov.in/tourist_place/india_gate.html' },
    ],
  },
  {
    id: 'dilli-haat',
    slug: 'dilli-haat-ina',
    stage: 'delhi',
    name: 'Dilli Haat INA',
    category: 'Mercados y artesanía',
    image: 'dilli-haat',
    intro:
      'Un encuentro con los materiales y el trabajo artesanal. Preguntar por una pieza puede ser tan interesante como llevársela.',
    history:
      'Dilli Haat INA es un espacio de exposición y venta de artesanía, con participación de artesanos de distintas regiones.',
    highlights: [
      'Las técnicas de elaboración',
      'Los materiales',
      'Las conversaciones con artesanos',
    ],
    tip: 'La oferta puede cambiar. Consulta lo disponible y pregunta por el origen y los cuidados de cada pieza.',
    sources: [
      {
        title: 'Delhi Tourism · Dilli Haat INA',
        url: 'https://delhitourism.gov.in/tourist_place/dilli_haat_INA.html',
      },
    ],
  },
  {
    id: 'red-fort',
    slug: 'fuerte-rojo',
    stage: 'delhi',
    name: 'Fuerte Rojo',
    category: 'Palacios y fortalezas',
    image: 'red-fort',
    intro:
      'Otra forma de leer la memoria mogola. Del recinto exterior a la organización de los espacios palaciegos.',
    history:
      'Construido como palacio-fortaleza bajo Shah Jahan, el conjunto toma su nombre de sus murallas de arenisca roja.',
    highlights: [
      'Las murallas',
      'La disposición de los pabellones',
      'La arquitectura del conjunto palaciego',
    ],
    tip: 'Confirma controles y áreas abiertas antes de la visita; deja margen en el horario del día.',
    sources: unesco('231'),
  },
  {
    id: 'bangla',
    slug: 'gurudwara-bangla-sahib-park',
    stage: 'delhi',
    name: 'Gurudwara Bangla Sahib Park',
    category: 'Templos y espiritualidad',
    intro:
      'Una pausa de atención y respeto antes del cierre del viaje. Mantén la visita ajustada al lugar previsto en tu itinerario.',
    history:
      'Delhi Tourism identifica Bangla Sahib como un lugar de culto sij. La denominación «Park» del itinerario no se ha confirmado como un recinto independiente.',
    highlights: [
      'El entorno de la visita confirmada',
      'Las indicaciones de la comunidad',
      'El espacio para la pausa',
    ],
    tip: 'Confirma el punto exacto de esta parada y sigue las indicaciones locales sobre indumentaria y fotografía.',
    note: 'Se conserva el nombre proporcionado sin sustituirlo por otro destino ni atribuirle una ubicación precisa no verificada.',
    sources: [
      {
        title: 'Delhi Tourism · Lugares espirituales',
        url: 'https://delhitourism.gov.in/tourist_place/spritual_delhi.html',
      },
    ],
  },
  {
    id: 'qutab',
    slug: 'qutab-minar',
    stage: 'delhi',
    name: 'Qutab Minar',
    category: 'Historia y arquitectura',
    image: 'qutab',
    intro:
      'Termina mirando hacia arriba. La altura del minarete contrasta con el detalle de su superficie.',
    history:
      'El minarete, iniciado a finales del siglo XII, forma parte de un conjunto monumental reconocido por UNESCO.',
    highlights: [
      'La verticalidad del minarete',
      'Los relieves e inscripciones',
      'Los cambios de material',
    ],
    tip: 'La ficha no presupone acceso al interior del minarete. Consulta las condiciones actuales del recinto.',
    sources: unesco('233'),
  },
];
export const getStage = (id: string) => stages.find((s) => s.id === id)!;
export const stagePlaces = (id: string) => places.filter((p) => p.stage === id);
export const placeHref = (p: Place) => `/guia/${p.stage}/${p.slug}/`;
export const stageHref = (s: Stage) => `/guia/${s.id}/`;
export const stageLabel = (s: Stage) => (s.kind === 'transit' ? `En ruta · ${s.subtitle}` : s.name);
export const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
export function searchPlaces(query: string, stage = '', category = '') {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  return places.filter(
    (p) =>
      (!stage || p.stage === stage) &&
      (!category || p.category === category) &&
      words.every((w) =>
        normalize(
          [p.name, getStage(p.stage).name, p.category, ...(p.zones?.map((z) => z.name) || [])].join(
            ' ',
          ),
        ).includes(w),
      ),
  );
}
