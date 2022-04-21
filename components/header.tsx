import Link from 'next/link'

const Header = () => {
  return (
    <h1 className="text-4xl font-teko sm:text-5xl md:text-6xl mb-6 text-yellow-500">
      <Link href="/">
        <a>Mia&apos;s Macro Memories</a>
      </Link>
    </h1>
  )
}

export default Header
