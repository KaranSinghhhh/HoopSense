import React, {useState} from 'react'
import TraditionalStats from './TraditionalStats';

function CompareStats() {
    // State to track the selected option
    const [selectedOption, setSelectedOption] = useState('')
    const [selectedTeamOption, setSelectedTeamOptiom] = useState('')
    const [teamInput, setTeamInput] = useState(''); // 'traditional', 'defensive', 'advanced'

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
                        value={''}
                        onChange={ (e) => {
                            
                        }}
                        />
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

            <div className={`py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-b-[2px] rounded-b-[5px] w-3/4 h-[350px] mx-auto`}>
                {selectedTeamOption === "Traditional" && <TraditionalStats/>
                    
                }
            </div>
        </>

    
  )
}

export default CompareStats;