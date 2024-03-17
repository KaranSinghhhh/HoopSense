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
                <li className="w-[123px] text-center">OFF RATING</li>
                <li className="w-[122px] text-center">DEF RATING</li>
                <li className="w-[124px] text-center">NET RATING</li>
                <li className="w-[80px] text-center">AST%</li>
                <li className="w-[88px] text-center">AST TO</li>
                <li className="w-[112px] text-center">AST RATIO</li>
                <li className="w-[80px] text-center">OREB%</li>
                <li className="w-[80px] text-center">DREB%</li>
                <li className="w-[100px] text-center">REB%</li>
                <li className="w-[107px] text-center">TM TOV%</li>
                <li className="w-[102px] text-center">EFG%</li>
                <li className="w-[80px] text-center">TS %</li>
                <li className="w-[120px] text-center">PACE</li>
                <li className="w-[80px] text-center">PIE</li>
                                                                          
                                                   
              
              </ul>
              <hr></hr> 
              <ul className='flex gap-[20px] justify-start items-center'>
                <li >Team</li> 
                <li className="w-[110px] text-center">{team.OFF_RATING}</li>
                <li className="w-[140px] text-center">{team.DEF_RATING}</li>
                <li className="w-[105px] text-center">{team.NET_RATING}</li>
                <li className="w-[98px] text-center">{team.AST_PCT}</li>
                <li className="w-[65px] text-center">{team.AST_TO}</li>
                <li className="w-[130px] text-center">{team.AST_RATIO}</li>
                <li className="w-[70px] text-center">{team.OREB_PCT}</li>
                <li className="w-[100px] text-center">{team.DREB_PCT}</li>
                <li className="w-[70px] text-center">{team.REB_PCT}</li>
                <li className="w-[135px] text-center">{team.TM_TOV_PCT}</li>
                <li className="w-[70px] text-center">{team.EFG_PCT}</li>
                <li className="w-[120px] text-center">{team.TS_PCT}</li>
                <li className="w-[80px] text-center">{team.PACE}</li>
                <li className="w-[120px] text-center">{team.PIE}</li>
              </ul>
              
              <hr></hr>
              
              <ul className='flex gap-[20px] justify-start items-center'>
                <li>Rank</li>
                <li className="w-[110px] text-center">{team.OFF_RATING_RANK}</li>
                <li className="w-[140px] text-center">{team.DEF_RATING_RANK}</li>
                <li className="w-[105px] text-center">{team.NET_RATING_RANK}</li>
                <li className="w-[98px] text-center">{team.AST_PCT_RANK}</li>
                <li className="w-[65px] text-center">{team.AST_TO_RANK}</li>
                <li className="w-[130px] text-center">{team.AST_RATIO_RANK}</li>
                <li className="w-[70px] text-center">{team.OREB_PCT_RANK}</li>
                <li className="w-[100px] text-center">{team.DREB_PCT_RANK}</li>
                <li className="w-[70px] text-center">{team.REB_PCT_RANK}</li>
                <li className="w-[135px] text-center">{team.TM_TOV_PCT_RANK}</li>
                <li className="w-[70px] text-center">{team.EFG_PCT_RANK}</li>
                <li className="w-[120px] text-center">{team.TS_PCT_RANK}</li>
                <li className="w-[80px] text-center">{team.PACE_RANK}</li>
                <li className="w-[120px] text-center">{team.PIE_RANK}</li>
                
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