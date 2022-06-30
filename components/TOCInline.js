/**
 * @typedef TocHeading
 * @prop {string} value
 * @prop {number} depth
 * @prop {string} url
 */

/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 *
 * @param {{
 *  toc: TocHeading[],
 *  indentDepth?: number,
 *  fromHeading?: number,
 *  toHeading?: number,
 *  asDisclosure?: boolean,
 *  exclude?: string|string[]
 * }} props
 *
 */
const TOCInline = ({
    toc,
    indentDepth = 3,
    fromHeading = 1,
    toHeading = 6,
    asDisclosure = false,
    exclude = '',
}) => {
    const re = Array.isArray(exclude)
        ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
        : new RegExp('^(' + exclude + ')$', 'i')

    const filteredToc = toc.filter(
        (heading) =>
            heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
    )

    const tocList = (
        <ul>
            {filteredToc.map((heading) => (
                <li
                    key={heading.value}
                    className={`toc-list mt-3 mb-3 ${heading.depth >= indentDepth && 'ml-6'}`}
                >
                    <a href={heading.url}>📝 {heading.value}</a>
                </li>
            ))}
        </ul>
    )

    return (
        <>
            {asDisclosure ? (
                <details open>
                    <summary className="ml-6 pt-2 pb-2 text-xl font-bold">
                        Table of Contents
                    </summary>
                    <div className="ml-6">{tocList}</div>
                </details>
            ) : (
                tocList
            )}
        </>
    )
}

export default TOCInline
