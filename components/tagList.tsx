import Link from 'next/link'

const TagList = ({ tags }: { tags: string[] }) => {
  if (tags === undefined) {
    return null
  }
  return (
    <>
      {tags.map((tag: string) => (
        <Link href={`/tags/${tag}`} key={tag}>
          <a className="mt-4 mr-2 inline-flex items-center rounded-lg bg-yellow-100 px-3 py-1 text-sm font-normal text-slate-900 last:mr-0 hover:bg-yellow-500">
            {tag}
          </a>
        </Link>
      ))}
    </>
  )
}

export default TagList
