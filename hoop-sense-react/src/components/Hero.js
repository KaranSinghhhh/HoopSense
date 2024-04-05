import React from 'react'
import shooting_ball from '../assets/nba_img.png'


import { FaUser } from 'react-icons/fa';
import { AiOutlineTeam } from 'react-icons/ai';
import { BiStats } from 'react-icons/bi';
import { RiBarChartHorizontalFill } from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa'; // Group-by-group icon for 'Team-by-Team Comparison'

import { FaPlusSquare, FaCalendarAlt} from 'react-icons/fa';


const Hero = () => {
  return (
    <div className='w-full h-screen bg-zinc-200 flex flex-col justify-between'>
        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
            <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                <p className='text-2xl'>Showcasing the Game with NBA Analytics</p>
                <h1 className='py-3 text-5xl md:text-7xl font-bold'>Basketball Data Insights</h1>
                <p className='text-2xl'>Your ultimate source for NBA statistics</p>
                <button className='py-3 px-6 sm:w-[60%] my-4'>Get Started</button>
            </div>
            <div>
                <img className='w-full px-4' src={shooting_ball} alt='/'/>
            </div>
            <div className='absolute flex flex-col py-8 md:min-w-[760px] bottom-[5%]
            mx-1 md:left-1/2 transform md:-translate-x-1/2 bg-zinc-200
            border border-slate-300 rounded-xl text-center shadow-xl'>

                <p>HoopSense Services</p>
                <div className='flex justify-center items-center px-4 py-2 space-x-4'>
                  <p className='flex items-center text-slate-500'><FaUser className='h-6 text-indigo-600 mr-1' /> Player Stats</p>
                  <p className='flex items-center text-slate-500'><FaUsers className='h-6 text-indigo-600 mr-1'/> Team Stats</p>
                    {/*<p className='flex px-4 py-3 text-slate-500'><AiOutlineTeam className='h-6 text-indigo-600 mr-1' /> Player or Team Comparisons</p>*/}
                  
                    {/*
                      <p className='flex px-4 py-3 text-slate-500'><BiStats className='h-6 text-indigo-600 mr-1'/> Team-by-Team Comparison</p>  
                    <p className='flex px-4 py-3 text-slate-500'><RiBarChartHorizontalFill className='h-6 text-indigo-600 mr-1'/> Current Season & Historical Stats</p>
                    <p className='flex px-4 py-3 text-slate-500'><FaPlusSquare className='h-6 text-indigo-600 mr-1'/>Player Injuries</p>
                    <p className='flex px-4 py-3 text-slate-500'><FaCalendarAlt className='h-6 text-indigo-600 mr-1'/>Recent & Upcoming Games</p>
                    */}
                </div>
            </div>

        </div>
    </div>
  )
}

export default Hero
