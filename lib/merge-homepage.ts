import { fallbackHomepage } from './fallback'
import type { HomepageData } from './types'

/**
 * Texte/FAQ/Kontakt aus Sanity, Medien fest aus /public/media + Fallback-Video.
 * (In Sanity liegen noch alte Unsplash-/Vimeo-Assets – die dürfen die Seite nicht überschreiben.)
 */
export function mergeHomepage(data: Partial<HomepageData> | null): HomepageData {
  const base = fallbackHomepage

  return {
    hero: {
      title: data?.hero?.title || base.hero.title,
      subtitle: data?.hero?.subtitle || base.hero.subtitle,
      // Fest die lokalen Medien – Sanity hat noch alte Video-/Bild-URLs
      videoUrl: base.hero.videoUrl,
    },
    usp: {
      title: data?.usp?.title || base.usp.title,
      text: data?.usp?.text || base.usp.text,
      mainImageUrl: base.usp.mainImageUrl,
      detailImageUrl: base.usp.detailImageUrl,
      galleryUrls: base.usp.galleryUrls,
    },
    // Services fest aus Fallback – aktuelle Leistungsliste im Code gepflegt
    services: base.services,
    about: {
      talha: {
        description: data?.about?.talha?.description || base.about.talha.description,
        imageUrl: base.about.talha.imageUrl,
      },
      senior: {
        description:
          data?.about?.senior?.description || base.about.senior.description,
        imageUrl: base.about.senior.imageUrl,
      },
    },
    faq:
      data?.faq && data.faq.length > 0
        ? data.faq
            .filter((item) => item?.question && item?.answer)
            .map((item) => ({
              question: item.question,
              answer: item.answer,
            }))
        : base.faq,
    contact: {
      address: data?.contact?.address || base.contact.address,
      phone: data?.contact?.phone || base.contact.phone,
      email: data?.contact?.email || base.contact.email,
      openingHours: base.contact.openingHours,
    },
  }
}
