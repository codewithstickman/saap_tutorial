import React, { useEffect } from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home.jsx';

import Notfound from './pages/Notfound.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MerchantPay from './pages/MerchantPay.jsx';
import Setup from './pages/Setup.jsx';
import { AuthInit } from './components/AuthInit.jsx';

function App() {

  useEffect(()=>{
    AuthInit();
  },[])

  
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/setup" element={<Setup />} />
          <Route exact path="/merchant/:username" element={<MerchantPay />} />
          <Route exact path="/dashboard" element={<Dashboard />} />


          {/* NOT FOUND PAGE */}
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
