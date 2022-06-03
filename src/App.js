import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';
import { db } from './firebase.js';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import './App.css';
import styled from "styled-components";
import GetNFTData from './components/GetNFTData';




const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));

const InputOne = styled.input`
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

const InputTwo = styled.input`
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

  const [inputOne, setInputOne] = useState('');

  const [inputTwo, setInputTwo] = useState('');

  const nftPic = GetNFTData(inputTwo);



  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id,
        item: doc.data()
      })))
    })


  }, [inputOne, inputTwo]);

  const addTodo = (e) => {
    e.preventDefault();
    addDoc(collection(db, 'todos'), {
      gameName: inputOne,
      mintAddress: inputTwo,
      nftPic: nftPic,
      timestamp: serverTimestamp()
    })
    setInputOne('')
    setInputTwo('')
  };

  
  return (
    <div className="App">
      <h1 style={{ margin: "6rem 0rem 1rem 0rem", color: 'white', fontFamily: 'Montserrat', fontWeight: 'bold' }}> REX</h1>
      <form style={{ border: '1px solid white', marginBottom: '5rem' }}>
        <div style={{ textAlign: "center" }}>
          <InputOne type="text" placeholder='Game Name' value={inputOne} onBlur={(e) => e.target.placeholder = 'Game Name'} onFocus={(e) => e.target.placeholder = ''} onChange={e => setInputOne(e.target.value)} >
          </InputOne>
        </div>

        <div style={{ textAlign: "center" }}>
          <InputTwo type="text" placeholder='Mint Address' value={inputTwo} onBlur={(e) => e.target.placeholder = 'Mint Address'} onInput={(e) => e.target.color = 'white'} onFocus={(e) => e.target.placeholder = ''} onChange={e => setInputTwo(e.target.value)} >
          </InputTwo>
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