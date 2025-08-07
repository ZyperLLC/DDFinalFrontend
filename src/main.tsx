import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18n';
import TelegramAnalytics from '@telegram-apps/analytics'

import App from './App';
import Home from './Home';
import Stake from './Stake';
import Profile from './Profile';
import Friend from './Friend';
import AdminPage from './Admin'; 

import './index.css';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './Context/UserContextProvider';
import { TonConnectUiProvider } from './Context/TonConnectUiContext';

TelegramAnalytics.init({
    token: import.meta.env.VITE_ANALYTICS_TOKEN,
    appName: 'dolphins_dash',
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster />
    <BrowserRouter>
      <TonConnectUiProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home />} />
            <Route path="/stake" element={<Stake />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/friends" element={<Friend />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </UserProvider>
      </TonConnectUiProvider>
    </BrowserRouter>
  </React.StrictMode>
);
