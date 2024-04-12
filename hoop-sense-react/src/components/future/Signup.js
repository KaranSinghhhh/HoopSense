import React, { useState } from 'react';

function Signup() {
  // State hooks for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Simple password match check (for demonstration purposes)
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
        mode: 'cors',
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // Reset form or redirect user as needed
      } else {
        alert('Failed to create user');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div className='mt-[90px] flex justify-center items-center'>
      <form className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto border border-gray-500' onSubmit={handleFormSubmit}>
        <h1 className='text-center text-2xl font-bold mb-8'>Create New User</h1>
        <div className='flex justify-between gap-4 mb-4'>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} name="firstName" type='text' placeholder='First Name' className='w-1/2 p-2 rounded border border-gray-300' />
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} name="lastName" type='text' placeholder='Last Name' className='w-1/2 p-2 rounded border border-gray-300' />
        </div>
        <div className='mb-4'>
          <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type='email' placeholder='Email Address' className='w-full p-2 rounded border border-gray-300' />
        </div>
        <div className='mb-4'>
          <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type='password' placeholder='Password' className='w-full p-2 rounded border border-gray-300' />
        </div>
        <div className='mb-8'>
          <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name='confirmPassword' type='password' placeholder='Confirm Password' className='w-full p-2 rounded border border-gray-300' />
        </div>
        <button type='submit' className='w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700'>Create New User</button>
      </form>
    </div>
  );
}

export default Signup;