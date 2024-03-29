import React from 'react'

function CompareStats() {
  
  
    return (
        <>
            <div className={`mt-[150px] flex justify-center py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-t-[2px] border-b-[2px] rounded-t-[5px] w-3/4 h-3/4 mx-auto `}>
                <button className='ml-2 flex text-black items-center justify-center p-2 rounded-2xl ring-2 ring-gray-300 border-none'>
                    Compare Teams
                </button>
                <button className='ml-2 flex text-black items-center justify-center p-2 rounded-2xl ring-2 ring-gray-300 border-none'>
                    Compare Players
                </button >
            </div>

            <div className={`py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-b-[2px] rounded-b-[5px] w-3/4 h-[350px] mx-auto overflow-x-auto`}>
                
            </div>
        </>

    
  )
}

export default CompareStats