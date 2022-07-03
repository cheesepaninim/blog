// import { TagSEO } from '@/components/SEO'
// import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
// import generateRss from '@/lib/generate-rss'
import { getAllCategories, getAllFilesFrontMatter } from '@/lib/mdx'
import { useEffect, useState } from 'react'

export async function getStaticProps({ params }) {
    const allPosts = await getAllFilesFrontMatter('blog')
    const categories = await getAllCategories('blog')

    console.log(allPosts)

    return { props: { categories, posts: allPosts } }
}

export default function Category({ posts, categories }) {
    // Capitalize first letter and convert space to dash
    // const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)

    const [categoryList, setCategoryList] = useState(Object.keys(categories))
    const [selected, setSelected] = useState('All')

    useEffect(() => {
        if (selected) {
            const spl = selected.split('>').filter((v) => v !== 'All' && v !== '')
            let list = categories
            spl.forEach((p) => (list = list[p]))
            setCategoryList(Object.keys(list) || [])
        }
    }, [selected])

    const toPath = (i) => {
        const spl = selected.split('>') /*.filter(v => v !== 'All')*/

        let path = ''
        spl.forEach((v, idx) => {
            if (idx <= i) {
                path === '' ? (path += v) : (path += '>' + v)
            }
        })

        setSelected(path)
    }

    return (
        <>
            <div>
                <h3 className="text-xl font-bold leading-9 tracking-tight text-gray-700 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14">
                    Category : &nbsp;
                    {selected.split('>').map((p, i) => (
                        <>
                            {i !== 0 && ' > '}
                            <button
                                key={`path_${p}`}
                                className={`
                                        ml-3 mr-3 rounded-md border-2
                                        border-indigo-500/50 pl-2
                                        pr-2 font-semibold text-indigo-400 ring-2
                                    `}
                                onClick={() => toPath(i)}
                            >
                                {p}
                            </button>
                        </>
                    ))}
                </h3>
                <br />
                {categoryList.map((c, i) => (
                    <>
                        {i !== 0 && '/'}
                        <button
                            key={c}
                            className={`
                                    ml-3 mr-3 rounded-md border-2
                                    border-indigo-500/50 pl-2
                                    pr-2 font-semibold text-indigo-400 ring-2
                                `}
                            onClick={() => setSelected(`${selected}${selected && '>'}${c}`)}
                        >
                            {c}
                        </button>
                    </>
                ))}
                <br />
                <br />
            </div>

            <ListLayout posts={posts} />
        </>
    )
}
