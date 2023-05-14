import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/videoId.module.css"
import cls from "classnames"
import { getVideoById } from "../../../lib/videoData";
import Navbar from "../../../components/navbar";
Modal.setAppElement('#__next');

export const getStaticProps = async (staticProps) => {
  const params = staticProps.params;
  const video = await getVideoById(params.videoid);
  console.log(video);
  return {
    props: {
      video,
    },
    revalidate: 10
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { videoid : 'Znsa4Deavgg'}}],
    fallback: 'blocking', 
  };
}

const Video =  ({ video }) => {
  const router = useRouter();
    const {title , description  , publishedAt} = video.snippet;
    const {channelTitle} = video;
    const {viewCount} = video.statistics;
    return <div className={styles.container}>    
        <Modal
        isOpen={true}
        contentLabel="Watch this Video"
        overlayClassName={styles.overlay}
        className={styles.modal}
        onRequestClose={() => {router.back()}}
      >
        <iframe 
        id="ytplayer" 
        className={styles.videoPlayer}
        type="text/html" 
        width="100%" 
        height="360"
        src={`https://www.youtube.com/embed/${router.query.videoid}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
        frameborder="0"></iframe>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>Release Date : {publishedAt}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={cls(styles.subText , styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={cls(styles.subText , styles.subTextWrapper)}>
                <span className={styles.textColor}>Views </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>


}

export default Video;