import React from 'react';
import { NavLink } from 'react-router-dom';

function ApplySmartly() {
  const features = [
    {
      title: "Command Center",
      description: "A bird's-eye view of your career trajectory. Track total applications, pending responses, and offers received in real-time.",
      icon: "📊",
      link: "/dashboard",
      buttonText: "Open Dashboard"
    },
    {
      title: "Smart Filtering",
      description: "Don't get lost in the noise. Search, filter, and categorize your applications by status, salary, or company with precision.",
      icon: "🔍",
      link: "/applications",
      buttonText: "View Applications"
    },
    {
      title: "Growth Analytics",
      description: "Visualise your progress. Identify which resumes are performing best and analyze your interview-to-offer conversion rates.",
      icon: "📈",
      link: "/analytics",
      buttonText: "Analyze Data"
    },
    {
      title: "Secure Bookmarks",
      description: "Found a dream role but not ready to apply? Save it instantly to your curated list and never miss an opportunity again.",
      icon: "🔖",
      link: "/saved",
      buttonText: "Check Saved"
    }
  ];

  return (
    <div className="bg-slate-950 py-24 px-6 relative overflow-hidden">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h2 className="text-indigo-400 font-mono tracking-[0.3em] uppercase text-sm mb-4">The Smartly Experience</h2>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
          Learn Smartly how to use <span className="text-indigo-500">Smartly.</span>
        </h1>
      </div>

      {/* 2x2 Feature Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {features.map((item, index) => (
          <div key={index} className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:shadow-[0_20px_50px_rgba(79,70,229,0.2)] hover:cursor-pointer transition-all duration-500">
            <div className="text-4xl mb-6">{item.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed mb-8 font-medium">
              {item.description}
            </p>
            <NavLink 
              to={item.link} 
              className="inline-flex items-center text-indigo-400 font-bold hover:text-indigo-300 transition-colors group/btn"
            >
              {item.buttonText}
              <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NavLink>
          </div>
        ))}
      </div>

      {/* "Access Anywhere" Section with your Pinterest Image */}
      <div className="max-w-6xl mx-auto mt-21">
        <div className="relative rounded-[20px] overflow-hidden h-[400px] flex items-center justify-center">
          {/* Your Pinterest Sky Image */}
          <img 
            src="https://i.pinimg.com/736x/36/de/fe/36defed66212d091463bd515d196e6dc.jpg" 
            alt="Sky" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-110 hover:scale-100 transition-transform duration-[500ms]"
          />
          
          {/* Content Overlay */}
          <div className="relative z-10 text-center">
            <div className="bg-indigo-600/20 backdrop-blur-lg border border-white/20 p-8 md:p-12 rounded-[30px] shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter">
                Access from <span className="italic font-serif">anywhere</span> & <span className="italic font-serif">everywhere</span>
              </h2>
              <p className="text-indigo-100 max-w-xl mx-auto font-medium opacity-90">
                Your career doesn't stop, and neither do we. Smartly is fully responsive, ensuring your data is synced across your laptop, tablet, and mobile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplySmartly;