import React, { useState, useEffect } from 'react';

function AdvancedStats({ searchTerm, teamColors, statColors }) {
  const [teamStats, setTeamStats] = useState([]);
  const [borderColorClass, setBorderColorClass] = useState('border-gray-200');
  const [statType, setStatType] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      if (searchTerm) {
        const url = `http://localhost:5001/TeamStats/advanced?name=${encodeURIComponent(searchTerm)}`;
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
                <li className="w-[80px] text-center">E OFF RATING</li>
                <li className="w-[80px] text-center">OFF RATING</li>
                <li className="w-[80px] text-center">E DEF RATING</li>
                <li className="w-[80px] text-center">DEF RATING</li>
                <li className="w-[80px] text-center">E NET RATING</li>
                <li className="w-[80px] text-center">NET RATING</li>
                <li className="w-[80px] text-center">AST%</li>
                <li className="w-[80px] text-center">AST TO</li>
                <li className="w-[80px] text-center">AST RATIO</li>
                <li className="w-[80px] text-center">OREB%</li>
                <li className="w-[80px] text-center">DREB%</li>
                <li className="w-[80px] text-center">REB%</li>
                <li className="w-[80px] text-center">TM TOV%</li>
                <li className="w-[80px] text-center">EFG %</li>
                <li className="w-[80px] text-center">TS %</li>
                <li className="w-[80px] text-center">E PACE</li>
                <li className="w-[80px] text-center">PACE</li>
                <li className="w-[80px] text-center">PACE PER 40</li>
                <li className="w-[80px] text-center">POSS</li>
                <li className="w-[80px] text-center">PIE</li>
                                                                          
                                                   
              
              </ul>
              <hr></hr> 
              <ul className='flex gap-[20px] justify-start items-center'>
                <li >Team</li> 
                <li className="w-[80px] text-center">{team.E_OFF_RATING}</li>
                <li className="w-[80px] text-center">{team.OFF_RATING}</li>
                <li className="w-[80px] text-center">{team.E_DEF_RATING}</li>
                <li className="w-[80px] text-center">DEF RATING</li>
                <li className="w-[80px] text-center">E NET RATING</li>
                <li className="w-[80px] text-center">NET RATING</li>
                <li className="w-[80px] text-center">AST%</li>
                <li className="w-[80px] text-center">AST TO</li>
                <li className="w-[80px] text-center">AST RATIO</li>
                <li className="w-[80px] text-center">OREB%</li>
                <li className="w-[80px] text-center">DREB%</li>
                <li className="w-[80px] text-center">REB%</li>
                <li className="w-[80px] text-center">TM TOV%</li>
                <li className="w-[80px] text-center">EFG %</li>
                <li className="w-[80px] text-center">TS %</li>
                <li className="w-[80px] text-center">E PACE</li>
                <li className="w-[80px] text-center">PACE</li>
                <li className="w-[80px] text-center">PACE PER 40</li>
                <li className="w-[80px] text-center">POSS</li>
                <li className="w-[80px] text-center">PIE</li>
              </ul>
              <hr></hr>
              <ul className='flex gap-[20px] justify-start items-center'>
                <li>Rank</li>
                
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

export default AdvancedStats;