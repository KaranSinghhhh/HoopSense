import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Support from './components/Support';

import PlayerStats from './components/playerStats'; 
import TeamStats from './components/teamStats'; 
import CompareStats from './components/compareStats'


function App() {
  return (
    <div >
      <Router>
        <>
          <Navbar />
          <div className='pt-[10px]'>
          <Routes>
            
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Support />
              </>
            } />
            
            <Route path="/playerStats" element={<PlayerStats />} />
            <Route path="/teamStats" element={<TeamStats />} />
            <Route path="/compareStats" element={<CompareStats/>} />
           
          </Routes>
          </div>
        </>
      </Router>
    </div>
  );
}

export default App;