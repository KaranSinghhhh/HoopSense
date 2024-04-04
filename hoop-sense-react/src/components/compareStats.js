import React, { useState, useEffect, useRef } from 'react';
import TraditionalStats from './TraditionalStats';
import DefensiveStats from './DefensiveStats';
import AdvancedStats from './AdvancedStats';


function CompareStats() {
    // State to track the selected option
    const [selectedOption, setSelectedOption] = useState('')
    const [selectedTeamOption, setSelectedTeamOptiom] = useState('')
    const [teamInput, setTeamInput] = useState(''); // 'traditional', 'defensive', 'advanced'
    const [searchTerm, setSearchTerm] = useState('');
    
    const [filteredTeams, setFilteredTeams] = useState([]);
    const inputRef = useRef(null); // Reference to the input field

    const teamColors = {
        // Your teamColors object
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

    // Function to handle button clicks
    const handleButtonClick = (option) => {
        setSelectedOption(option);
    };

    const handleTeamButtonclick = (teamOption) => {
        setSelectedTeamOptiom(teamOption);
    }

    const handleTeamInput = (view) => {
        setTeamInput(view);
    };
  
    const filterTeams = (input) => {
        if (!input) {
          setFilteredTeams([]);
        } else {
          const filtered = Object.keys(teamColors).filter(team =>
            team.toLowerCase().includes(input.toLowerCase())
          );
          setFilteredTeams(filtered);
        }
      };

      // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setFilteredTeams([]);
        }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [inputRef]);
  
  
    return (
        <>
            <div className={`mt-[150px] flex justify-center py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-t-[2px] border-b-[2px] rounded-t-[5px] w-3/4 h-3/4 mx-auto `}>
                <button 
                    className='ml-2 flex text-black items-center justify-center p-2 rounded-2xl ring-2 ring-gray-300 border-none'
                    onClick={() => handleButtonClick('Compare Teams')}
                >
                    Compare Teams
                </button>
                <button 
                    className='ml-2 flex text-black items-center justify-center p-2 rounded-2xl ring-2 ring-gray-300 border-none'
                    onClick={() => handleButtonClick('Compare Players')}
                >
                    Compare Players
                </button >
            </div>

            {selectedOption === 'Compare Teams' &&
                <div className={` flex justify-center py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-b-[2px] rounded-t-[5px] w-3/4 h-3/4 mx-auto `}>
                    <form onSubmit={(e) => e.preventDefault()} className="flex">
                        <input
                        type="text"
                        name="search"
                        placeholder="Search for Team"
                        autoComplete="off"
                        aria-label="Search team"
                        className="px-3 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                        value={searchTerm}
                        onChange={ (e) => {
                            setSearchTerm(e.target.value);
                            filterTeams(e.target.value);
                        }}
                        />

                        {filteredTeams.length > 0 && (
                                <div className="absolute bg-white border border-gray-200 mt-12 rounded-md w-[210px] z-10">
                                    {filteredTeams.map((team, index) => (
                                    <div
                                        key={index}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                        setSearchTerm(team);
                                        setFilteredTeams([]);
                                        }}
                                    >
                                        {team}
                                    </div>
                                    ))}
                                </div>
                                )
                                }
                    
                    
                    
                    
                    </form>
                </div>
            }   

            



            <div className={`py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-b-[2px]  w-3/4 h-[60px] mx-auto `}>
                {selectedOption === 'Compare Teams' &&
                    <div className='flex justify-center w-full'>
                        <button
                            className = 'ml-2 flex text-black items-center justify-center p-2 rounded-2xl ring-2 ring-gray-300 border-none'
                            onClick={() => handleTeamButtonclick("Traditional")}
                        >
                         Traditional   
                        </button>
                        <button
                            className = 'ml-2 flex text-black items-center justify-center p-2 rounded-2xl ring-2 ring-gray-300 border-none'
                            onClick={() => handleTeamButtonclick("Defensive")}
                        >
                         Defensive   
                        </button>
                        <button
                            className = 'ml-2 flex text-black items-center justify-center p-2 rounded-2xl ring-2 ring-gray-300 border-none'
                            onClick={() => handleTeamButtonclick("Advanced")}
                        >
                         Advanced   
                        </button>
                    </div>
                }
            </div>

            <div className={`py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-b-[2px] rounded-b-[5px] w-3/4 h-[350px] mx-auto overflow-x-auto`}>
                {selectedTeamOption === "Traditional" && <TraditionalStats searchTerm={searchTerm}/>
                }
                {selectedTeamOption === "Defensive" && <DefensiveStats searchTerm={searchTerm}/>
                }
                {selectedTeamOption === "Advanced" && <AdvancedStats searchTerm={searchTerm}/>
                }
            </div>
        </>

    
  )
}

export default CompareStats;

        