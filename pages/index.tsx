import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div className={styles.center}>
      <div className={styles.grid}>
        <Link href="https://github.com/Souhail99/Ethereum-transactions" 
          className={styles.card} 
          target='_blank'
          rel="noopener noreferrer"
        >
          <h2 className={styles.className_44d352}>Informations <span>&gt;</span></h2>
          <p className={styles.className_44d352}>Check the GitHub's ReadMe for more information.</p>
        </Link>
       
         
        <a></a>
        
        <a></a>
        <Link href="/history" className={styles.card} rel="noopener noreferrer">
          <h2 className={styles.className_44d352}>Address's History  <span>&gt;</span></h2>
          <p className={styles.className_44d352}>Check address history by providing an address and a block number. Also, view the balance!</p>
        </Link>
      </div>
    </div>
    
    </>
  )
}
