import { atmosphere } from './atmosphere'
import type { HomepageData } from './types'

export const fallbackHomepage: HomepageData = {
  hero: {
    title: 'Schneiderei Yüksel',
    subtitle:
      'Die erste Schneiderei Österreichs mit digitaler Kundenbetreuung – Handwerk seit 1990 in Salzburg.',
    videoUrl: 'https://vimeo.com/1216855830',
  },
  usp: {
    title: 'Digitale Kundenbetreuung.',
    text: 'Als erste Schneiderei in Österreich begleiten wir Sie digital: Per Link sehen Sie am Handy den Status Ihrer Anfertigung und wann sie abholbereit ist – persönlich, transparent, ohne Anruf.',
    mainImageUrl: atmosphere.fabric,
    detailImageUrl: atmosphere.detail,
    galleryUrls: [
      atmosphere.werkstatt,
      atmosphere.schneiden,
      atmosphere.reception,
    ],
  },
  services: [
    {
      title: 'Änderungen aller Art',
      description:
        'Kürzen, enger machen, Ärmel anpassen – präzise Maßarbeit für jedes Kleidungsstück.',
    },
    {
      title: 'Reparieren',
      description:
        'Risse, lose Knöpfe, defekte Reißverschlüsse – fachgerecht und haltbar instand gesetzt.',
    },
    {
      title: 'Recycling',
      description:
        'Alte Lieblingsstücke neu beleben – nachhaltig statt wegwerfen.',
    },
    {
      title: 'Reinigung',
      description:
        'Schonende Pflege für Anzüge, Kleider und empfindliche Stoffe.',
    },
    {
      title: 'Teppichreinigung',
      description:
        'Fachgerechte Reinigung mit Respekt vor Material und Farbe.',
    },
    {
      title: 'Vorhangservice',
      description:
        'Maßanfertigung – von der Beratung bis zur Fertigung.',
    },
  ],
  about: {
    talha: {
      description:
        'Talha führt das Atelier mit digitaler Kundenbetreuung und dem Anspruch, Handwerk zeitgemäß erlebbar zu machen.',
      imageUrl: atmosphere.talha,
    },
    senior: {
      description:
        'Seit 1990 steht er für gelebtes Handwerk in Salzburg und nachhaltige Präzision.',
      imageUrl: atmosphere.senior,
    },
  },
  faq: [
    {
      question: 'Gibt es Parkplätze vor Ort?',
      answer:
        'Ja, neben unserem Atelier stehen drei Parkplätze für Sie bereit. Sie können dort bequem parken, wenn Sie ein Kleidungsstück bringen oder abholen.',
    },
    {
      question: 'Ändern wir auch Brautkleider?',
      answer:
        'Brautkleider schneidern wir nicht. Gerne empfehlen wir Ihnen jedoch eine erfahrene Schneiderei unseres Vertrauens, die auf Brautkleider spezialisiert ist.',
    },
    {
      question:
        'Wie lange sind die Wartezeiten, bis meine Änderung fertig ist?',
      answer:
        'Ihre Änderung ist in der Regel innerhalb von fünf Werktagen fertig. Wenn gerade besonders viel zu tun ist, kann es etwas länger dauern. Wir informieren Sie dann frühzeitig.',
    },
    {
      question:
        'Habt ihr einen Express-Service, also Fertigstellung am selben Tag?',
      answer:
        'Eine Fertigstellung am selben Tag können wir in der Regel nicht zusagen. Wenn unsere Kapazitäten es zulassen, ist es aber möglich. Fragen Sie uns gerne persönlich oder telefonisch.',
    },
    {
      question: 'Brauche ich einen Termin?',
      answer:
        'Nein, Sie brauchen keinen Termin. Sie können während unserer Öffnungszeiten einfach vorbeikommen.',
    },
  ],
  contact: {
    address: 'Maxglaner Hauptstraße 64, 5020 Salzburg',
    phone: '0662 825881',
    email: 'schneiderei.yueksel@gmail.com',
    openingHours: 'Mo–Fr 08:00–18:00',
  },
}
