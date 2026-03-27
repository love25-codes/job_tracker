import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    // Shared logic for active states
    const linkClasses = ({ isActive }) =>
        `relative px-1 py-2 text-base font-bold transition-all duration-300 ease-in-out hover:text-indigo-600 ${
            isActive ? "text-indigo-600" : "text-slate-600"
        }`;

    return (
        <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-start items-center h-20">
                    
                    {/* Logo Section */}
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-lg shadow-indigo-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 21h18"/><path d="M3 10h18"/><path d="m5 6 7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/><path d="M8 14v3"/><path d="M12 14v3"/><path d="M16 14v3"/>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black tracking-tight text-slate-800 leading-none">
                                Smartly<span className="text-indigo-600">.</span>
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-bold mt-1">
                                Apply & Track
                            </span>
                        </div>
                    </div>

                    {/* Navigation Tabs - Aligned Right */}
                    <div className="hidden md:flex items-center space-x-10 ml-auto">
                        <NavLink to="/" className={linkClasses}>
                            {({ isActive }) => (
                                <>
                                    Home
                                    {isActive && <ActiveLine />}
                                </>
                            )}
                        </NavLink>
                        <NavLink to="/dashboard" className={linkClasses}>
                            {({ isActive }) => (
                                <>
                                    Dashboard
                                    {isActive && <ActiveLine />}
                                </>
                            )}
                        </NavLink>
                        <NavLink to="/applications" className={linkClasses}>
                            {({ isActive }) => (
                                <>
                                    Applications
                                    {isActive && <ActiveLine />}
                                </>
                            )}
                        </NavLink>
                        <NavLink to="/analytics" className={linkClasses}>
                            {({ isActive }) => (
                                <>
                                    Analytics
                                    {isActive && <ActiveLine />}
                                </>
                            )}
                        </NavLink>

                        {/* Booked Button with Light Blue Background Effect */}
                    <NavLink to="/saved" className="group flex items-center gap-2 px-5 py-3 rounded-full bg-blue-50 text-slate-700 text-sm font-medium hover:bg-blue-200 hover:cursor-pointer transition-all duration-300 shadow-sm shadow-blue-100">
                        <span>Saved</span>
                        <span className=" group-hover:scale-110 transition-transform">💙</span>
                    </NavLink>
                    </div>

                </div>
            </div>
        </nav>
    );
}

const ActiveLine = () => (
    <div className="absolute -bottom-[20px] left-0 right-0 h-1 bg-indigo-700 rounded-t-full shadow-[0_-2px_10px_rgba(79,70,229,0.4)]" />
);

export default Navbar;