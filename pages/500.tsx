import BackLink from '../components/back-link'
import Layout from '../components/layout'

export default function Custom404() {
  return (
    <Layout>
      <div className="py-28 text-center">
        <h1 className="mb-10 text-4xl">500 - here are no photos ...</h1>
        <BackLink />
      </div>
    </Layout>
  )
}
