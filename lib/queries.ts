export const homepageQuery = `*[_type == "homepage"][0]{
  hero{
    title,
    subtitle,
    videoUrl
  },
  usp{
    title,
    text,
    "mainImageUrl": mainImage.asset->url,
    "detailImageUrl": detailImage.asset->url,
    "galleryUrls": gallery[].asset->url
  },
  services[]{
    title,
    description
  },
  about{
    talha{
      description,
      "imageUrl": image.asset->url
    },
    // Altes Feld „vater“ weiterlesen, bis im Studio auf „senior“ umgezogen
    "senior": coalesce(senior, vater){
      description,
      "imageUrl": image.asset->url
    }
  },
  faq[]{
    question,
    answer
  },
  contact{
    address,
    phone,
    email,
    openingHours
  }
}`
