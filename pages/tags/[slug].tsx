import BackLink from '../../components/backLink'
import Gallery from '../../components/gallery'
import Layout from '../../components/layout'
import { getAllImagesForTag, getAllTags } from '../../lib/api'
import GalleryProps from '../../types/gallery'

type TagsPageProps = GalleryProps & {
    tag: string
  }

const TagsPage = ({ images, tag, preview }: TagsPageProps) => {
  return (
    <Layout>
      <h2>All marco photos tagged with <span className='italic'>{tag}</span></h2>
      <BackLink text="Home" />
      <Gallery images={images} preview={preview} />
    </Layout>
  )
}

type Params = {
  params: {
    slug: string
  }
  preview: boolean | null
}

export const getStaticProps = async ({ params, preview = null }: Params) => {
  const images = (await getAllImagesForTag(params.slug, preview)) || []
  return {
    props: { images, tag: params.slug, preview },
  }
}

export const getStaticPaths = async () => {
  const allTags = await getAllTags()
  return {
    paths: allTags?.map((tag: any) => `/tags/${tag['name']}`) || [],
    fallback: false,
  }
}

export default TagsPage
