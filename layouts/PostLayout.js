import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Notation from '@/components/Notation'
import TOCInline from '@/components/TOCInline'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
    `https://mobile.twitter.com/search?q=${encodeURIComponent(
        `${siteMetadata.siteUrl}/blog/${slug}`
    )}`

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ frontMatter, authorDetails, next, prev, children, toc }) {
    const { slug, fileName, date, title, images, tags } = frontMatter

    return (
        <SectionContainer>
            <BlogSEO
                url={`${siteMetadata.siteUrl}/blog/${slug}`}
                authorDetails={authorDetails}
                {...frontMatter}
            />
            <ScrollTopAndComment />
            <article>
                <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
                    <header className="pt-6 xl:pb-6">
                        <div className="space-y-1 text-center">
                            <dl className="space-y-10">
                                <div>
                                    <dt className="sr-only">Published on</dt>
                                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                        <time dateTime={date}>
                                            {new Date(date).toLocaleDateString(
                                                siteMetadata.locale,
                                                postDateTemplate
                                            )}
                                        </time>
                                    </dd>
                                </div>
                            </dl>
                            <div>
                                <PageTitle>
                                    <Notation type={'box'}>{title}</Notation>
                                </PageTitle>
                            </div>
                        </div>
                    </header>
                    <div
                        className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
                        style={{ gridTemplateRows: 'auto 1fr' }}
                    >
                        <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
                            <dt className="sr-only">Authors</dt>
                            <dd>
                                <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                                    {authorDetails.map((author) => (
                                        <li
                                            className="flex items-center space-x-2"
                                            key={author.name}
                                        >
                                            {author.avatar && (
                                                <Image
                                                    src={author.avatar}
                                                    width="38px"
                                                    height="38px"
                                                    alt="avatar"
                                                    className="h-10 w-10 rounded-full"
                                                />
                                            )}
                                            <dl className="whitespace-nowrap text-sm font-medium leading-5">
                                                <dt className="sr-only">Name</dt>
                                                <dd className="text-gray-900 dark:text-gray-100">
                                                    {author.name}
                                                </dd>
                                                <dt className="sr-only">Twitter</dt>
                                                <dd>
                                                    {author.twitter && (
                                                        <Link
                                                            href={author.twitter}
                                                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                                        >
                                                            {author.twitter.replace(
                                                                'https://twitter.com/',
                                                                '@'
                                                            )}
                                                        </Link>
                                                    )}
                                                </dd>
                                            </dl>
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </dl>
                        {slug.startsWith('economy/') && (
                            <p className="warning">
                                <span>
                                    📢 이제 막 공부를 시작한 주린이입니다. 이곳은 저의 개인적인 생각
                                    혹은 공부한 내용을 담고 있으며,
                                    <br />
                                    틀린 부분도 많을 수 있으니 투자에 참고조차 하지 않으시길
                                    바랍니다.
                                </span>
                                <br />
                                <span>
                                    📢 혹시나 내용 관련하여 틀린 점이나 부족한 점에 대해서 혹은
                                    궁금한 점은 화면
                                    <br />
                                    최하단 <a href="#footer">✉</a> 버튼을 눌러 메일을 보내주세요.
                                </span>
                            </p>
                        )}
                        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                            <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">
                                {children}
                            </div>
                            <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                                {/*<Link href={discussUrl(slug)} rel="nofollow">
                                    {'Discuss on Twitter'}
                                </Link>*/}
                                {` • `}
                                <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
                            </div>
                            {/*<Comments frontMatter={frontMatter} />*/}
                        </div>
                        <footer>
                            <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                                {/* TODO: TOC 높이 고정 */}
                                <div>
                                    <TOCInline toc={toc} exclude="Overview" />
                                </div>

                                {tags && (
                                    <div className="py-4 xl:py-8">
                                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                            Tags
                                        </h2>
                                        <div className="flex flex-wrap">
                                            {tags.map((tag) => (
                                                <Tag key={tag} text={tag} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {(next || prev) && (
                                    <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                                        {prev && (
                                            <div>
                                                <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                                    Previous Article
                                                </h2>
                                                <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                                                    <Link href={`/blog/${prev.slug}`}>
                                                        {prev.title}
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                        {next && (
                                            <div>
                                                <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                                    Next Article
                                                </h2>
                                                <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                                                    <Link href={`/blog/${next.slug}`}>
                                                        {next.title}
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="pt-4 xl:pt-8">
                                <Link
                                    href="/blog"
                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                >
                                    &larr; Back to the blog
                                </Link>
                            </div>
                        </footer>
                    </div>
                </div>
            </article>
        </SectionContainer>
    )
}
