import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
    render() {
        return (
            <Html lang="en" className="scroll-smooth">
                <Head>
                    <link
                        rel="apple-touch-icon"
                        sizes="192x192"
                        href="/static/images/monet192.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="144x144"
                        href="/static/favicons/fav.ico"
                    />
                    <link rel="manifest" href="/static/favicons/site.webmanifest" />
                    {/*<link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />*/}
                    <meta name="msapplication-TileColor" content="#000000" />
                    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
                    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
                    <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
                </Head>
                <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
