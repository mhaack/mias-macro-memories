import Image, { ImageLoaderProps } from 'next/image'
import Link from 'next/link'
import GalleryImage from '../types/galleryImage'

const storyblokImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const params = [
    'm',
    width + 'x0',
    'filters:quality(' + (quality || '90') + ')',
  ]
  const paramsString = params.join('/') + '/'
  return `${src}/${paramsString}`
}

const GalleryImage = ({ image }: { image: GalleryImage }) => {
  const imageContent = image.content
  const imageFilename = imageContent.image.filename
  const imageSizes = imageFilename.match('^.*\/154596\/(.*)x(.*?)\/');

  return (
    <Link href={`/images/${image['full_slug']}`}>
      <a href="#" className="group rounded-lg border border-yellow-500">
        <div className="aspect-w-3 aspect-h-2 w-full overflow-hidden rounded-t-lg bg-gray-200">
          <Image
            loader={storyblokImageLoader}
            quality="50"
            alt={imageContent.title} 
            src={imageFilename}
            width={imageSizes[1]}
            height={imageSizes[2]}
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
