import React, {useState} from "react";
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'; 
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'; 
import { Link } from 'react-router-dom'


const Navbar = () => {
    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)

    // This function will handle scrolling to the About section
    const scrollToAbout = () => {
    // Close the navbar if it's open on mobile
    setNav(false);
    
    // Scroll to the About section
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }}

    const scrollToSupport = () => {
        setNav(false)
    

    const supportSection = document.getElementById('support-section');
    if (supportSection) {
        supportSection.scrollIntoView({ behavior: 'smooth'})
    }}



    return (
        <>
            
            <div className="w-screen h-[90px] z-10  bg-zinc-200 fixed drop-shadow-lg">
                <div className="px-2 flex justify-between items-center w-full h-[70px]">
                    <div className="flex items-center">
                        <h1 className="text-3xl font-bold mr-4 mt-3 sm:text-4xl">HoopSense</h1>
                        
                            <ul className="hidden md:flex pr-4 mt-4">
                                <Link to='/playerStats' className='flex px-4 py-3 text-slate-500'>Player Stats</Link>
                                <Link to='/teamStats' className='flex px-4 py-3 text-slate-500'>Team Stats</Link>
                                {/*<Link to='/compareStats' className='flex px-4 py-3 text-slate-500'>Player or Team Comparisons</Link>*/}
                            </ul>
                       

                        {/*<ul className="hidden md:flex">
                            <li>Home</li>
                            <li>About</li>
                            <li>Support</li>
                        </ul>
                        */}
                    </div>
                    
                    <div className="hidden md:flex pr-4">
                        <ul className="hidden md:flex">
                                

                                <a to="/Home" className=' text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md px-8 py-3 mr-3' >Home</a>
                                <a to="/About" className=' text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md px-8 py-3 mr-3' onClick={scrollToAbout}>About</a>
                                <a to="/Support" className=' text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md px-8 py-3' onClick={scrollToSupport}>Support</a>
                        </ul>
                        
                       
                       {/*<Link to='/sign-up' className=' text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md px-8 py-3 mr-3' >Sign Up</Link>
                       <Link to='/login' className=' text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md px-8 py-3 '>Log in</Link>*/}
                    </div>
                    
                    <div className='md:hidden mr-4 cursor: cursor-pointer' onClick={handleClick}>
                        {!nav ? <Bars3Icon className="w-5" /> : <XMarkIcon className="w-5"/>}
                        
                    
                    </div>
                </div>
                
                <ul className = {!nav ? 'hidden' : 'absolute bg-zinc-200 w-full px-8'}>
                    
                    <div className="flex flex-col my-4">
                        <Link to="/playerStats" className="px-4 py-3 border-b-2 border-zinc-300 w-full">Player Stats</Link>
                        <Link to="/teamStats" className="px-4 py-3 border-b-2 border-zinc-300 w-full">Team Stats</Link>
                    </div>

                    <div className="flex flex-col my-4">
                        <Link to='/Home' className=' text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md px-8 py-3 mb-3'>Home</Link>
                        <Link to='/About' className=' text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md px-8 py-3 mb-3' onClick={scrollToAbout}>About</Link>
                        <Link to='/Support' className=' text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md px-8 py-3 '>Support</Link>
                    </div>
                  
                    
                </ul>
                
            </div>
        </>
    );
}

export default Navbar;