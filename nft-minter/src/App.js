import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = 'MetaGoSports';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;


const TEST_GIFS = [
  'https://content.presentermedia.com/content/animsp/00021000/21484/lainee_basketball_dribble_300_wht.gif',
  'https://i.pinimg.com/originals/98/3f/3c/983f3c22bacf4a6ee532866222a5054f.gif',
  'https://i.pinimg.com/originals/7c/c0/03/7cc0037d5071b743fc95d6450da992ba.gif',
  'https://i.pinimg.com/originals/4d/de/5b/4dde5b6530c0969f979dd332fe737d50.gif'
]

const App = () => {


  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [characterList, setCharacterList] = useState([]);

  const checkWalletConnection = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log('wallet found')

          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana not found')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const sendCharacter = async () => {
    if (inputValue.length > 0) {
      console.log('Character link:', inputValue);
      setCharacterList([...characterList, inputValue]);
      setInputValue('');
    } else {
      console.log('Empty input. Try again.');
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkWalletConnection();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [])

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');

      // Call Solana program here.

      // Set state
      setCharacterList(TEST_GIFS);
    }
  }, [walletAddress]);

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendCharacter();
        }}
      >
        <input
          type="text"
          placeholder="Enter your character link!"
          value={inputValue}
          onChange={onInputChange}
        />
        <button type="submit" className="cta-button submit-gif-button">Mint</button>
      </form>
      <div className="gif-grid">
        {characterList.map((gif) => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">Play 2 Earn 🏃 MetaGo</p>
          <p className="sub-text">
            Mint your sport characters in the metaverse ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`follow us on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
