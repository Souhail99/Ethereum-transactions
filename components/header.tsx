import { FC, useState, useRef } from 'react';
import Head from "next/head";
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import React, {useEffect} from 'react' ;
import Link from 'next/link';
import { PaletteMode, useTheme } from '@mui/material';
import Popover from "@mui/material/Popover";
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography'; 
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LearnMenuComponent from "./MenuCat";

interface Props {
    mode: PaletteMode;
    onChange?: () => void;
}

declare var window: any

interface Window {
    ethereum: any
}

const Web3=require("web3");



const HeaderComponent: FC<Props> = ({ mode, onChange }) => {
    const customTheme = useTheme ();
    const [openedPopover, setOpenedPopover] = useState(false);

    const popoverAnchor = useRef (null);
    const popoverEnter = () => {
        setOpenedPopover(true);
    }
    const popoverLeave = () => { 
        setOpenedPopover(false);
    }
    const [ currentBalance, setBalance ] = useState(0); 
    const [currentAccount, SetCurrentAccount] = useState({currentAccount: ' ',SetCurrentAccount:''});

    const checkWalletIsConnected = () => { 
        const { ethereum }= window;
        if(!ethereum){
            console.log("Metamask ?");
            return;
        }
        else{
            console. log("Yeah, you have a good wallet !");
        }
    }

    const connectWalletHandler = async() => { 
        const { ethereum }= window;
        if(!ethereum){
            console.log("Metamask ?");
            return;
        }
        try{
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            console.log("Yeah, you", accounts[0]);
            SetCurrentAccount(accounts[0]);

        }
        catch(error) {
            console.error("Une erreur est survenue", error);
        };
    }


    const connectWalletButton=() => {
        return (
            <Link href="."> 
                <button onClick={connectWalletHandler} className={styles.btn}>ConnectWallet</button>
            </Link>
        )
    }
    useEffect (() => {
        checkWalletIsConnected();
    },[])

    const Addresse =(string:any) => {

        if(string.length > 16){
            return (
                <div className={styles.className_44d352}>
                    User Address : {currentAccount.toString().slice(0, 5) + "...."+currentAccount.toString().slice(currentAccount.toString().length - 5, currentAccount.toString().length)} 
                </div>
            )
        }
        else{
            return (
                <div className={styles.className_44d352}>
                    User Address : Not Connected
                </div>
                
            )
        }
       
    }

return (
<>
    <Head> 
        <title>Ethereum Transaction</title>
        <meta name="description" content="App to check ethereum transaction" /> 
        <meta name="viewport" content="width-device-width, initial-scale=1" /> 
        <link rel="icon" href="/prop.JPG" />
    </Head>
    <Box sx={{ flexGrow: 1 }}>
        <AppBar 
            position='fixed'
            sx={{ zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1 }}
            style={{
              backgroundColor: customTheme.palette.background.paper,
              color: customTheme.palette.text.primary,
              backgroundImage:"linear-gradient(to bottom, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)"

            }}
        >
            <Toolbar>
                <Link href='/' passHref>
                  <IconButton 
                  size='large' 
                  edge='start' 
                  color='inherit' 
                  aria-label='menu'
                  sx={{ mr: 2 }}
                  >
                  <p className={styles.className_44d352}>Ethereum Transactions</p>

                  </IconButton>

                </Link>
            <Box sx={{flexGrow: 1 }} />
            <Box sx={{ display: 'flex', width: 'auto'}}>
                <Typography 
                  onMouseEnter={popoverEnter} 
                  onMouseLeave={popoverLeave} 
                  style={{ cursor: 'pointer' }} 
                  className={styles.className_44d352}
                  variant='h6'
                  component= {'span'} 
                  ref={popoverAnchor}
                  aria-owns={openedPopover ? 'mouse-over-popover': undefined} 
                  aria-haspopup='true'
                >
                  Categories
                  <KeyboardArrowDownIcon 
                  color='action'
                  sx={{
                    verticalAlign: 'middle', 
                    display: 'inline-flex', 
                    marginRight: '20px',
                  }}
                  />
                </Typography>
                <Popover
                  container={popoverAnchor.current} 
                  id='mouse-over-popover' 
                  open={openedPopover} 
                  anchorEl={popoverAnchor.current}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}} 
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }} 
                  PaperProps={{ onMouseEnter: popoverEnter, onMouseLeave: popoverLeave,}}
                >
                    <LearnMenuComponent />
                </Popover>
                <Link href='/history' passHref>
                    <Typography 
                    variant='h6'
                    style={{ cursor: 'pointer', marginRight: '20px'}}
                    className={styles.className_44d352}
                    >
                    History
                    </ Typography>
                </Link>
            </Box>
            </Toolbar>
        </AppBar>
    </Box> 

    <main className={styles.main2}> 
        <div className={styles.description}> 
           
            <div>
                <a
                href="/" 
                target="_blank" 
                rel="noopener noreferrer"
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;By{' '}

                <Image
                src="/prop.JPG"
                alt="For orin-trail" 
                className={styles.vercelLogo} 
                width={100} 
                height={90} 
                priority
                />
                </a>
            </div> 
            <div className={styles.className_44d352}>
                &nbsp;{connectWalletButton()}&nbsp;&nbsp;
            </div> 
            <br></br>
            {Addresse(currentAccount.toString())}
          

        </div> 
    </main>
</>
);
};

export default HeaderComponent;