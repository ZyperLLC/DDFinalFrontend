// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Home from './Home';
import Stake from './Stake';
import Profile from './Profile';
import Friend from './Friend';
import './index.css';
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./Context/UserContextProvider";
import { TonConnectUiProvider } from './Context/TonConnectUiContext';

const manifestUrl = 'https://jade-imperial-hawk-534.mypinata.cloud/ipfs/bafybeiec6ililuj3yahb6wizc4gczrdbutwoyznj4ue5hkq7vr7fpkcpai/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster />
    <BrowserRouter>
      <TonConnectUiProvider manifestUrl={manifestUrl}>
        <UserProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home />} />
            <Route path="/stake" element={<Stake />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/friends" element={<Friend />} />
          </Routes>
        </UserProvider>
      </TonConnectUiProvider>
    </BrowserRouter>
  </React.StrictMode>
);
