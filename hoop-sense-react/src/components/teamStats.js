import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

function TeamStats() {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamStats, setTeamStats] = useState([]);
  // const [selectedTeam, setSelectedTeam] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://localhost:5001/TeamStats?name=${encodeURIComponent(searchTerm)}`;
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
        setTeamStats(data);
        console.log(data);
      } else {
        console.error('HTTP Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //useEffect(() => {
  //  if (teamStats.length > 0) {
  //    setSelectedTeam(teamStats[0].TEAM_NAME);
  //  }
  // }, [teamStats]);


  return (
    <>
      <div 
        className='mt-[150px] flex justify-center py-3 px-6 bg-gray-50 border-b rounded w-3/4 h-3/4 mx-auto'
        //style={{
        // border: `4px solid ${teamColors[selectedTeam] || 'gray'}`, // Dynamic border color based on selected team
        //}}
      >
        
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
        <button  type="submit" className="ml-2 flex text-gray-500 items-center justify-center p-2 bg-white rounded-2xl ring-2 ring-gray-300 border-none"> 
          <p>Traditonal</p>
        </button>
        <button type="submit" className="ml-2 flex text-gray-500 items-center justify-center p-2 bg-white rounded-2xl ring-2 ring-gray-300 border-none"> 
          Defense
        </button>
        <button  type="submit" className="ml-2 flex text-gray-500 items-center justify-center p-2 bg-white rounded-2xl ring-2 ring-gray-300 border-none"> 
          Advanced
        </button>
      </div>

      <div className='py-3 px-6 bg-gray-50 border-b rounded w-3/4 h-[270px] mx-auto overflow-x-auto'>
        {teamStats.map((team, index) => (
          <div key={index} className='mb-4' 
              
          >
          
            <h1>{team.TEAM_NAME}</h1>
            <p>Games Played: {team.GP}</p>
            <p>Wins: {team.W} | Loss: {team.L}</p>
            
            <div className='mt-[20px] overflow-x-auto'>
              <div style={{ minWidth: 'max-content' }}>
              <ul className='flex gap-[20px] justify-start items-center'>
                <li>Type</li> 
                <li>FGM</li>
                <li>FGA</li>
                <li>FG%</li>
                <li>FG3M</li>
                <li>FG3A</li>
                <li>FG3%</li>
                <li>FTM</li>
                <li>FTA</li>
                <li>FT%</li>
                <li>REB</li>
                <li>OREB</li>
                <li>DREB</li>
                <li>AST</li>
                <li>TOV</li>
                <li>STL</li>
                <li>BLK</li>
                <li>BLKA</li>
                <li>PF</li>
                <li>PFD</li>
                <li>PTS</li>
                <li>+/-</li>
                
              </ul>
              <hr></hr> 
              <ul className='flex justify-start items-center'>
                <li>Team</li> 
                <li className='ml-[12px]'>{team.FGM}</li>
                <li className='ml-[12px]'>{team.FGA}</li>
                <li className='ml-[13px]'>{team.FG_PCT}</li>
                <li className='ml-[25px]'>{team.FG3M}</li>
                <li className='ml-[34px]'>{team.FG3A}</li>
                <li className='ml-[21px]'>{team.FG3_PCT}</li>
                <li className='ml-[22px]'>{team.FTM}</li>
                <li className='ml-[13px]'>{team.FTA}</li>
                <li className='ml-[17px]'>{team.FT_PCT}</li>
                <li className='ml-[19px]'>{team.REB}</li>
                <li className='ml-[21px]'>{team.OREB}</li>
                <li className='ml-[30px]'>{team.DREB}</li>
                <li className='ml-[18px]'>{team.AST}</li>
                <li className='ml-[21px]'>{team.TOV}</li>
                <li className='ml-[21px]'>{team.STL}</li>
                <li className='ml-[20px]'>{team.BLK}</li>
                <li className='ml-[27px]'>{team.BLKA}</li>
                <li className='ml-[18px]'>{team.PF}</li>
                <li className='ml-[12px]'>{team.PFD}</li>
                <li className='ml-[15px]'>{team.PTS}</li>
                <li className='ml-[10px]'>{team.PLUS_MINUS}</li>
                
              </ul>
              <hr ></hr>
              <ul className='flex justify-start items-center'>
                <li>Rank</li>
                <li className='ml-[28px]'>{team.FGM_RANK}</li>
                <li className='ml-[41px]'>{team.FGA_RANK}</li>
                <li className='ml-[41px]'>{team.FG_PCT_RANK}</li>
                <li className='ml-[41px]'>{team.FG3M_RANK}</li>
                <li className='ml-[49px]'>{team.FG3A_RANK}</li>
                <li className='ml-[49px]'>{team.FG3_PCT_RANK}</li>
                <li className='ml-[46px]'>{team.FTM_RANK}</li>
                <li className='ml-[40px]'>{team.FTA_RANK}</li>
                <li className='ml-[40px]'>{team.FT_PCT_RANK}</li>
                <li className='ml-[43px]'>{team.REB_RANK}</li>
                <li className='ml-[47px]'>{team.OREB_RANK}</li>
                <li className='ml-[48px]'>{team.DREB_RANK}</li>
                <li className='ml-[37px]'>{team.AST_RANK}</li>
                <li className='ml-[37px]'>{team.TOV_RANK}</li>
                <li className='ml-[31px]'>{team.STL_RANK}</li>
                <li className='ml-[33px]'>{team.BLK_RANK}</li>
                <li className='ml-[35px]'>{team.BLKA_RANK}</li>
                <li className='ml-[30px]'>{team.PF_RANK}</li>
                <li className='ml-[32px]'>{team.PFD_RANK}</li>
                <li className='ml-[39px]'>{team.PTS_RANK}</li>
                <li className='ml-[35px]'>{team.PLUS_MINUS_RANK}</li>
                

                
              </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TeamStats;
