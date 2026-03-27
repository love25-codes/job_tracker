import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Banner() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = ["Track your jobs with", "Organize your hunt with", "Secure your future with"];
  const image = "https://i.pinimg.com/1200x/e5/55/cb/e555cb075412116be1b572da93b8752e.jpg";

  // Typing Effect Logic
  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = phrases[loopIndex % phrases.length];
      const updatedText = isDeleting 
        ? currentFullText.substring(0, displayText.length - 1)
        : currentFullText.substring(0, displayText.length + 1);

      setDisplayText(updatedText);

      if (!isDeleting && updatedText === currentFullText) {
        setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
        setTypingSpeed(100);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopIndex(loopIndex + 1);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopIndex, typingSpeed]);

  return (
    <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center bg-slate-950">
      
      {/* Single Background Image with clean overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] scale-105 hover:scale-100"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.7), rgba(2, 6, 23, 0.8)), url(${image})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl px-6">
        
        {/* Typing Headline */}
        <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter h-16 md:h-15">
          {displayText}
          <span className="animate-pulse border-r-4 border-indigo-500 ml-2"></span>
        </h1>


        {/* Brand Name - Added px-2 to prevent the 'y' from cutting off */}
<h2 className="text-6xl md:text-8xl font-black text-transparent py-3 bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500 tracking-tighter overflow-visible">
  Smartly.
</h2>
        
        {/* Quote / Subtext */}
        <p className="mt-8 md:text-lg text-slate-400 font-medium  mx-auto italic">
          "The best way to predict the future is to create it. <br className="hidden md:block"/> 
          Stay organized, stay ahead, and land your dream role."
        </p>

        {/* CTA Button */}
        <div className="mt-12">
          <NavLink to="/dashboard" className="relative inline-flex items-center justify-center px-9 py-4 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-xl group hover:bg-indigo-500 shadow-xl shadow-indigo-500/20">
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out -translate-x-full bg-white opacity-10 group-hover:translate-x-0"></span>
            <span className="relative text-sm uppercase tracking-[0.2em] font-black">
              Access Dashboard
            </span>
            <svg className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Banner;