import React from 'react';
import shooting_ball from '../assets/nba_img.png';

import { FaUser, FaUsers, FaPlusSquare, FaCalendarAlt } from 'react-icons/fa';
import { AiOutlineTeam } from 'react-icons/ai';
import { BiStats } from 'react-icons/bi';
import { RiBarChartHorizontalFill } from 'react-icons/ri';

import './Heros.css'; // Importing the custom CSS

const Heros = () => {
  return (
    <div className='hero-container'>
        <div className='hero-content'>
            <div className='text-content'>
                <p className='showcase-text'></p>
                <h1 className='main-heading'>Basketball Data Insights</h1>
                <p className='subheading'>Your ultimate source for NBA statistics</p>
                <button className='get-started-btn'>Get Started</button>
            </div>
            <div className='image-container'>
                <img className='nba-image' src={shooting_ball} alt='/'/>
            </div>
            <div className='services-section'>

                <p>HoopSense Services</p>
                <div className='services-list'>
                    <p className='service-item'><FaUser className='icon player-stats-icon' /> Player Stats</p>
                    <p className='service-item'><FaUsers className='icon team-stats-icon'/> Team Stats</p>
                    <p className='service-item'><AiOutlineTeam className='icon player-comparison-icon' /> Player-by-player Comparisons</p>
                    {/* Uncomment and use the following lines as per your needs
                    <p className='service-item'><BiStats className='icon team-comparison-icon'/> Team-by-Team Comparison</p>  
                    <p className='service-item'><RiBarChartHorizontalFill className='icon stats-icon'/> Current Season & Historical Stats</p>
                    <p className='service-item'><FaPlusSquare className='icon injuries-icon'/>Player Injuries</p>
                    <p className='service-item'><FaCalendarAlt className='icon games-icon'/>Recent & Upcoming Games</p>
                    */}
                </div>
            </div>
        </div>
    </div>
  );
}

export default Heros;