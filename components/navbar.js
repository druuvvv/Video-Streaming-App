import styles from './navbar.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
const Navbar = (props) => {
    const [showSignOut , setShowSignOut] = useState(false);
    const {username , firstname , lastname} = props;
    const initials = firstname.charAt(0) + lastname.charAt(0);
    const router = useRouter()
    const onClickHome = (event) => {
        event.preventDefault()
        router.push('/')
    }
    const onClickMyList = (event) => {
        event.preventDefault()
        router.push('/browse/MyList')
    }
    
    return <div className={styles.container}>
        <div className={styles.wrapper}>
            <a className={styles.logolink} href="/">
            <div className={styles.logoWrapper}>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" width={128} height={34} alt="Netflix Logo" />
            </div>
            </a>
        
        <ul className={styles.navItems}>
            <li className={styles.navItem} onClick={onClickHome}>Home</li>
            <li className={styles.navItem2} onClick={onClickMyList}>My list</li>
        </ul>

        <nav className={styles.navContainer}>
            <div>
            <button className={styles.usernameBtn} onClick={()=>{setShowSignOut(!showSignOut)}}>
                <div className={styles.usernameContainer}>
                    <div className={styles.initials}>
                        {initials}
                    </div>
                </div>
            </button>
           {(showSignOut && <div className={styles.navDropdown}>
                <div>
                    <Link href="/signout" className={styles.linkName}>
                   Sign Out
                    </Link>
                   <div className={styles.lineWrapper}></div>
                </div>
            </div>)}
            </div>
        </nav>
        </div>
    </div>
}

export default Navbar;