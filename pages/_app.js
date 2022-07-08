import '@/data/assets/css/tailwind.css'
// import '@/data/assets/css/prism.css'
import '@/data/assets/css/prism-material-dark.css'
import 'katex/dist/katex.css'

import '@fontsource/inter/variable-full.css'

import '@/data/assets/css/custom.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'
import { logEvent } from '@/components/analytics/GoogleAnalytics'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
    logEvent()

    return (
        <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
            <Head>
                <meta content="width=device-width, initial-scale=1" name="viewport" />
            </Head>
            {isDevelopment && isSocket && <ClientReload />}
            <Analytics />
            <LayoutWrapper>
                <Component {...pageProps} />
            </LayoutWrapper>
        </ThemeProvider>
    )
}
