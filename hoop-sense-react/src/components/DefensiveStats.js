import React, { useState, useEffect } from 'react';

function DefensiveStats({ searchTerm }) { // Define the functional component Defensive Stats that recieves searcTerm as a prop
  const [teamStats, setTeamStats] = useState([]); // Declare state variable 'teamStats'
  const [borderColorClass, setBorderColorClass] = useState('border-gray-200'); // Declare state variable bordorColorClass 


  useEffect(() => {
    const fetchDefensiveStats = async () => { // Declare an async function
      if (searchTerm) { // Check if searchTerm is truthly 
        const url = `http://localhost:5001/TeamStats/defensive?name=${encodeURIComponent(searchTerm)}`; //construct url for API request
        try {
          const response = await fetch(url, { // Make an async HTTP GET request to the specified url
            method: 'GET', 
            headers: {
              'Accept': 'application/json', // The client accepts JSON
            },
            mode: 'cors', // Enable CORS mode
          });
          if (response.ok) { // Check if response status is OK (in the range 200-299)
            const data = await response.json(); // Parse the response body as JSON
            setTeamStats(data); // Use the fetched 'data' and pass it into the 'setTeamStats' function provided by the useState hook
          } else {
            console.error('HTTP Error:', response.statusText); // The response was not successful, and log the HTTP error to the console
          }
        } catch (error) {
          console.error('Error:', error); // Catch any errors that occured during the fetch operation and logs to the console
        }
      }
    };

    fetchDefensiveStats(); // Call the async function
  }, [searchTerm]); // Dependency array to re-run the effect when searchTerm changes

  return (
    <div className={`${borderColorClass}`}>
        {teamStats.length > 0 ? (
            teamStats.map((team, index) => ( 
                <div key={index} className='mb-4'>
                    <h1>{team.TEAM_NAME}</h1>
                    <p>Games Played: {team.GP}</p>
                    <p>Wins: {team.W} | Losses: {team.L} </p>
                    <div className='border-l-[2px] border-r-[2px] border-b-[2px] rounded-b-[5px] mt-[20px] overflow-x-auto' style={{ minWidth: 'max-content' }}>
                    <ul className={`flex gap-[20px] justify-start items-center `}>
                        <li>Type</li>
                        <li className="w-[150px] text-center">DEF RATING</li>
                        <li className="w-[80px] text-center">DREB</li>
                        <li className="w-[80px] text-center">DREB%</li>
                        <li className="w-[80px] text-center">STL</li>
                        <li className="w-[80px] text-center">BLK</li>
                        <li className="w-[170px] text-center">OPP PTS OFF TOV</li>
                        <li className="w-[230px] text-center">OPP PTS 2ND CHANCE</li>
                        <li className="w-[140px] text-center">OPP PTS FB</li>
                        <li className="w-[150px] text-center">OPP PTS PAINT</li>
                              
                    </ul>
                    </div>
                </div>))
                ) : (<p>No Data Found</p>)}
    </div>
  );
      
    
  
}

export default DefensiveStats;