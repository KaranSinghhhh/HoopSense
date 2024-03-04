import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function TeamStats() {
  const [searchTerm, setSearchTerm] = useState('');
  // Update the state to store the full data, not just names
  const [teamStats, setTeamStats] = useState([]); 

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
        // Correctly set the state with the fetched data
        setTeamStats(data); 
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
      
      <div className='py-3 px-6 bg-gray-50 border-b rounded w-3/4 h-[250px] mx-auto'>
        {teamStats.map((team, index) => (
            <>
              <div key={index}>
                {/* Correctly display TEAM_NAME and GP */}
                <h1>{team.TEAM_NAME}</h1>
                  <p>Games Played: {team.GP}</p>
                  <p>Wins {team.W} | Loss {team.L}</p>
              </div>
              

              <div className='flex mt-[20px]'>
                <p className="ml-24">FGM</p>  {/* Adjust the number in mr-4 to increase or decrease the margin */}
                <p className="ml-4">FGA</p>
                <p className="ml-4">FG%</p>
                <p className="ml-4">FG3 M</p>
                <p className="ml-4">FG3 A</p>
                <p className="ml-4">FG3 %</p>
                <p className="ml-4">FTA %</p>
                <p className="ml-4">FTM %</p>
                <p className="ml-4">FT %</p>
                <p className="ml-4">REB</p>
                <p className="ml-4">O REB</p>
                <p className="ml-4">D REB</p>
              </div>

              <div>
                <hr></hr>
                <p className='mt-1.5'></p>
                <p className='mt-1.5'></p>
                <p className='mt-1.5'>Team <span className="ml-12">{team.FGM}</span> | <span>{team.FGA}</span></p>
                <hr className='mt-1.5'></hr>
                <p className='mt-1.5'>Team Rank</p>
                <hr className='mt-1.5'></hr>
              </div>
            </>
        ))}



              
           

      </div>
     


              
           

      
    </>
  );
}

export default TeamStats;