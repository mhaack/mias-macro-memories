import Head from 'next/head'
import GalleryImage from '../components/galleryImage'
import Layout from '../components/layout'
import { getAllMacroImagesForHome } from '../lib/api'
import { default as GalleryImageType } from '../types/galleryImage'

type Props = {
  macroImages: GalleryImageType[]
  preview: boolean
}

const Gallery = ({ macroImages, preview }: Props) => {
  return (
    <Layout>
      <Head>
        <title>Mia's Macro Memories</title>
      </Head>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {macroImages.map((image: any) => (
          <GalleryImage key={image['full_slug']} image={image} />
        ))}
      </div>
    </Layout>
  )
}

export const getStaticProps = async ({ preview = null }) => {
  const macroImages = (await getAllMacroImagesForHome(preview)) || []
  return {
    props: { macroImages, preview },
  }
}

export default Gallery
