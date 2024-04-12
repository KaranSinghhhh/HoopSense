import React, { useState } from "react";
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import "./Navbars.css";

const Navbars = () => {
    const [nav, setNav] = useState(false);

    const handleClick = () => setNav(!nav);

    return (
        <div className="navbar">
            <div className="nav-content">
                <h1 className="brand-name">HoopSense</h1>
                <ul className="nav-menu">
                    <li>Home</li>
                    <li>About</li>
                    <li>Support</li>
                </ul>
                <div className="nav-buttons">
                    <button className="button sign-up">Sign Up</button>
                    <button className="button log-in">Log in</button>
                </div>
                <div className="mobile-menu-icon mr-4" onClick={handleClick}>
                    {!nav ? <Bars3Icon /> : <XMarkIcon />}
                </div>
            </div>

            <ul className={`mobile-menu ${nav ? "active" : ""}`}>
                <li>Home</li>
                <li>About</li>
                <li>Support</li>
                <div className="mobile-nav-buttons">
                    <button className="button mobile-sign-up">Sign Up</button>
                    <button className="button mobile-log-in">Log In</button>
                </div>
            </ul>
        </div>
    );
};

export default Navbars;
