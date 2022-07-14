import { getAllCategories, getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
// import Category from "@/components/Category";

export const POSTS_PER_PAGE = 12

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter('blog')
    const categories = await getAllCategories('blog')
    const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
    const pagination = {
        currentPage: 1,
        totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    }

    return { props: { initialDisplayPosts, posts, pagination, categories } }
}

export default function Blog({ posts, initialDisplayPosts, pagination, categories }) {
    return (
        <>
            <PageSEO
                title={`Blog - ${siteMetadata.author}`}
                description={siteMetadata.description}
            />
            {/*{categories && <Category categories={categories} />}*/}
            <ListLayout
                posts={posts}
                initialDisplayPosts={initialDisplayPosts}
                pagination={pagination}
                title="All Posts"
            />
        </>
    )
}
