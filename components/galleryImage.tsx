import Image from 'next/image'
import Link from 'next/link'
import GalleryImageProps from '../types/galleryImage'
import { storyblokImageLoader } from '../lib/utils'

const GalleryImage = ({ image }: { image: GalleryImageProps }) => {
  const imageContent = image.content
  const imageFilename = imageContent.image.filename

  return (
    <Link href={`/images/${image['full_slug']}`}>
      <a href="#" className="group rounded-lg border border-yellow-500">
        <div className="aspect-w-3 aspect-h-2 w-full overflow-hidden rounded-t-lg bg-gray-200">
          <Image
            loader={storyblokImageLoader}
            quality="50"
            alt={imageContent.title} 
            src={imageFilename}
            sizes="50vw"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={imageFilename + '/m/500x0/filters:blur(10)'}
            className="transition-transform hover:scale-110"
          />
        </div>
        <h2 className="mt-2 pl-4 text-lg">{imageContent.title}</h2>
        <i className="mt-1 pl-4 text-sm font-medium text-gray-400">
          {imageContent.latin}
        </i>
      </a>
    </Link>
  )
}

export default GalleryImage
