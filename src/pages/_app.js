import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
  <>
  <Head>
  <title>B21Σ - Ativos Digitais</title>
        <meta name="description" content="Curadoria e custódia de criptoativos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  </Head>
  <Component {...pageProps} />
  </>
  )
}
