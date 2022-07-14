import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
    const [searchValue, setSearchValue] = useState('')
    const filteredBlogPosts = posts.filter((frontMatter) => {
        const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
        return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })

    // If initialDisplayPosts exist, display it if no searchValue is specified
    const displayPosts =
        initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const linkTo = (path) => {
        setLoading(true)
        router.push(path)
    }

    return (
        <>
            {loading && <Loading />}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pt-6 pb-8 xl:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        {title}
                    </h1>
                    <div className="relative max-w-xl">
                        <input
                            aria-label="Search articles"
                            type="text"
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search articles"
                            className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                        />
                        <svg
                            className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-2 xl:grid-cols-3">
                    {!filteredBlogPosts.length && 'No posts found.'}
                    {displayPosts.map((frontMatter) => {
                        const { slug, date, title, summary, tags, images } = frontMatter
                        return (
                            <div className="list-item group bg-day relative h-full transform rounded-lg transition duration-500 hover:scale-105"
                                 onClick={_ => linkTo(`/blog/${slug}`)}
                                 key={slug}
                            >
                                <div className="animate-tilt absolute -inset-0.5 rounded-lg"></div>
                                <article className="c-card relative block h-full overflow-hidden rounded-lg bg-cardBg">
                                    <div className="group relative max-h-4 overflow-hidden rounded-lg pb-60">
                                        <span>
                                            <img alt="thumg image" 
                                                 src={images[0] || "/static/images/monet512.png"}
                                                 className="absolute inset-0 h-full w-full object-cover" />
                                        </span>
                                    </div>
                                    <div className="h-full py-4 px-2">
                                        <span className="inline-flex w-full items-center justify-between">
                                            <span className="inline-block rounded border border-gray-700 py-1 px-2 text-xs font-medium">
                                                {tags.map((tag) => (
                                                    <Tag key={tag} text={tag} />
                                                ))}
                                            </span>
                                            <time dateTime={date}>{formatDate(date)}</time>
                                        </span>
                                        <h2 className="mt-2 mb-2 font-bold md:text-xl">{title}</h2>
                                        <p className="h-auto text-sm tracking-wider text-gray-300">{summary}</p>
                                    </div>
                                </article>
                            </div>
                        )
                    })}
                </div>
            </div>
            {pagination && pagination.totalPages > 1 && !searchValue && (
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                />
            )}
        </>
    )
}
