import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Image from '@/components/Image'
import { useRouter } from 'next/router'
import Notation from '@/components/Notation'

const LayoutWrapper = ({ children }) => {
    const router = useRouter()
    const nav = router.asPath.split('/')[1]

    return (
        <SectionContainer>
            <div className="flex h-screen flex-col justify-between">
                <header className="flex items-center justify-between py-10">
                    <div>
                        <Link href="/" aria-label={siteMetadata.headerTitle}>
                            <div className="flex items-center justify-between">
                                <div className="mr-3">
                                    {/*<Logo />*/}
                                    <Image
                                        alt={'logo image'}
                                        src={'/static/images/monet192.png'}
                                        width={'41'}
                                        height={'41'}
                                    />
                                    {/*<LogoImage />*/}
                                </div>
                                {typeof siteMetadata.headerTitle === 'string' ? (
                                    <div
                                        className="hidden h-6 text-2xl font-semibold sm:block"
                                        style={{ lineHeight: '1' }}
                                    >
                                        {router.asPath === '/' ? (
                                            <Notation type={'highlight'}>
                                                {siteMetadata.headerTitle}
                                            </Notation>
                                        ) : (
                                            siteMetadata.headerTitle
                                        )}
                                    </div>
                                ) : router.asPath === '/' ? (
                                    <Notation type={'highlight'}>
                                        {siteMetadata.headerTitle}
                                    </Notation>
                                ) : (
                                    siteMetadata.headerTitle
                                )}
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center text-base leading-5">
                        <div className="hidden sm:block">
                            {headerNavLinks.map((link) => (
                                <Link
                                    key={link.title}
                                    href={link.href}
                                    className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                                >
                                    {nav === link.title.toLowerCase() ? (
                                        <Notation type={'highlight'}>{link.title}</Notation>
                                    ) : (
                                        link.title
                                    )}
                                </Link>
                            ))}
                        </div>
                        <ThemeSwitch />
                        <MobileNav />
                    </div>
                </header>
                <main className="mb-auto">{children}</main>
                <Footer />
            </div>
        </SectionContainer>
    )
}

export default LayoutWrapper
