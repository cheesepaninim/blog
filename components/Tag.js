import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'
import { useRouter } from 'next/router'

const Tag = ({ text }) => {
    const router = useRouter()
    const linkTo = (e) => {
        e.stopPropagation()
        router.push(`/tags/${kebabCase(text)}`)
    }

    return (
        /*<Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        {text.split(' ').join('-')}
      </a>
    </Link>*/

        <Link href={`/tags/${kebabCase(text)}`}>
            <a
                onClick={linkTo}
                className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
                {text.split(' ').join('-')}
            </a>
        </Link>
    )
}

export default Tag
