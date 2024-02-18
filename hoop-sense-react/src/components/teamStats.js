import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function TeamStats() {
  // State to store the search term
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action
    // Implement your search logic here using the searchTerm state
    console.log('Searching for:', searchTerm);
  };

  return (
    <>
      <div className='mt-[150px] flex justify-center py-3 px-6 bg-gray-50 border-b rounded w-3/4 h-3/4 mx-auto'>
        <form onSubmit={handleSubmit} className="flex">
          <input 
            type="text" 
            name="search" 
            placeholder="Search for Team" 
            autoComplete="off"
            aria-label="Search talk" 
            className="px-3 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update the searchTerm state on input change
          />
          <button 
            type="submit" 
            className="ml-2 flex text-gray-500 items-center justify-center p-2 bg-white rounded-2xl ring-2 ring-gray-300 border-none" // Added some styling for the button
          >
            <FaSearch />
          </button>
        </form>
        
          
        
        
      </div>
      
      <div className='flex justify-center py-3 px-6 bg-gray-50 border-b rounded w-3/4 h-3/4 mx-auto'>
        <button type="submit"  className="ml-2 flex text-gray-500 items-center justify-center p-2 bg-white rounded-2xl ring-2 ring-gray-300 border-none"> 
          <p>Traditonal</p>
        </button>
        <button type="submit"  className="ml-2 flex text-gray-500 items-center justify-center p-2 bg-white rounded-2xl ring-2 ring-gray-300 border-none"> 
          <p>Defense</p>
        </button>
        <button type="submit"  className="ml-2 flex text-gray-500 items-center justify-center p-2 bg-white rounded-2xl ring-2 ring-gray-300 border-none"> 
          <p>Advanced</p>
        </button>
      </div>

      <div className='flex justify-center py-3 px-6 bg-gray-50 border-b rounded w-3/4 h-[250px] mx-auto'>

      </div>

      
    </>
  );
}

export default TeamStats;
