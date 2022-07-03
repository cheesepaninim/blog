// import { TagSEO } from '@/components/SEO'
// import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
// import generateRss from '@/lib/generate-rss'
import { getAllCategories, getAllFilesFrontMatter } from '@/lib/mdx'
import { useEffect, useState } from 'react'
import { CategorySEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

const DEPTH_DIVIDER = '>'
const SUBLIST_SPLITTER = '/'

export async function getStaticProps({ params }) {
    console.log(params)

    const allPosts = await getAllFilesFrontMatter('blog')
    const categories = await getAllCategories('blog')

    return { props: { categories, posts: allPosts } }
}

export default function Category({ posts, categories }) {
    // Capitalize first letter and convert space to dash
    // const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)

    const [selected, setSelected] = useState(['All'])
    const [subList, setSubList] = useState(Object.keys(categories))
    const [filtered, setFiltered] = useState(posts)

    useEffect(() => {
        let list = categories
        selected.filter((v) => v !== 'All').forEach((p) => (list = list[p]))
        setSubList(Object.keys(list) || [])

        const path = selected.filter((v) => v !== 'All').join('/')
        setFiltered(posts.filter((post) => post.slug.includes(path)))
    }, [selected])

    const toPath = (i) => {
        setSelected(selected.slice(0, i + 1))
    }

    return (
        <>
            <CategorySEO
                title={`${selected.join('/')} - ${siteMetadata.author}`}
                description={`${selected.join('/')} category - ${siteMetadata.author}`}
            />
            <div>
                <h3 className="text-xl font-bold leading-9 tracking-tight text-gray-700 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14">
                    Category : &nbsp;
                    {selected.map((p, i) => (
                        <span key={`path_${p}_${i}`}>
                            {i !== 0 && ` ${DEPTH_DIVIDER} `}
                            <button
                                className={`
                                        ml-3 mr-3
                                        rounded-md border-2 bg-indigo-500 pl-2 pt-0 pb-0 
                                        pr-2 font-semibold text-slate-50
                                    `}
                                style={i === selected.length - 1 ? { color: '#efff00' } : {}}
                                onClick={() => toPath(i)}
                            >
                                {p}
                            </button>
                        </span>
                    ))}
                </h3>
                <br />
                {subList.map((c, i) => (
                    <span key={c}>
                        {i !== 0 && SUBLIST_SPLITTER}
                        <button
                            className={`
                                    ml-3 mr-3 rounded-md border-2
                                    border-indigo-500/50 pl-2
                                    pr-2 font-semibold text-indigo-400 ring-2
                                `}
                            onClick={() => setSelected([...selected, c])}
                        >
                            {c}
                        </button>
                    </span>
                ))}
                <br />
                <br />
            </div>

            <ListLayout posts={filtered} />
        </>
    )
}
