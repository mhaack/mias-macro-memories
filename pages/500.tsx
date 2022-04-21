import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

export default function Custom404() {
  return (
    <Layout>
      <Head>
        <title>Mia's Macro Memories</title>
      </Head>
      <div className="py-28 text-center">
        <h1 className="mb-10 text-4xl">500 - here are no photos ...</h1>
        <Link href="/">Back to Gallery</Link>
      </div>
    </Layout>
  )
}
