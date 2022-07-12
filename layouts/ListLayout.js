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
                <ul>
                    {!filteredBlogPosts.length && 'No posts found.'}
                    {displayPosts.map((frontMatter) => {
                        const { slug, date, title, summary, tags, images } = frontMatter
                        return (
                            <li key={slug} className="list-item py-4">
                                <article
                                    onClick={(_) => linkTo(`/blog/${slug}`)}
                                >
                                    <div className="space-y-2 grid xl:grid-rows-2 xl:grid-cols-4 xl:grid-flow-col xl:space-y-0 gap-2 xl:gap-4">
                                        <div className="xl:row-span-2">
                                            <div style={{
                                                        display: "block",
                                                        overflow: "hidden",
                                                        position: "relative",
                                                        boxSizing: "border-box", 
                                                        margin: "0px"
                                            }}>
                                                <div style={{
                                                        display: "block",
                                                        boxSizing: "border-box", 
                                                        paddingTop: "62.5%"
                                                }}/>
                                                <img alt="thumg image" className="rounded object-cover" src={images[0] || "/static/images/monet512.png"} 
                                                     style={{
                                                            position: "absolute",
                                                            inset: "0px",
                                                            boxSizing: "border-box",
                                                            padding: "0px",
                                                            border: "none",
                                                            margin: "auto",
                                                            display: "block",
                                                            width: "0px",
                                                            height: "0px",
                                                            minWidth: "100%",
                                                            maxWidth: "100%",
                                                            minHeight: "100%",
                                                            maxHeight: "100%",
                                                }}/>
                                            </div>
                                        </div>
                                        <div className="order-first xl:order-none xl:col-span-3 space-y-6">
                                            <div>
                                                <dl>
                                                    <dt className="sr-only">Published on</dt>
                                                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                        <time dateTime={date}>{formatDate(date)}</time>
                                                    </dd>
                                                </dl>
                                                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                                    <a className="text-gray-900 dark:text-gray-100" href="/recettes/gateau-au-yaourt">{title}</a>
                                                </h2>
                                                <div className="flex flex-wrap">
                                                    {tags.map((tag) => (
                                                        <Tag key={tag} text={tag} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:row-span-1 xl:col-span-3">
                                            <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                                                {summary}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        )
                    })}
                </ul>
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
