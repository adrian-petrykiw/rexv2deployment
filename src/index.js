import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MoralisProvider } from "react-moralis";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl="https://fphni0ftr6ni.usemoralis.com:2053/server" appId="wEoEU8o67QiV7tyJoSVju7PSmddGpwMmsEIWeZ1O">
      <App />
    </MoralisProvider>
  </React.StrictMode>
);


