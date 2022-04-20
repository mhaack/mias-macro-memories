type GalleryImageContent = {
  title: string
  latin?: string
  image: any
}

type GalleryImage = {
  full_slug: string
  published_at: string
  tag_list: string[]
  content: GalleryImageContent
}

export default GalleryImage
