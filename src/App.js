import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';
import HowTo from './components/HowTo';
import { db } from './firebase.js';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import './App.css';
import styled from "styled-components";
import GetNFTData from './components/GetNFTData';




const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));

const HowToText = styled.a`
  font-size: 12pt;
  font-weight: lighter;
  padding: 1.5rem 0rem 0rem 0rem;
  margin: 0rem 0rem 5rem 0rem;
  background: none;
  color: white;
  :hover {
    font-weight: bolder;
    cursor: pointer;
  }
  font-family: Montserrat;
`;

const InputGameName = styled.input`
  min-width: 16rem;
  font-size: 1rem;
  padding: 0.6rem 1.5rem 0.6rem 1.5rem;
  margin: 2.5rem 1rem 2rem 1rem;
  background: none;
  border: 1px solid white;
  border-radius: none;
  color: white;
  ::placeholder {
    color: white;
  }
  font-family: Montserrat;
`;


const InputShipMintAddress = styled.input`
  min-width: 16rem;
  font-size: 1rem;
  padding: 0.6rem 1.5rem 0.6rem 1.5rem;
  margin: 0.5rem 2rem 2rem 2rem;
  background: none;
  border: 1px solid white;
  border-radius: none;
  font-family: Montserrat;
  color: white;
  ::placeholder {
    color: white;
  }
  /* &:focus {
    outline: none;
  }   */
`;

const InputInvaderOneMintAddress = styled.input`
  min-width: 16rem;
  font-size: 1rem;
  padding: 0.6rem 1.5rem 0.6rem 1.5rem;
  margin: 0.5rem 2.5rem 0.5rem 2.5rem;
  background: none;
  border: 1px solid white;
  border-radius: none;
  font-family: Montserrat;
  color: white;
  ::placeholder {
    color: white;
  }
  /* &:focus {
    outline: none;
  }   */
`;

const InputInvaderTwoMintAddress = styled.input`
  min-width: 16rem;
  font-size: 1rem;
  padding: 0.6rem 1.5rem 0.6rem 1.5rem;
  margin: 0.5rem 2.5rem 0.5rem 2.5rem;
  background: none;
  border: 1px solid white;
  border-radius: none;
  font-family: Montserrat;
  color: white;
  ::placeholder {
    color: white;
  }
  /* &:focus {
    outline: none;
  }   */
`;

const InputInvaderThreeMintAddress = styled.input`
  min-width: 16rem;
  font-size: 1rem;
  padding: 0.6rem 1.5rem 0.6rem 1.5rem;
  margin: 0.5rem 2rem 1rem 2rem;
  background: none;
  border: 1px solid white;
  border-radius: none;
  font-family: Montserrat;
  color: white;
  ::placeholder {
    color: white;
  }
  /* &:focus {
    outline: none;
  }   */
`;

// const InputInvaderUfoMintAddress = styled.input`
//   min-width: 16rem;
//   font-size: 1rem;
//   padding: 0.6rem 1.5rem 0.6rem 1.5rem;
//   margin: 0.5rem 2rem 2rem 2rem;
//   background: none;
//   border: 1px solid white;
//   border-radius: none;
//   font-family: Montserrat;
//   color: white;
//   ::placeholder {
//     color: white;
//   }
//   /* &:focus {
//     outline: none;
//   }   */
// `;

const ButtonTwo = styled.button`
  font-size: 1rem;
  min-width: 19rem;
  padding: 0.6rem 1.5rem 0.6rem 1.5rem;
  margin: 0.5rem 0rem 1.5rem 0rem;
  color: black;
  font-weight: bold;
  background: white;
  border: 1px solid white;
  border-radius: none;
  font-family: Montserrat;
`;

function App() {
  const [todos, setTodos] = useState([]);

  const [inputGameName, setInputGameName] = useState('');

  const [inputShipMintAddress, setInputShipMintAddress] = useState('');

  const [inputInvaderOneMintAddress, setInputInvaderOneMintAddress] = useState('');

  const [inputInvaderTwoMintAddress, setInputInvaderTwoMintAddress] = useState('');

  const [inputInvaderThreeMintAddress, setInputInvaderThreeMintAddress] = useState('');

  // const [inputInvaderUfoMintAddress, setInputInvaderUfoMintAddress] = useState('');



  const shipnftPic = GetNFTData(inputShipMintAddress);

  const invaderonenftPic = GetNFTData(inputInvaderOneMintAddress);

  const invadertwonftPic = GetNFTData(inputInvaderTwoMintAddress);

  const invaderthreenftPic = GetNFTData(inputInvaderThreeMintAddress);

  // const invaderufonftPic = GetNFTData(inputInvaderUfoMintAddress);



  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id,
        item: doc.data()
      })))
    })


  }, [inputGameName, inputShipMintAddress, inputInvaderOneMintAddress, inputInvaderTwoMintAddress, inputInvaderThreeMintAddress]);

  const addTodo = (e) => {
    e.preventDefault();
    addDoc(collection(db, 'todos'), {
      gameName: inputGameName,
      shipMintAddress: inputShipMintAddress,
      invaderOneMintAddress: inputInvaderOneMintAddress,
      invaderTwoMintAddress: inputInvaderTwoMintAddress,
      invaderThreeMintAddress: inputInvaderThreeMintAddress,
      // invaderUfoMintAddress: inputInvaderUfoMintAddress,
      shipNFTPic: shipnftPic,
      invaderOneNFTPic: invaderonenftPic,
      invaderTwoNFTPic: invadertwonftPic,
      invaderThreeNFTPic: invaderthreenftPic,
      // invaderUfoNFTPic: invaderufonftPic,
      timestamp: serverTimestamp()
    })
    setInputGameName('')
    setInputShipMintAddress('')
    setInputInvaderOneMintAddress('')
    setInputInvaderTwoMintAddress('')
    setInputInvaderThreeMintAddress('')
    // setInputInvaderUfoMintAddress('')
  };

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   


  return (
    <div className="App">
      <h1 style={{ margin: "3rem 0rem 1rem 0rem", color: 'white', fontSize: '36pt', fontFamily: 'Montserrat', fontWeight: 'bolder' }}> REX</h1>
      <form style={{ border: '1px solid white' }}>
        <div style={{ textAlign: "center" }}>
          <InputGameName type="text" placeholder='Game Name' value={inputGameName} onBlur={(e) => e.target.placeholder = 'Game Name'} onFocus={(e) => e.target.placeholder = ''} onChange={e => setInputGameName(e.target.value)} >
          </InputGameName>
        </div>

        <div style={{ textAlign: "center" }}>
          <InputShipMintAddress type="text" placeholder='Ship Mint Address' value={inputShipMintAddress} onBlur={(e) => e.target.placeholder = 'Ship Mint Address'} onInput={(e) => e.target.color = 'white'} onFocus={(e) => e.target.placeholder = ''} onChange={e => setInputShipMintAddress(e.target.value)} >
          </InputShipMintAddress>
        </div>

        <div style={{ textAlign: "center" }}>
          <InputInvaderOneMintAddress type="text" placeholder='Invader #1 Mint Address' value={inputInvaderOneMintAddress} onBlur={(e) => e.target.placeholder = 'Invader #1 Mint Address'} onInput={(e) => e.target.color = 'white'} onFocus={(e) => e.target.placeholder = ''} onChange={e => setInputInvaderOneMintAddress(e.target.value)} >
          </InputInvaderOneMintAddress>
        </div>

        <div style={{ textAlign: "center" }}>
          <InputInvaderTwoMintAddress type="text" placeholder='Invader #2 Mint Address' value={inputInvaderTwoMintAddress} onBlur={(e) => e.target.placeholder = 'Invader #2 Mint Address'} onInput={(e) => e.target.color = 'white'} onFocus={(e) => e.target.placeholder = ''} onChange={e => setInputInvaderTwoMintAddress(e.target.value)} >
          </InputInvaderTwoMintAddress>
        </div>

        <div style={{ textAlign: "center" }}>
          <InputInvaderThreeMintAddress type="text" placeholder='Invader #3 Mint Address' value={inputInvaderThreeMintAddress} onBlur={(e) => e.target.placeholder = 'Invader #3 Mint Address'} onInput={(e) => e.target.color = 'white'} onFocus={(e) => e.target.placeholder = ''} onChange={e => setInputInvaderThreeMintAddress(e.target.value)} >
          </InputInvaderThreeMintAddress>
        </div>

        {/* <div style={{ textAlign: "center" }}>
          <InputInvaderUfoMintAddress type="text" placeholder='UFO Mint Address' value={inputInvaderUfoMintAddress} onBlur={(e) => e.target.placeholder = 'UFO Mint Address'} onInput={(e) => e.target.color = 'white'} onFocus={(e) => e.target.placeholder = ''} onChange={e => setInputInvaderUfoMintAddress(e.target.value)} >
          </InputInvaderUfoMintAddress>
        </div> */}

        <div style={{ textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem" }}>
          <ButtonTwo onClick={addTodo}>Generate Game</ButtonTwo>
        </div>
      </form>
      <HowToText href='#howto'> HOW TO INJECT?</HowToText>

      {/* <div style={{width: '100%', background: 'white', border: '1px solid white'}}>
      </div> */}

      <div style={{ margin: "3rem 0rem 2rem 0rem" }}>
        <h2 style={{ margin: "0rem 0rem 0rem 0rem", color: 'white', fontSize: '24pt', fontFamily: 'Montserrat', fontWeight: 'bolder' }}> GAMES</h2>
      </div>

      <div>
        {todos.map(item => <Todo key={item.id} arr={item} />)}
      </div>


      <div >
        <h1 style={{ margin: "5rem 0rem 2rem 0rem", color: 'white', fontSize: '24pt', fontFamily: 'Montserrat', fontWeight: 'bolder' }}> HOW DO YOU INJECT AN NFT?</h1>
      </div>

      <HowTo />

      

    </div>
  );
}
export default App;