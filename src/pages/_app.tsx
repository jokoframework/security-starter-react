import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import PageLayout from '../../components/layout'

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const getLayout = Component.getLayout ?? PageLayout
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
