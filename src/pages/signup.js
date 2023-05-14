import styles from '../styles/signup.module.css'
import Head from 'next/head'
import Image from "next/image";
import Link from "next/link";
import { useState} from 'react';
import useRouter from 'next/router';

const signup = () => {
    const router = useRouter;
    const [userFirstName , setUserFirstName] = useState("");
    const [userLastName , setUserLastName] = useState("");
    const [isLoading , setIsLoading] = useState(false);
    const [userEmail , setUserEmail] = useState("");
    const [userPassword , setUserPassword] = useState("");
    const [alertMessage , setAlertMessage] = useState("")

    const handleSignUpWithEmail = async (e) => {
      setIsLoading(true);
        const response = await fetch("/api/auth/createUser",{
            method : "POST",
            headers : {
              'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
              email : `${userEmail}`,
              password : `${userPassword}`,
              firstname : `${userFirstName}`,
              lastname : `${userLastName}`,
            })})

            const dbUser = await response.json();
            setAlertMessage(dbUser.message)
            if(dbUser.isRegistered){
              router.push('/');
            }
    }
    const handleOnChangeEmail = async (e) => {
        const email = e.target.value;
        setUserEmail(email);
    }
    const handleOnChangePassword = async (e) => {
        const password = e.target.value;
        setUserPassword(password);
    }
    const handleOnChangeFirstName = async (e) => {
        const firstname = e.target.value;
        setUserFirstName(firstname);
    }
    const handleOnChangeLastName = async (e) => {
        const lastname = e.target.value;
        setUserLastName(lastname);
    }
    return  (
        <div className={styles.container}>
          <Head>
            <title>Netflix SignUp</title>
          </Head>
    
          <header className={styles.header}>
            <div className={styles.headerWrapper}>
              <Link className={styles.logoLink} href="/">
                
                  <div className={styles.logoWrapper}>
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                      alt="Netflix logo"
                      width={128}
                      height={34}                    />
                  </div>
                
              </Link>
            </div>
          </header>
    
          <main className={styles.main}>
            <div className={styles.mainWrapper}>
              <h1 className={styles.signinHeader}>{"Sign Up"}</h1>
              
            <input
                type="text"
                placeholder="Firstname"
                className={styles.emailInput}
                onChange={handleOnChangeFirstName}
              />
            <input
                type="text"
                placeholder="Secondname"
                className={styles.emailInput}
                onChange={handleOnChangeLastName}
              />
            <input
                type="text"
                placeholder="Email address"
                className={styles.emailInput}
                onChange={handleOnChangeEmail}
              />
            <input
                type="password"
                placeholder="Password"
                className={styles.emailInput}
                onChange={handleOnChangePassword}
              />
    
              <Link href='/signin' className={styles.userMsg}>{"Already a User? Sign in here"}</Link>
              <button onClick={handleSignUpWithEmail} className={styles.SignUpBtn}>
                {isLoading?"Loading...":"Sign Up"}
              </button>
              <p className={styles.userMsg}>{alertMessage}</p>
            </div>
          </main>
        </div>
      );
}

export default signup;