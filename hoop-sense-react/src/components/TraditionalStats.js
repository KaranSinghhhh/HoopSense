import React, { useState, useEffect } from 'react';

function TraditionalStats({ searchTerm, teamColors, statColors }) {
  const [teamStats, setTeamStats] = useState([]);
  const [borderColorClass, setBorderColorClass] = useState('border-gray-200');
  const [statType, setStatType] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      if (searchTerm) {
        const url = `http://localhost:5001/TeamStats/traditional?name=${encodeURIComponent(searchTerm)}`;
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

            if (data.length > 0) {
              const teamColorClass = teamColors[data[0].TEAM_NAME] || 'border-gray-200';
              setBorderColorClass(teamColorClass);

              const statColorClass = statColors[data[0].TEAM_NAME] || 'bg-gray-200';
              setStatType(statColorClass);
            }
          } else {
            console.error('HTTP Error:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchStats();
  }, [searchTerm, teamColors, statColors]);

  return (
    <div className={`${borderColorClass}`}>
      {teamStats.length > 0 ? (
        teamStats.map((team, index) => (
          <div key={index} className='mb-4'>
            <h1>{team.TEAM_NAME}</h1>
            <p>Games Played: {team.GP}</p>
            <p>Wins: {team.W} | Loss: {team.L}</p>
            <div className='border-l-[2px] border-r-[2px] border-t-[2px] border-b-[2px] rounded-b-[5px] mt-[20px] overflow-x-auto' style={{ minWidth: 'max-content' }}>
              <ul className={`flex gap-[20px] justify-start items-center ${statType}`}>
                <li>Type</li>
                {/* Add the rest of the stats here as you see fit */}
                <li className="w-[80px] text-center" >FGM</li>
                <li className="w-[80px] text-center">FGA</li>
                <li className="w-[80px] text-center">FG%</li>
                <li className="w-[80px] text-center">FG3M</li>
                <li className="w-[80px] text-center">FG3A</li>
                <li className="w-[80px] text-center">FG3%</li>
                <li className="w-[80px] text-center" >FTM</li>
                <li className="w-[80px] text-center">FTA</li>
                <li className="w-[80px] text-center">FT%</li>
                <li className="w-[80px] text-center">REB</li>
                <li className="w-[80px] text-center">OREB</li>
                <li className="w-[80px] text-center">DREB</li>
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
                {/* Add the team specific stats here */}
                <li >Team</li> 
                <li className="w-[73px] text-center">{team.FGM}</li>
                <li className="w-[82px] text-center">{team.FGA}</li>
                <li className="w-[76px] text-center">{team.FG_PCT}</li>
                <li className="w-[83px] text-center">{team.FG3M}</li>
                <li className="w-[83px] text-center">{team.FG3A}</li>
                <li className="w-[75px] text-center">{team.FG3_PCT}</li>
                <li className="w-[87px] text-center">{team.FTM}</li>
                <li className="w-[75px] text-center">{team.FTA}</li>
                <li className="w-[75px] text-center">{team.FT_PCT}</li>
                <li className="w-[92px] text-center">{team.REB}</li>
                <li className="w-[75px] text-center">{team.OREB}</li>
                <li className="w-[75px] text-center">{team.DREB}</li>
                <li className="w-[87px] text-center">{team.AST}</li>
                <li className="w-[75px] text-center">{team.TOV}</li>
                <li className="w-[85px] text-center">{team.STL}</li>
                <li className="w-[75px] text-center">{team.BLK}</li>
                <li className="w-[87px] text-center">{team.BLKA}</li>
                <li className="w-[75px] text-center">{team.PF}</li>
                <li className="w-[80px] text-center">{team.PFD}</li>
                <li className="w-[81px] text-center">{team.PTS}</li>
                <li className="w-[75px] text-center">{team.PLUS_MINUS}</li>
              </ul>
              <hr></hr>
              <ul className='flex gap-[20px] justify-start items-center'>
                {/* Add the rank specific stats here if needed */}
                <li>Rank</li>
                <li className="w-[75px] text-center">{team.FGM_RANK}</li>
                <li className="w-[75px] text-center">{team.FGA_RANK}</li>
                <li className="w-[89px] text-center">{team.FG_PCT_RANK}</li>
                <li className="w-[72px] text-center">{team.FG3M_RANK}</li>
                <li className="w-[88px] text-center">{team.FG3A_RANK}</li>
                <li className="w-[75px] text-center">{team.FG3_PCT_RANK}</li>
                <li className="w-[85px] text-center">{team.FTM_RANK}</li>
                <li className="w-[79px] text-center">{team.FTA_RANK}</li>
                <li className="w-[75px] text-center">{team.FT_PCT_RANK}</li>
                <li className="w-[85px] text-center">{team.REB_RANK}</li>
                <li className="w-[79px] text-center">{team.OREB_RANK}</li>
                <li className="w-[75px] text-center">{team.DREB_RANK}</li>
                <li className="w-[85px] text-center">{team.AST_RANK}</li>
                <li className="w-[75px] text-center">{team.TOV_RANK}</li>
                <li className="w-[87px] text-center">{team.STL_RANK}</li>
                <li className="w-[75px] text-center">{team.BLK_RANK}</li>
                <li className="w-[87px] text-center">{team.BLKA_RANK}</li>
                <li className="w-[75px] text-center">{team.PF_RANK}</li>
                <li className="w-[79px] text-center">{team.PFD_RANK}</li>
                <li className="w-[85px] text-center">{team.PTS_RANK}</li>
                <li className="w-[75px] text-center">{team.PLUS_MINUS_RANK}</li>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No data found. Please search for a team.</p>
      )}
    </div>
  );
}

export default TraditionalStats;