import Link from 'next/link'
import { type } from 'os'

type Props = {
  text?: string
}

const BackLink = ({text = 'Gallery'}: Props) => {
  return (
    <Link href="/">
      <a className="inline-flex items-center mt-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
        Back to {text}
      </a>
    </Link>
  )
}

export default BackLink
