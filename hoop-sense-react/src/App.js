import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Support from './components/Support';
// Import your Signup and Login components
import Signup from './components/Signup'; // Assuming you have a Signup component
import Login from './components/Login'; // Assuming you have a Login component
import Dashboard from './components/Dashboard'


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
            
            <Route path="/sign-up" element={<Signup />} />
   
            <Route path="/login" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
           
          </Routes>
          </div>
        </>
      </Router>
    </div>
  );
}

export default App;