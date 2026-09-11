import rawImages from '@/data/images.json';
export type Photo = {
  id: string;
  title: string;
  source: string;
  original: string;
  author: string;
  license: string;
  licenseUrl: string;
  description: string;
  changes: string;
  variants: { src: string; width: number; height: number }[];
};
export const images: Record<string, Photo> = rawImages;
export function getPhoto(id?: string) {
  return id ? images[id] : undefined;
}
export const photoAlt: Record<string, string> = {
  jagdish: 'Arquitectura tallada del Templo Jagdish',
  'city-palace-udaipur': 'Fachada y balcones del Palacio de la Ciudad de Udaipur',
  saheliyon: 'Jardín y fuente de Saheliyon Ki Bari',
  'fateh-sagar': 'Vista del lago Fateh Sagar y su entorno',
  pichola: 'Arquitectura de Udaipur reflejada en el lago Pichola',
  bagore: 'Bagore Ki Haveli en Udaipur',
  ranakpur: 'Arquitectura del templo jainista de Ranakpur',
  mehrangarh: 'El Fuerte Mehrangarh sobre Jodhpur',
  jaswant: 'El memorial de mármol blanco de Jaswant Thada',
  umaid: 'Fachada y cúpula del Palacio Umaid Bhawan',
  clock: 'La Torre del Reloj de Jodhpur',
  amber: 'El conjunto del Fuerte Amber en la colina',
  'jal-mahal': 'Jal Mahal rodeado de agua',
  'city-palace-jaipur': 'Arquitectura del Palacio de la Ciudad de Jaipur',
  jantar: 'Instrumentos arquitectónicos de Jantar Mantar, Jaipur',
  hawa: 'Fachada de Hawa Mahal con sus ventanas y celosías',
  fatehpur: 'Arquitectura de arenisca de Fatehpur Sikri',
  'agra-fort': 'El recinto del Fuerte de Agra',
  taj: 'El mausoleo de mármol blanco del Taj Mahal',
  humayun: 'La Tumba de Humayun y su jardín',
  'india-gate': 'El arco conmemorativo de la Puerta de la India',
  'dilli-haat': 'El espacio de mercado de Dilli Haat INA',
  'red-fort': 'Murallas de arenisca del Fuerte Rojo de Delhi',
  qutab: 'El minarete Qutab Minar en Delhi',
};
