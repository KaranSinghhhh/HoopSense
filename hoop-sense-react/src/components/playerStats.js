import React from 'react'

function playerStats() {
  return(
    <>
    <div className='mt-[150px] flex justify-center py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-t-[2px] border-b-[2px] rounded-t-[5px] w-3/4 h-3/4 mx-auto'>
      <form>
        <input 
        type="text"
        name="search"
        placeholder="Search For Player" 
        className="px-3 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
         />
      </form>
    </div>
    <div className={`py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-b-[2px] rounded-b-[5px] w-3/4 h-[300px] mx-auto overflow-x-auto`}>
       
    </div>

   </>

    
  )}

export default playerStats