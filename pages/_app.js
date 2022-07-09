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

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

import { logEvent } from '@/components/analytics/GoogleAnalytics'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

// import waterfall from "async-waterfall"
// import series from "async-series"
// import series from "async/series";

export default function App({ Component, pageProps }) {
    const r = useRouter()
    useEffect(() => {
        // const getOrderTime = 100 * 1
        // const makeFoodTime = 100 * 5
        // const deliverFoodTime = 100 * 2
        //
        // const getOrder = (callback, food) => {
        //     setTimeout(() => {
        //         console.log(`${food} ordered!`)
        //         callback(null, `deilicous ${food}`)
        //     }, getOrderTime)
        // }
        //
        // const makeFood = (food, callback) => {
        //     setTimeout(() => {
        //         console.log(`${food} cooked!`)
        //         callback(null, `cooked ${food}`)
        //     }, makeFoodTime)
        // }
        //
        // const deliverFood = (food, callback) => {
        //     setTimeout(() => {
        //         console.log(`${food} delivered!`)
        //         callback(null, 'Delivery The End')
        //     }, deliverFoodTime)
        // }
        //
        // const order = (food) => {
        //     waterfall([(callback) => getOrder(callback, food), makeFood, deliverFood], (err, result) => {
        //         err ? console.log(`err : ${err}`) : console.log(`result : ${result}`)
        //     })
        // }
        //
        // order('Pizza')

        // const seriesGetOrder = callback => {
        //     setTimeout(() => {
        //         console.log(`ordered!`)
        //         callback(null, 'ordered')
        //     }, getOrderTime)
        // }
        //
        // const seriesMakeFood = callback => {
        //     setTimeout(() => {
        //         console.log(`cooked!`)
        //         callback(null, 'cooked')
        //     }, makeFoodTime)
        // }
        //
        // const seriesDeliverFood = callback => {
        //     setTimeout(() => {
        //         console.log(`delivered!`)
        //         callback(null, 'delivered')
        //     }, deliverFoodTime)
        // }
        //
        // const seriesOrder = () => {
        //     series([seriesGetOrder, seriesMakeFood, seriesDeliverFood], (err, result) => {
        //         err ? console.log(`err : ${err}`) : console.log(result)
        //     })
        // }
        //
        // seriesOrder('Pizza')

        logEvent('page_move', `page to: ${r.asPath}`, '', '')
    }, [Component, pageProps])

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
