import GalleryProps from '../types/gallery'
import GalleryImage from './galleryImage'

const Gallery = ({ images, preview = false }: GalleryProps) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {images.map((image: any) => (
        <GalleryImage key={image['full_slug']} image={image} />
      ))}
    </div>
  )
}

export default Gallery
