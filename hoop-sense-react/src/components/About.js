import React from 'react'

function About() {
  return (
    <div id="about-section" className='w-full mt-32 mb-32'>
        <div className='max-w-[1240px] mx-auto'>
            <div className='text-center'>
                <h2 className='text-5xl font-bold'>Elevating Basketball Analysis Worldwide</h2>
                <p className='text-3xl py-6 text-gray-500'>Discover in-depth stats, player comparisons, and team insights like never before.</p>
            </div>

            <div className='grid md:grid-cols-3 gap-1 px-2 text-center'>
                <div className='border py-8 rounded-xl shadow-xl text-indigo-600 font-bold'>
                    <p>Data Points</p>
                    <p className='text-gray-400 mt-2'>Stats since 2023-04 Season</p>
                </div>
                <div className='border py-8 rounded-xl shadow-xl text-indigo-600 font-bold'>
                    <p>Real-Time</p>
                    <p className='text-gray-400 mt-2'>Updates</p>
                </div>
                <div className='border py-8 rounded-xl shadow-xl text-indigo-600 font-bold'>
                    <p>Comprehensive</p>
                    <p className='text-gray-400 mt-2'>Player and Team Analysis</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About
