import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

function TeamStats() {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamStats, setTeamStats] = useState([]);
  const [borderColorClass, setBorderColorClass] = useState('border-gray-200'); // Default border color
  const [statType, setStatType] = useState('')
  const [showTraditionalStats, setShowTraditionalStats] = useState(false); 
  const [activeButton, setActiveButton] = useState(''); // Step 1

  const teamColors = {
    "Atlanta Hawks": "border-red-500",
    "Boston Celtics": "border-green-600",
    "Brooklyn Nets": "border-gray-700",
    "Charlotte Hornets": "border-purple-600",
    "Chicago Bulls": "border-red-600",
    "Cleveland Cavaliers": "border-red-700",
    "Dallas Mavericks": "border-blue-700",
    "Denver Nuggets": "border-yellow-400",
    "Detroit Pistons": "border-blue-600",
    "Golden State Warriors": "border-blue-400",
    "Houston Rockets": "border-red-500",
    "Indiana Pacers": "border-yellow-500",
    "Los Angeles Clippers": "border-red-700",
    "Los Angeles Lakers": "border-purple-500",
    "Memphis Grizzlies": "border-blue-800",
    "Miami Heat": "border-red-600",
    "Milwaukee Bucks": "border-green-500",
    "Minnesota Timberwolves": "border-blue-500",
    "New Orleans Pelicans": "border-red-600",
    "New York Knicks": "border-blue-600",
    "Oklahoma City Thunder": "border-blue-500",
    "Orlando Magic": "border-blue-700",
    "Philadelphia 76ers": "border-blue-500",
    "Phoenix Suns": "border-orange-500",
    "Portland Trail Blazers": "border-black",
    "Sacramento Kings": "border-purple-700",
    "San Antonio Spurs": "border-gray-600",
    "Toronto Raptors": "border-purple-700",
    "Utah Jazz": "border-yellow-600",
    "Washington Wizards": "border-blue-600",
  };
  
  const statColors = {
    "Atlanta Hawks": "bg-red-500",
    "Boston Celtics": "bg-green-600",
    "Brooklyn Nets": "bg-gray-700",
    "Charlotte Hornets": "bg-purple-600",
    "Chicago Bulls": "bg-red-600",
    "Cleveland Cavaliers": "bg-red-700",
    "Dallas Mavericks": "bg-blue-700",
    "Denver Nuggets": "bg-yellow-400",
    "Detroit Pistons": "bg-blue-600",
    "Golden State Warriors": "bg-blue-400",
    "Houston Rockets": "bg-red-500",
    "Indiana Pacers": "bg-yellow-500",
    "Los Angeles Clippers": "bg-red-700",
    "Los Angeles Lakers": "bg-purple-500",
    "Memphis Grizzlies": "bg-blue-800",
    "Miami Heat": "bg-red-600",
    "Milwaukee Bucks": "bg-green-500",
    "Minnesota Timberwolves": "bg-blue-500",
    "New Orleans Pelicans": "bg-red-600",
    "New York Knicks": "bg-blue-600",
    "Oklahoma City Thunder": "bg-blue-500",
    "Orlando Magic": "bg-blue-700",
    "Philadelphia 76ers": "bg-blue-500",
    "Phoenix Suns": "bg-orange-500",
    "Portland Trail Blazers": "bg-black",
    "Sacramento Kings": "bg-purple-700",
    "San Antonio Spurs": "bg-gray-600",
    "Toronto Raptors": "bg-purple-700",
    "Utah Jazz": "bg-yellow-600",
    "Washington Wizards": "bg-blue-600",
  };
  


  const handleSubmitTraditional = async (event) => {
    event.preventDefault();
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
        console.log(data);

        // Update border color based on the first team's name
        if (data.length > 0) {
          const teamColorClass = teamColors[data[0].TEAM_NAME] || 'border-gray-200'; // Default to gray if team is not found
          setBorderColorClass(teamColorClass);
          
          const statColorClass = statColors[data[0].TEAM_NAME] || 'border-gray-200';
          setStatType(statColorClass);
        }
      } else {
        console.error('HTTP Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleTraditionalClick = () => { // Step 2: Update visibility on button click
    setShowTraditionalStats(true);
    setActiveButton('Traditional');
  };

  const getButtonClass = (buttonName) => {
    return `ml-2 flex text-gray-500 items-center justify-center p-2 bg-white rounded-2xl ring-2 ring-gray-300 border-none ${activeButton === buttonName ?  `${statType} text-white` : '' }`;
  };


  return (
    <>
      <div 
       className={`mt-[150px] flex justify-center py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-t-[2px] border-b-[2px] rounded-t-[5px]  ${borderColorClass} w-3/4 h-3/4 mx-auto`}
      >
        
        <form onSubmit={handleSubmitTraditional} className="flex">
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

      <div className={`flex justify-center py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-b-[2px] ${borderColorClass}  w-3/4 h-3/4 mx-auto`}>
        <button onClick={handleTraditionalClick} className={getButtonClass('Traditional')} > 
          <p>Traditonal</p>
        </button>
        <button type="submit" className="ml-2 flex text-black items-center justify-center p-2 bg-white rounded-2xl ring-2 ring-gray-300 border-none"> 
          Defense
        </button>
        <button  type="submit" className="ml-2 flex text-black items-center justify-center p-2 bg-white rounded-2xl ring-2 ring-gray-300 border-none"> 
          Advanced
        </button>
      </div>

    
      <div className={`py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-b-[2px] rounded-b-[5px] ${borderColorClass} w-3/4 h-[270px] mx-auto overflow-x-auto`}>
        {teamStats.map((team, index) => (
          showTraditionalStats &&
          <div key={index} className='mb-4'>
          
            <h1>{team.TEAM_NAME}</h1>
            <p>Games Played: {team.GP}</p>
            <p>Wins: {team.W} | Loss: {team.L}</p>
            
            <div className='mt-[20px] overflow-x-auto'>
              <div style={{ minWidth: 'max-content' }}>
              <ul className={`flex gap-[20px] justify-start items-center  ${statType}`}>
              <li>Type</li> 
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
                <li >Team</li> 
                <li className="w-[73px] text-center">{team.FGM}</li>
                <li className="w-[82px] text-center">{team.FGA}</li>
                <li className="w-[76px] text-center">{team.FG_PCT}</li>
                <li className="w-[83px] text-center">{team.FG3M}</li>
                <li className="w-[83px] text-center">{team.FG3A}</li>
                <li className="w-[75px] text-center">{team.FG3_PCT}</li>
                <li className="w-[87px] text-center">{team.FTM}</li>
                <li className="w-[75px] text-center" >{team.FTA}</li>
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
              <hr ></hr>
              <ul className='flex gap-[20px] justify-start items-center'>
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
          </div>
            
          ))}
      </div>
            
    </>
  );
        
}

export default TeamStats;
