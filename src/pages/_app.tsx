import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import PageLayout from '../../components/layout'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const getContent = () => {
    if (['/login'].includes(appProps.router.pathname))
      return <Component {...pageProps} />
    
    return (
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    )
  }
  return getContent()
}
