import '@/styles/globals.css'
import { Roboto_Slab } from "next/font/google"
import {useState , useEffect } from 'react'
import Loading from '../../components/loading'
import {useRouter} from 'next/router'
const roboto = Roboto_Slab({
  weight: '400',
  subsets: ['latin'],
})


export default function App({ Component, pageProps }) {
  const [isLoading , setIsLoading] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  return isLoading ? <Loading /> : <main className={roboto.className}><Component {...pageProps} /></main>;

}