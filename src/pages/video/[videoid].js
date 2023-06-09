import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/videoId.module.css"
import cls from "classnames"
import { getVideoById } from "../../../lib/videoData";
import Navbar from "../../../components/navbar";
import Like from "../../../components/icons/like-icon";
import DisLike from "../../../components/icons/dislike-icon";

Modal.setAppElement('#__next');
export async function getServerSideProps({req}){
  const response = await req.session;
  const user = JSON.stringify(response)
  console.log("hemlo" , req.query);
  const videoid = await req.query.videoid;
  const video = await getVideoById(videoid)
  console.log({video})
  return {
    props : { user , video },
  }
}
const Video =  ({ video , user }) => {
  console.log({video});

  const userjson = JSON.parse(user)
  const router = useRouter();
  const handleToggleDislike = async () => {

  };

  const handleToggleLike = async () => {

  };

  if(video === {}){
    return <div>
      <Navbar username={userjson.email} firstname={userjson.firstname} lastname={userjson.lastname}/>

      <h1>{video.error}</h1>
    </div>
  }
    else{
    const {title , description  , publishedAt} = video.snippet;
    const {channelTitle} = video;
    const {viewCount} = video.statistics;
    return <div className={styles.container}>   
        <Navbar username={userjson.email} firstname={userjson.firstname} lastname={userjson.lastname}/>
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
        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={handleToggleLike}>
              <div className={styles.btnWrapper}>
                <Like />
              </div>
            </button>
          </div>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              <DisLike />
            </div>
          </button>
        </div>
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
    </div>}


}

export default Video;