import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Banner from '../../components/banner.js'
import Navbar from '../../components/navbar.js'
import Corousel from '../../components/corousel.js'
import { getVideos } from '../../lib/videoData.js'
export async function getServerSideProps({req}){
  const marvelVideos = await getVideos('marvel%20trailers');
  const dcVideos = await getVideos('dc%20trailers');
  const starWarsVideos = await getVideos('star%20wars')
  const response = await req.session;
  const user = JSON.stringify(response)
  
  return {
    props : {marvelVideos, dcVideos , starWarsVideos ,user },
  }

} 

export default function Home({marvelVideos , dcVideos , starWarsVideos ,user }) {
  const userjson = JSON.parse(user)
  console.log({userjson});
  console.log(marvelVideos , dcVideos , starWarsVideos);
  return (
    <div className={styles.body}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar username={userjson.email || "sample.email"} firstname={userjson.firstname} lastname={userjson.lastname}/>
      <Banner title={'The Mandalorian'} subTitle={'Grogue is a piece of shit'} imgUrl={'/static/1982639.webp'} videoId={'Znsa4Deavgg'}/>
    <div className={styles.sectionWrapper}>
      <Corousel title={"Marvel"} videos={marvelVideos} size="large"/>
      <Corousel title={"DC"} videos={dcVideos} size="small"/>
      <Corousel title={"Star Wars"} videos={starWarsVideos} size="medium"/>

      </div>


    </div>
  )
}
