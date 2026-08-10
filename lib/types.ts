export type ServiceItem = {
  title: string
  description: string
}

export type PersonBlock = {
  imageUrl?: string | null
  description: string
}

export type FaqItem = {
  question: string
  answer: string
}

export type UspImages = {
  mainImageUrl?: string | null
  detailImageUrl?: string | null
  galleryUrls: string[]
}

export type HomepageData = {
  hero: {
    title: string
    subtitle: string
    videoUrl: string
  }
  usp: {
    title: string
    text: string
  } & UspImages
  services: ServiceItem[]
  about: {
    talha: PersonBlock
    senior: PersonBlock
  }
  faq: FaqItem[]
  contact: {
    address: string
    phone: string
    email: string
    openingHours: string
  }
}
