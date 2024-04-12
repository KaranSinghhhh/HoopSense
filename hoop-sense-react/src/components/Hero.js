import React from 'react'
import shooting_ball from '../assets/nba_img.png'

import { FaUser, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='w-full min-h-screen bg-zinc-200 flex flex-col justify-between'>
        <div className='max-w-[1240px] mx-auto px-2 py-8'>
            <div className='flex flex-col justify-center items-start'>
                <p className='text-2xl'>Showcasing the Game with NBA Analytics</p>
                <h1 className='py-3 text-5xl md:text-7xl font-bold'>Basketball Data Insights</h1>
                <div className='flex justify-center w-full my-4'>
                <p className='text-2xl'>Your ultimate source for NBA statistics</p>
                </div>
                <div className='flex justify-center w-full my-4'>
                  
                    <Link to='/playerStats' className="text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md px-8 py-3 mb-3">Get Started</Link>
                  
                </div>
            </div>
            <div className='flex justify-center py-8'>
                <img className='w-[500px]' src={shooting_ball} alt='Basketball Data Insights'/>
            </div>
            <div className='bg-zinc-200 border border-slate-300 rounded-xl text-center shadow-xl p-8'>
                <p>HoopSense Services</p>
                <div className='flex justify-center items-center space-x-4'>
                    <p className='flex items-center text-slate-500'><FaUser className='h-6 text-indigo-600 mr-1' /> Player Stats</p>
                    <p className='flex items-center text-slate-500'><FaUsers className='h-6 text-indigo-600 mr-1'/> Team Stats</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero