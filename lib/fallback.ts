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
        'Maßanfertigung und sorgfältige Montage – von der Beratung bis zur Installation.',
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
        'Ja. Es gibt Parkplätze direkt vor der Tür – Sie können bequem vorfahren und Ihr Stück bringen oder abholen.',
    },
    {
      question:
        'Welche Nebenleistungen gibt es – kann man auch Vorhänge schneidern lassen?',
      answer:
        'Neben Maßänderungen und Reinigung bieten wir Teppichreinigung sowie einen Vorhangservice mit Maßanfertigung und Montage an. Vorhänge können Sie also ebenfalls bei uns schneidern und anfertigen lassen.',
    },
    {
      question: 'Brauche ich einen Termin?',
      answer:
        'Nein, Sie brauchen keinen Termin. Kommen Sie einfach während unserer Öffnungszeiten vorbei.',
    },
  ],
  contact: {
    address: 'Maxglaner Hauptstraße 64, 5020 Salzburg',
    phone: '0662 825881',
    email: 'info@schneiderei-yueksel.at',
    openingHours: 'Mo–Fr 09:00–18:00, Sa geschlossen',
  },
}
