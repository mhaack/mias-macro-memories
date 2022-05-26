type GalleryImageContentProps = {
  title: string
  latin?: string
  image: any
}

type GalleryImageProps = {
  full_slug: string
  published_at: string
  tag_list: string[]
  content: GalleryImageContentProps
}

export default GalleryImageProps
