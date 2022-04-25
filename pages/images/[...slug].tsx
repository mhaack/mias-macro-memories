import Head from 'next/head'
import Image, { ImageLoaderProps } from 'next/image'
import { getAllMacroImagesWithSlug, getMacroImageBySlug } from '../../lib/api'
import GalleryImage from '../../types/galleryImage'
import Layout from '../../components/layout'
import BackLink from '../../components/backLink'
import TagList from '../../components/tagList'
import { type } from 'os'

type Props = {
  macroImage: GalleryImage
  preview: boolean | null
}

const storyblokLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const params = [
    'm',
    width + 'x0',
    'filters:quality(' + (quality || '100') + ')',
  ]
  const paramsString = params.join('/') + '/'
  return `${src}/${paramsString}`
}

const ImageDetails = ({ macroImage, preview }: Props) => {
  const imageContent = macroImage.content
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
        <div className="my-4 overflow-hidden rounded-lg bg-gray-200">
          <Image
            loader={storyblokLoader}
            alt={imageContent.title}
            src={imageContent.image.filename}
            layout="responsive"
            width={6000}
            height={4000}
            priority
            placeholder="blur"
            blurDataURL={
              imageContent.image.filename + '/m/200x0/filters:blur(10)'
            }
          />
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="sm:basis-1/2">
            <h2 className="text-lg">{imageContent.title}</h2>
            {latinSubtitle}
          </div>
          <div className="sm:basis-1/2 sm:text-right">
            <TagList tags={macroImage.tag_list} />
          </div>
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
  const data = await getMacroImageBySlug(full_slug, preview)

  return {
    props: {
      preview,
      macroImage: data,
    },
  }
}

export const getStaticPaths = async () => {
  const allMacroImages = await getAllMacroImagesWithSlug()
  return {
    paths:
      allMacroImages?.map(
        (macroImage: any) => `/images/${macroImage['full_slug']}`
      ) || [],
    fallback: false,
  }
}

export default ImageDetails
