import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import PageLayout from '../../components/layout'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { Inter } from 'next/font/google'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const inter = Inter({ subsets: ['latin'] })

/**
 * La siguiente funcion se encarga de renderizar el layout o no dependiendo
 * de la ruta. Actualmente solo ignora /login y /signup.
 */
export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const getContent = () => {
    if (['/login', '/signup'].includes(appProps.router.pathname))
      return <Component {...pageProps} className={inter.className} />
    
    return (
      <div className={inter.className}>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </div>
    )
  }
  return getContent()
}
