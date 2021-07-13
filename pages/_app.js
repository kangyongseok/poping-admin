import SideMenu from '@/components/SideMenu';
import Header from '@/components/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header/>
      <SideMenu/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
