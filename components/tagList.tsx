const TagList = ({ tags }: { tags: string[] }) => {
  if (tags === undefined) {
    return ""
  }
  return (
    <>
      {tags.map((tag: string) => (
        <span key={tag} className="mt-4 mr-2 inline-flex items-center rounded-lg bg-yellow-100 px-3 py-1 text-sm font-normal text-slate-900 last:mr-0 hover:bg-yellow-500">
          {tag}
        </span>
      ))}
    </>
  )
}

export default TagList
