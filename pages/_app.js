import '../styles/globals.css'
import "react-mde/lib/styles/css/react-mde-all.css";
function MyApp({ Component, pageProps }) {
  return (
        <Component {...pageProps} />
  )
}

export default MyApp
