import React, { useState, useEffect } from 'react';

function PlayerStats() { // Capitalize the first letter to conform to React component naming conventions
  const [searchTerm, setSearchTerm] = useState('');
  const [playerStats, setPlayerStats] = useState([]);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      if (searchTerm) {
        const url = `http://localhost:5001/PlayerStats?name=${encodeURIComponent(searchTerm)}`;
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
            setPlayerStats(data);
          } else {
            console.error('HTTP Error:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchPlayerStats(); // Corrected the function name here
  }, [searchTerm]);

  return (
    <>
      <div className='mt-[150px] flex justify-center py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-t-[2px] border-b-[2px] rounded-t-[5px] w-3/4 h-3/4 mx-auto'>
        <form>
          <input 
            type="text"
            name="search"
            placeholder="Search For Player" 
            className="px-3 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
      <div className={`py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-b-[2px] rounded-b-[5px] w-3/4 h-[300px] mx-auto overflow-x-auto`}>
      {playerStats.map((player, index) => (
  
          <div key={index} className='mb-4'>
            <h1>{player.PLAYER_NAME}</h1>
            <p>Games Played: {player.GP}</p>
            <p>Wins: {player.W} | Loss: {player.L}</p>
            
            <div className='mt-[20px] overflow-x-auto'>
              <div style={{ minWidth: 'max-content' }}>
              <ul className={`flex gap-[20px] justify-start items-center`}>
                <li>Type</li> 
                <li className="w-[80px] text-center">MIN</li>
                <li className="w-[80px] text-center">FGM</li>
                <li className="w-[80px] text-center">FGA</li>
                <li className="w-[80px] text-center">FG%</li>
                <li className="w-[80px] text-center">FG3M</li>
                <li className="w-[80px] text-center">FG3A</li>
                <li className="w-[80px] text-center">FG3%</li>
                <li className="w-[80px] text-center">FTM</li>
                <li className="w-[80px] text-center">FTA</li>
                <li className="w-[80px] text-center">FT%</li>
                <li className="w-[80px] text-center">OREB</li>
                <li className="w-[80px] text-center">DREB</li>
                <li className="w-[80px] text-center">REB</li>
                <li className="w-[80px] text-center">AST</li>
                <li className="w-[80px] text-center">TOV</li>
                <li className="w-[80px] text-center">STL</li>
                <li className="w-[80px] text-center">BLK</li>
                <li className="w-[80px] text-center">BLKA</li>
                <li className="w-[80px] text-center">PF</li>
                <li className="w-[80px] text-center">PFD</li>
                <li className="w-[80px] text-center">PTS</li>    
                <li className="w-[80px] text-center">+/-</li>                                                             
                                                                                
              </ul>
              <hr></hr> 
              <ul className='flex gap-[20px] justify-start items-center'>
                <li>Player</li> 
                <li className="w-[80px] text-center">{player.MIN}</li>
                <li className="w-[80px] text-center">{player.FGM}</li>
                <li className="w-[80px] text-center">{player.FGA}</li>
                <li className="w-[80px] text-center">{player.FG_PCT}</li>
                <li className="w-[80px] text-center">{player.FG3M}</li>
                <li className="w-[80px] text-center">{player.FG3A}</li>
                <li className="w-[80px] text-center">{player.FG3_PCT}</li>
                <li className="w-[80px] text-center">{player.FTM}</li>
                <li className="w-[80px] text-center">{player.FTA}</li>
                <li className="w-[80px] text-center">{player.FT_PCT}</li>
                <li className="w-[80px] text-center">{player.OREB}</li>
                <li className="w-[80px] text-center">{player.DREB}</li>
                <li className="w-[80px] text-center">{player.REB}</li>
                <li className="w-[80px] text-center">{player.AST}</li>
                <li className="w-[80px] text-center">{player.TOV}</li>
                <li className="w-[80px] text-center">{player.STL}</li>
                <li className="w-[80px] text-center">{player.BLK}</li>
                <li className="w-[80px] text-center">{player.BLKA}</li>
                <li className="w-[80px] text-center">{player.PF}</li>
                <li className="w-[80px] text-center">{player.PFD}</li>
                <li className="w-[80px] text-center">{player.PTS}</li>    
                <li className="w-[80px] text-center">{player.PLUS_MINUS}</li>                                                             
                                                                    
          
              </ul>
              <hr ></hr>
          
            </div>
            </div>
          </div>
            
          ))}


      
      </div>
    </>
  );
}

export default PlayerStats;
