import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';
import { db } from './firebase.js';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import './App.css';
import styled from "styled-components";
import GetNFTData from './components/GetNFTData';




const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));

const InputGameName = styled.input`
  min-width: 16rem;
  font-size: 1rem;
  padding: 0.6rem 1.5rem 0.6rem 1.5rem;
  margin: 3rem 3rem 1rem 3rem;
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
  margin: 0.5rem 3rem 1.5rem 3rem;
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
  margin: 0.5rem 3rem 1.5rem 3rem;
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

const ButtonTwo = styled.button`
  font-size: 1rem;
  min-width: 19rem;
  padding: 0.6rem 1.5rem 0.6rem 1.5rem;
  margin: 0rem 0rem 2rem 0rem;
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

  const shipnftPic = GetNFTData(inputShipMintAddress);

  const invaderonenftPic = GetNFTData(inputInvaderOneMintAddress);


  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id,
        item: doc.data()
      })))
    })


  }, [inputGameName, inputShipMintAddress, inputInvaderOneMintAddress]);

  const addTodo = (e) => {
    e.preventDefault();
    addDoc(collection(db, 'todos'), {
      gameName: inputGameName,
      shipMintAddress: inputShipMintAddress,
      invaderMintAddress: inputInvaderOneMintAddress,
      shipNFTPic: shipnftPic,
      invaderOneNFTPic: invaderonenftPic,
      timestamp: serverTimestamp()
    })
    setInputGameName('')
    setInputShipMintAddress('')
    setInputInvaderOneMintAddress('')
  };

  
  return (
    <div className="App">
      <h1 style={{ margin: "6rem 0rem 1rem 0rem", color: 'white', fontFamily: 'Montserrat', fontWeight: 'bold' }}> REX</h1>
      <form style={{ border: '1px solid white', marginBottom: '5rem' }}>
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

        <div style={{ textAlign: "center", padding: "1rem" }}>
          <ButtonTwo onClick={addTodo}>Generate Game</ButtonTwo>
        </div>
      </form>

      <div style={{ margin: "0rem 43.5rem 0rem 0rem"}}>
        <h3 style={{margin: "0rem 0rem 0rem 0rem", color: 'white', fontFamily: 'Montserrat', fontWeight: 'bold' }}> GAMES</h3>
      </div>
      <div>
      </div>
      <ul>
        {todos.map(item => <Todo key={item.id} arr={item}/>)}
      </ul>
    </div>
  );
}
export default App;