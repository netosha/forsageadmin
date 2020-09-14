import '../styles/globals.css'
import { Provider } from 'next-auth/client'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }) {
  return (
        <Component {...pageProps} />
  )
}

export default MyApp
