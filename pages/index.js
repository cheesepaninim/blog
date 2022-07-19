import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

import NewsletterForm from '@/components/NewsletterForm'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Loading from '@/components/Loading'

const MAX_DISPLAY = 5

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter('blog')

    return { props: { posts } }
}

export default function Home({ posts }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const linkTo = (path) => {
        setLoading(true)
        router.push(path)
    }

    return (
        <>
            {loading && <Loading />}
            <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                    <p align={'center'}>
                        <img
                            src="/static/images/monet512.png"
                            alt="site logo image - white poodle"
                            width={'60%'}
                        />
                    </p>
                    <div className={'gate'}>
                        <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-zinc-800 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-2xl md:leading-14">
                            🎉 Cheesepaninim 의 Diary, Blog 입니다
                        </h2>
                        <ul>
                            <li
                                className="text-center text-base font-semibold leading-9 tracking-tight text-zinc-500 dark:text-gray-100 sm:text-base sm:leading-10 md:text-base md:leading-14"
                                style={{ wordBreak: 'keep-all' }}
                            >
                                이 블로그는{' '}
                                <a
                                    href="https://tailwind-nextjs-starter-blog.vercel.app/"
                                    target={'_blank'}
                                    rel={'noreferrer'}
                                    className={'text-teal-500'}
                                >
                                    tailwind-nextjs-starter-blog
                                </a>{' '}
                                라는 스타터 템플릿을 사용하여 개발하였으며
                                <span className={'text-teal-500'}> 웹 개발</span>,{' '}
                                <span className={'text-teal-500'}>경제</span>와 관련된 공부를 하며
                                공부한 내용을 정리하고 기록하며 생각을 적고 있습니다.
                            </li>
                            <li
                                className="text-center text-base font-semibold leading-9 tracking-tight text-zinc-500 dark:text-gray-100 sm:text-base sm:leading-10 md:text-base md:leading-14"
                                style={{ wordBreak: 'keep-all' }}
                            >
                                추후 댓글 기능이 추가될 예정이지만 github{' '}
                                <i className={'font-medium'}>
                                    (개발 관련 사이트 정도로 생각해주시면 됩니다)
                                </i>{' '}
                                아이디를 통해서만 이용 가능합니다. 혹시나 궁금한 점이 있으시다면
                                아래{' '}
                                <a className={'text-teal-500'} href="#footer">
                                    ✉ 버튼
                                </a>
                                을 눌러 메일을 보내주세요.
                            </li>
                        </ul>
                    </div>
                </div>

                <br />

                <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        Latest
                    </h1>
                    <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                        {siteMetadata.description}
                    </p>
                </div>
                <ul className="">
                    {!posts.length && 'No posts found.'}
                    {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
                        const { slug, date, title, summary, tags } = frontMatter
                        return (
                            <li key={slug} className="list-item py-12">
                                <article onClick={(_) => linkTo(`/blog/${slug}`)}>
                                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                                        <dl>
                                            <dt className="sr-only">Published on</dt>
                                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                <time dateTime={date}>{formatDate(date)}</time>
                                            </dd>
                                        </dl>
                                        <div className="space-y-5 xl:col-span-3">
                                            <div className="space-y-6">
                                                <div>
                                                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                                        {title}
                                                    </h2>
                                                    <div className="flex flex-wrap">
                                                        {tags.map((tag) => (
                                                            <Tag key={tag} text={tag} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        )
                    })}
                </ul>
            </div>
            {posts.length > MAX_DISPLAY && (
                <div className="flex justify-end text-base font-medium leading-6">
                    <Link
                        href="/blog"
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label="all posts"
                    >
                        All Posts &rarr;
                    </Link>
                </div>
            )}
            {siteMetadata.newsletter.provider !== '' && (
                <div className="flex items-center justify-center pt-4">
                    <NewsletterForm />
                </div>
            )}
        </>
    )
}
