import Head from 'next/head'
import BackLink from '../components/back-link'
import Layout from '../components/layout'

export default function Custom404() {
  return (
    <Layout>
      <Head>
        <title>Mia's Macro Memories</title>
      </Head>
      <div className="py-28 text-center">
        <h1 className="mb-10 text-4xl">404 - here are no photos ...</h1>
        <BackLink />
      </div>
    </Layout>
  )
}
