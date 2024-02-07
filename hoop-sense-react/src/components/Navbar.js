import React, {useState} from "react";
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'; // Assuming Bars3Icon is the correct menu icon
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'; // Correct name for the X-mark icon
import { Link } from 'react-router-dom'


const Navbar = () => {
    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)

    return (
        <>
            
            <div className="w-screen h-[80px] z-10  bg-zinc-200 fixed drop-shadow-lg">
                <div className="px-2 flex justify-between items-center w-full h-full">
                    <div className="flex items-center">
                        <h1 className="text-3xl font-bold mr-4 sm:text-4xl">HoopSense</h1>
                        <ul className="hidden md:flex">
                            <li>Home</li>
                            <li>About</li>
                            <li>Support</li>
                        </ul>
                    </div>
                    
                    <div className="hidden md:flex pr-4">
                        
                       
                       <Link to='/sign-up' className=' text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md px-8 py-3 mr-3' >Sign Up</Link>
                        
                        <Link to='/login' className=' text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md px-8 py-3 '>Log in</Link>
                    </div>
                    
                    <div className='md:hidden mr-4 cursor: cursor-pointer' onClick={handleClick}>
                        {!nav ? <Bars3Icon className="w-5" /> : <XMarkIcon className="w-5"/>}
                        
                    
                    </div>
                </div>
                
                <ul className = {!nav ? 'hidden' : 'absolute bg-zinc-200 w-full px-8'}>
                    <li className="border-b-2 border-zinc-300 w-full">Home</li>
                    <li className="border-b-2 border-zinc-300 w-full">About</li>
                    <li className="border-b-2 border-zinc-300 w-full">Support</li>
                    <div className="flex flex-col my-4">
                        <Link to='/sign-up' className=' text-indigo-600 border bg-indigo-600 border-indigo-600 hover:bg-transparent bg-transparent hover:text-indigo-600 rounded-md px-8 py-3 mb-3' >Sign Up</Link>
                        <Link to='/login' className=' text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md px-8 py-3 '>Log in</Link>
                    </div>
                </ul>
                
            </div>
        </>
    );
}

export default Navbar;