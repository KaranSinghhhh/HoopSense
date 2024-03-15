// TeamStats.js
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import TraditionalStats from './TraditionalStats';
import DefensiveStats from './DefensiveStats';


function TeamStats() {
 const [searchTerm, setSearchTerm] = useState('');
 const [currentView, setCurrentView] = useState(''); // 'traditional', 'defensive', 'advanced'
 const [borderTeamColor, setBorderTeamColor] = useState('bg-gray-200')
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
 const statColors = {
   // Your statColors object
   "Atlanta Hawks": "bg-red-500",
   "Boston Celtics": "bg-green-600",
   "Brooklyn Nets": "bg-gray-700",
   "Charlotte Hornets": "bg-purple-600",
   "Chicago Bulls": "bg-red-600",
   "Cleveland Cavaliers": "bg-red-700",
   "Dallas Mavericks": "bg-blue-700",
   "Denver Nuggets": "bg-yellow-400",
   "Detroit Pistons": "bg-blue-600",
   "Golden State Warriors": "bg-blue-400",
   "Houston Rockets": "bg-red-500",
   "Indiana Pacers": "bg-yellow-500",
   "Los Angeles Clippers": "bg-red-700",
   "Los Angeles Lakers": "bg-purple-500",
   "Memphis Grizzlies": "bg-blue-800",
   "Miami Heat": "bg-red-600",
   "Milwaukee Bucks": "bg-green-500",
   "Minnesota Timberwolves": "bg-blue-500",
   "New Orleans Pelicans": "bg-red-600",
   "New York Knicks": "bg-blue-600",
   "Oklahoma City Thunder": "bg-blue-500",
   "Orlando Magic": "bg-blue-700",
   "Philadelphia 76ers": "bg-blue-500",
   "Phoenix Suns": "bg-orange-500",
   "Portland Trail Blazers": "bg-black",
   "Sacramento Kings": "bg-purple-700",
   "San Antonio Spurs": "bg-gray-600",
   "Toronto Raptors": "bg-purple-700",
   "Utah Jazz": "bg-yellow-600",
   "Washington Wizards": "bg-blue-600",
 };


 useEffect(() => {
   // Update border color based on searchTerm
   const teamBorder = teamColors[searchTerm] || 'bg-gray-200'; // Default color if team not found
   setBorderTeamColor(teamBorder);
 }, [searchTerm]); // Depend on searchTerm to trigger updates


 const handleStatsViewChange = (view) => {
   setCurrentView(view);
 };


 const getButtonColor = (view) => {
   // Derive the button color based on the searchTerm and whether it matches the currentView
   const isActive = currentView === view;
   const teamColor = isActive ? statColors[searchTerm] : 'bg-gray-200';
   return `${isActive ? teamColor : 'bg-gray-200'} ml-2 flex text-black items-center justify-center p-2 rounded-2xl ring-2 ring-gray-300 border-none`;
 };






 return (
   <>
     <div className={`mt-[150px] flex justify-center py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-t-[2px] border-b-[2px] rounded-t-[5px] w-3/4 h-3/4 mx-auto ${borderTeamColor}`}>
       <form onSubmit={(e) => e.preventDefault()} className="flex">
         <input
           type="text"
           name="search"
           placeholder="Search for Team"
           autoComplete="off"
           aria-label="Search team"
           className="px-3 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
         />
         <button type="submit" className="ml-2 flex text-gray-500 items-center justify-center p-2 bg-white rounded-2xl ring-2 ring-gray-300 border-none">
           <FaSearch />
         </button>
       </form>
     </div>


     <div className={`flex justify-center py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-b-[2px] w-3/4 h-3/4 mx-auto ${borderTeamColor}`}>
       <button
         onClick={() => handleStatsViewChange('traditional')}
         className={getButtonColor('traditional')}>
         Traditional
         </button>
       <button
         onClick={() => handleStatsViewChange('defensive')}
         className={getButtonColor('defensive')}>
         Defense
       </button>
       <button
         onClick={() => handleStatsViewChange('advanced')}
         className={getButtonColor('advanced')}>
         Advanced
       </button>
     </div>


     <div
       className={`py-3 px-6 bg-gray-50 border-l-[2px] border-r-[2px] border-b-[2px] rounded-b-[5px] w-3/4 h-[270px] mx-auto overflow-x-auto ${borderTeamColor}`}>
       {currentView === 'traditional' && <TraditionalStats searchTerm={searchTerm} teamColors={teamColors} statColors={statColors} />}
       {currentView === 'defensive' && <DefensiveStats searchTerm={searchTerm} teamColors={teamColors} statColors={statColors} />}
     </div>

     
     


   </>
 );
}


export default TeamStats;

