import { useState } from 'react'
import Head from 'next/head'
import Image, { ImageLoaderProps } from 'next/image'
import Lightbox from 'react-image-lightbox'
import exifr, { Exifr } from 'exifr'
import { getAllImagesWithSlug, getImageBySlug } from '../../lib/api'
import GalleryImage from '../../types/galleryImage'
import Layout from '../../components/layout'
import BackLink from '../../components/backLink'
import TagList from '../../components/tagList'
import ImageMetaData from '../../components/imageMetaData'
import 'react-image-lightbox/style.css'

type Props = {
  image: GalleryImage
  imageMetaData: any
  preview: boolean | null
}

const storyblokImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const params = [
    'm',
    width + 'x0',
    'filters:quality(' + (quality || '90') + ')',
  ]
  const paramsString = params.join('/') + '/'
  return `${src}/${paramsString}`
}

const ImageDetails = ({ image, imageMetaData, preview }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  const imageContent = image.content
  const latinSubtitle = imageContent.latin ? (
    <h3 className="mt-1 text-sm font-medium italic text-gray-400">
      {imageContent.latin}
    </h3>
  ) : (
    ''
  )

  return (
    <Layout>
      <Head>
        <title>{imageContent.title} | Mia&apos;s Macro Memories</title>
      </Head>
      <BackLink />
      <div className="pt-8">
        <div className="container relative mx-auto">
          <Image
            loader={storyblokImageLoader}
            alt={imageContent.title}
            src={imageContent.image.filename}
            onClick={toggleIsOpen}
            layout="responsive"
            className="h-auto w-full rounded-lg"
            width={6000}
            height={4000}
            priority
            placeholder="blur"
            blurDataURL={
              imageContent.image.filename + '/m/200x0/filters:blur(10)'
            }
          />
          <div className="absolute top-2 left-2 h-2 w-2">
            <button
              onClick={toggleIsOpen}
              type="button"
              aria-label="Zoom in"
              title="Zoom in"
              className="ril-zoom-in ril__builtinButton ril__zoomInButton"
            ></button>
          </div>
          {isOpen && (
            <Lightbox
              mainSrc={imageContent.image.filename + '/m/'}
              mainSrcThumbnail={
                imageContent.image.filename + '/m/200x0/filters:blur(30)'
              }
              imageTitle="Mia's Macro Memories"
              imageCaption={imageContent.title}
              onCloseRequest={toggleIsOpen}
            />
          )}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row">
          <div className="sm:basis-1/2">
            <h2 className="text-lg">{imageContent.title}</h2>
            {latinSubtitle}
          </div>
          <div className="sm:basis-1/2 sm:text-right">
            <TagList tags={image.tag_list} />
          </div>
        </div>
        <div className="mt-4 grid">
          <ImageMetaData
            imageMetaData={imageMetaData}
            publishedDate={image.published_at}
          />
        </div>
      </div>
    </Layout>
  )
}

type Params = {
  params: {
    slug: string[]
  }
  preview: boolean | null
}

export const getStaticProps = async ({ params, preview = null }: Params) => {
  const full_slug = params.slug?.join('/')
  const image = await getImageBySlug(full_slug, preview)
  const imageMetaData = await exifr.parse(image.content.image.filename, [
    'Make',
    'Model',
    'LensModel',
    'ISO',
    'FNumber',
  ])

  return {
    props: {
      preview,
      image,
      imageMetaData,
    },
  }
}

export const getStaticPaths = async () => {
  const images = await getAllImagesWithSlug()
  return {
    paths: images?.map((image: any) => `/images/${image['full_slug']}`) || [],
    fallback: false,
  }
}

export default ImageDetails
