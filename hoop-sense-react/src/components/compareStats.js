import React, {useState} from 'react'

function CompareStats() {
    // State to track the selected option
    const [selectedOption, setSelectedOption] = useState('')
    const [selectedTeamOption, setSelectedTeamOptiom] = useState('')

    // Function to handle button clicks
    const handleButtonClick = (option) => {
        setSelectedOption(option);
    };

    const handleTeamButtonclick = (teamOption) => {
        setSelectedTeamOptiom(teamOption);
    }
  
  
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

            <div className={`py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-b-[2px] rounded-b-[5px] w-3/4 h-[350px] mx-auto overflow-x-auto`}>
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

            <div className={``}>
                {selectedTeamOption === "Traditional" &&
                    <div>
                        You selected Traditional
                    </div>
                }
            </div>
        </>

    
  )
}

export default CompareStats;