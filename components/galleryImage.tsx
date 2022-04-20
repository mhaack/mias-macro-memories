import Image from 'next/image'
import Link from 'next/link'
import GalleryImage from '../types/galleryImage'

const GalleryImage = ({ image }: { image: GalleryImage }) => {
  const imageContent = image.content
  return (
    <Link href={`/images/${image['full_slug']}`}>
      <a href="#" className="group rounded-lg border border-yellow-500">
        <div className="aspect-w-3 aspect-h-2 w-full overflow-hidden rounded-t-lg bg-gray-200">
          <Image
            alt={imageContent.title}
            src={imageContent.image.filename + '/m/500x0'}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={
              imageContent.image.filename + '/m/500x0/filters:blur(10)'
            }
            unoptimized
            className='transition-transform hover:scale-110'
          />
        </div>
        <h3 className="mt-2 pl-4 text-lg">{imageContent.title}</h3>
        <i className="mt-1 pl-4 text-sm font-medium text-gray-400">
          {imageContent.latin}
        </i>
      </a>
    </Link>
  )
}

export default GalleryImage
