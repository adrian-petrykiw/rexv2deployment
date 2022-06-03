import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MoralisProvider } from "react-moralis";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl="https://2eu3fmpq7qzo.usemoralis.com:2053/server" appId="U0Z4j61EkQ7dpRDWrXbSQvHQu3Pkqq4OsGsBC9lA">
      <App />
    </MoralisProvider>
  </React.StrictMode>
);


