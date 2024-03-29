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

                    {/* 네이버, 구글 사이트 등록 */}
                    <meta
                        name="naver-site-verification"
                        content="bca08880780878f3caf0161ee0ca6c7914cff730"
                    />
                    <meta
                        name="google-site-verification"
                        content="ZdmK1dr_82TTlfrLjMspWX_bDV1mJN3jiyO0tQ2sjoM"
                    />

                    {/* ga-tag CSP test */}
                    {/*<meta httpEquiv="Content-Security-Policy" content="script-src 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com/;" />*/}
                    {/*<script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script>*/}

                    {/* google adsense */}
                    {/* <script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9320755189728660"
                        crossOrigin="anonymous"
                    />
                    */}

                    {/*<link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />*/}
                    <meta name="msapplication-TileColor" content="#000000" />
                    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
                    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
                    <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
                </Head>
                <body
                    className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white"
                    style={{
                        background: 'url(/static/images/Particles-0.1s-953px.svg)',
                        // backgroundColor: '#f7f6f3',
                        backgroundColor: '#fff',
                    }}
                >
                    <div id={'portal'} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
