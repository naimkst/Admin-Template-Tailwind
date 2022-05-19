import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import 'react-toastify/dist/ReactToastify.css';
<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
