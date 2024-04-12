import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        mode: 'cors',
      });

      if (response.ok) {
        const data = await response.json();
        navigate('/dashboard')
      } else {
        const errorData = await response.json();
        alert(errorData.error); // Display error message from backend
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error logging in');
    }
  };

  return (
    <div className='mt-[90px] flex justify-center items-center'>
      <form onSubmit={handleLoginSubmit} className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto border border-gray-500'>
        <h1 className='text-center text-2xl font-bold mb-8'>Existing User Login</h1>
        <div className='mb-4'>
          <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type='email' placeholder='Email Address' className='w-full p-2 rounded border border-gray-300' />
        </div>
        <div className='mb-4'>
          <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type='password' placeholder='Password' className='w-full p-2 rounded border border-gray-300' />
        </div>
        <button type='submit' className='w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700'>Login</button>
      </form>
    </div>
  );
}

export default Login;