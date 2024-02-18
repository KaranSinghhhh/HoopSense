import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function TeamStats() {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamNames, setTeamNames] = useState([]); // State to store the fetched team names

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://localhost:5001/TeamStats?name=${encodeURIComponent(searchTerm)}`; // Construct the URL with query parameter
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
      });
      if (response.ok) {
        const data = await response.json();
        const names = data.map(item => item.TEAM_NAME); // Extract team names
        setTeamNames(names); // Set the team names state
        console.log(data);
      } else {
        console.error('HTTP Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
            aria-label="Search team" 
            className="px-3 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="ml-2 flex text-gray-500 items-center justify-center p-2 bg-white rounded-2xl ring-2 ring-gray-300 border-none">
            <FaSearch />
          </button>
        </form>
      </div>

      <div className='flex justify-center py-3 px-6 bg-gray-50 border-b rounded w-3/4 h-3/4 mx-auto'>
        <button  type="submit"  className="ml-2 flex text-gray-500 items-center justify-center p-2 bg-white rounded-2xl ring-2 ring-gray-300 border-none"> 
          <p>Traditonal</p>
        </button>
        <button type="submit"  className="ml-2 flex text-gray-500 items-center justify-center p-2 bg-white rounded-2xl ring-2 ring-gray-300 border-none"> 
          Defense
        </button>
        <button  type="submit"  className="ml-2 flex text-gray-500 items-center justify-center p-2 bg-white rounded-2xl ring-2 ring-gray-300 border-none"> 
          Advanced
        </button>
      </div>
      
      <div className='flex justify-center py-3 px-6 bg-gray-50 border-b rounded w-3/4 h-[250px] mx-auto'>
        {teamNames.map((name, index) => (
          <p key={index}>{name}</p> // Display each team name in its own paragraph
        ))}
      </div>
    </>
  );
}

export default TeamStats;
