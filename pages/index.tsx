import { getAllImagesForHome } from '../lib/api'
import Layout from '../components/layout'
import GalleryProps from '../types/gallery'
import Gallery from '../components/gallery'

const Home = ({ images, preview }: GalleryProps) => {
  return (
    <Layout>
      <h2>A small macro photo gallery</h2>
      <Gallery images={images} preview={preview} />
    </Layout>
  )
}

export const getStaticProps = async ({ preview = null }) => {
  const images = (await getAllImagesForHome(preview)) || []
  return {
    props: { images, preview },
  }
}

export default Home
