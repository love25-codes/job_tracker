import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-900 pt-22 pb-10  overflow-hidden">
      
      {/* Subtle Top Curve - Separates it from the black section above */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Main Footer Content */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start mb-15">
          
          {/* Brand Identity */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                 <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white" strokeWidth="2.5">
                    <path d="M3 21h18"/><path d="M3 10h18"/><path d="m5 6 7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/>
                 </svg>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tighter">Smartly.</h2>
            </div>
            <p className="mt-4 text-slate-400 text-sm font-bold uppercase tracking-[0.2em]">
              Career <span className="text-indigo-500">Accelerated</span>
            </p>
          </div>

          {/* Navigation Grid */}
          <div className="grid sm:grid-cols-2 gap-x-11 gap-y-4">
            {['Home', 'Dashboard', 'Applications', 'Analytics', 'Saved'].map((item) => (
              <NavLink 
                key={item} 
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-slate-400 hover:text-white text-sm font-semibold transition-all duration-300 hover:translate-x-1"
              >
                {item}
              </NavLink>
            ))}
          </div>

          {/* Back to Top - Classy Floating Button */}
          <button 
            onClick={scrollToTop}
            className="flex flex-col items-center gap-3 group hover:cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-indigo-500 group-hover:bg-indigo-500 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7" />
              </svg>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">Top</span>
          </button>
        </div>

        {/* Bottom Bar: Simple & Sober */}
        <div className="w-full pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-[11px] font-medium tracking-[0.1em]">
            © 2026 SMARTLY SYSTEMS • ALL RIGHTS RESERVED
          </p>
          
          <div className="flex gap-6 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>

      </div>

      {/* Background Decor - Glow */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px]" />
    </footer>
  );
}

export default Footer;