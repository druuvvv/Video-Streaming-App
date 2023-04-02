import '@/styles/globals.css'
import { Roboto_Slab } from "next/font/google"
import {createContext} from 'react'
import {useState , useContext} from 'react'
import {useRouter} from 'next/router'
export const userContext = createContext();
export const loginContext = createContext();

const UserProvider = ({children}) => {
  
  const [userName , setUserName] = useState("");

  return (
    <userContext.Provider value={{userName , setUserName}}>
    {children}
  </userContext.Provider>
  )
}



const roboto = Roboto_Slab({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {

  
  return (<UserProvider><main className={roboto.className}>
      <Component {...pageProps} />
      </main>
      </UserProvider>)
}