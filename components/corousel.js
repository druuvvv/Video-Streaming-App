import Card from './card.js'
import styles from './corousel.module.css'

const corousel = (props) => {
    const {title , videos = [] , size} = props; 
   if(videos.length) return (<section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.cardWrapper}>
        {videos.map((video) => {
            return <Card imgUrl={video.thumbnail.url} size={size} videoId={video.videoId} index={video.index}/>
        })}
        </div>
    </section>)
    
}

export default corousel;