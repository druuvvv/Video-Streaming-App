import Image from 'next/image'
import styles from './card.module.css'
import { useState } from 'react'
import { motion } from "framer-motion"
import cls from 'classnames'

const card = (props) => {
    const {imgUrl , size = "medium" , id } = props
    const [imgSrc , setImgSrc] = useState(imgUrl)
    const classMap = {
        large : styles.lgItem,
        medium : styles.mdItem,
        small : styles.smItem,
    }

    const errorHandler = () => {
        setImgSrc('/static/backup_image.jpg')
    }

    const scale = id === 0 ? {scaleY : 1.1} : {scale : 1.1}

    return <div className={styles.container}> 
    <motion.div 
        whileHover={{
            ...scale,
          }}
    className={cls(styles.imgMotionWrapper , classMap[size])}>    
        <Image 
            src={imgSrc} 
            alt="Image of the video" 
            layout="fill" 
            sizes="100vw"
            onError={errorHandler}
            className={styles.cardImg} 
            />
    </motion.div>
    </div>
}

export default card;