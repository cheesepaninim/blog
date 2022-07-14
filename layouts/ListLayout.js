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
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {!filteredBlogPosts.length && 'No posts found.'}
                    {displayPosts.map((frontMatter) => {
                        const { slug, date, title, summary, tags, images } = frontMatter
                        return (
                            <div className="group w-full bg-day dark:bg-night bg-opacity-50 dark:bg-opacity-50"
                                 key={slug} onClick={_ => linkTo(`/blog/${slug}`)}
                            >
                                <article className="c-card block bg-transparent rounded-lg overflow-hidden transform transition duration-500 group-hover:scale-105">
                                    <div className="relative pb-60 max-h-4 rounded-lg overflow-hidden">
                                        <span style={{
                                            boxSizing:'border-box',
                                            display:'block',
                                            overflow:'hidden',
                                            width:'initial',
                                            height:'initial',
                                            background:'none',
                                            opacity:1,
                                            border:0,
                                            margin:0,
                                            padding:0,
                                            position:'absolute',
                                            top:0,
                                            left:0,
                                            bottom:0,
                                            right:0
                                        }}>

                                            <img alt="thumg image" 
                                                 src={images[0] || "/static/images/monet512.png"} 
                                                 decoding="async" 
                                                 data-nimg="fill" 
                                                 className="absolute inset-0 h-full w-full opacity-80 dark:opacity-70 object-cover transform transition duration-700 group-hover:scale-110 group-hover:opacity-100" 
                                                 style={{
                                                     position:'absolute',
                                                     top:0,
                                                     left:0,
                                                     bottom:0,
                                                     right:0,
                                                     boxSizing:'border-box',
                                                     padding:0,
                                                     border:'none',
                                                     margin:'auto',
                                                     display:'block',
                                                     width:0,
                                                     height:0,
                                                     minWidth:'100%',
                                                     maxWidth:'100%',
                                                     minHeight:'100%',
                                                     maxHeight:'100%'
                                                 }}
                                                 sizes="50vw" 
                                             />

                                        </span>
                                    </div>
                                    <div className="py-4">
                                        <span className="w-full inline-flex justify-between items-center">
                                            {tags.map((tag) => (
                                                <Tag key={tag} text={tag} />
                                            ))}
                                            <time datetime={date} className="text-sm font-semibold">{formatDate(date)}</time>
                                        </span>
                                        <h2 className="mt-2 mb-2 md:text-xl font-bold">{title}</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 tracking-wider">{summary}</p>
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
