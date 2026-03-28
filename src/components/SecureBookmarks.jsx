import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, MapPin, Calendar, 
  Trash2, BookmarkCheck, Activity 
} from 'lucide-react';

const SecureBookmarks = () => {
 const { savedJobs, removeBookmark } = useContext(JobContext);

  const bgImage = "https://cdn.govexec.com/media/syndication/Cornerstone/viewcast/Workforce1.jpg";

  return (
    <div className="relative min-h-screen pb-20 overflow-hidden font-sans">
      
      {/* 1. Clean Background Layer */}
      <div className="absolute inset-0">
        <img src={bgImage} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-indigo-950/70" />
      </div>

      {/* 2. Content Layer */}
      <div className="relative z-10 p-6 md:p-10 lg:p-20 max-w-5xl mx-auto">
        
        {/* Simple Header */}
        <header className="flex items-end justify-between mb-16 border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BookmarkCheck className="text-indigo-500" size={28} />
              <h1 className="text-4xl font-light tracking-tight text-white">
                Saved <span className="font-bold text-indigo-400">Applications</span>
              </h1>
            </div>
            <p className="text-slate-400 text-sm font-medium tracking-wide">Your curated career opportunities.</p>
          </div>
          
          <div className="hidden md:block text-right">
            <span className="text-3xl font-light text-white">{savedJobs.length}</span>
            <p className="text-[10px] uppercase tracking-widest text-indigo-500 font-bold">Total Saved</p>
          </div>
        </header>

        {/* --- VERTICAL LIST --- */}
        {savedJobs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 px-10 rounded-[3rem] bg-slate-900/50 backdrop-blur-md border-2 border-dashed border-slate-800 text-center"
          >
            <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 shadow-inner border border-indigo-900/30">
              <span className="text-4xl">🗄️</span>
            </div>
            <p className="text-2xl text-white font-black mb-2 tracking-tight">No Saved Jobs</p>
            <p className="text-slate-500 max-w-sm font-medium leading-relaxed">
              Your secure vault is currently empty. Bookmark applications to store them here.
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {savedJobs.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="group relative flex flex-col md:flex-row items-center justify-between bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 rounded-2xl p-6 transition-all duration-300"
                >
                  {/* Left: Branding & Role */}
                  <div className="flex items-center gap-6 w-full md:w-1/3">
                    <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg leading-tight">{job.companyName}</h3>
                      <p className="text-indigo-400 text-sm font-medium">{job.jobTitle}</p>
                    </div>
                  </div>

                  {/* Center: Metadata (Added Status) */}
                  <div className="flex items-center gap-8 w-full md:w-auto mt-4 md:mt-0">
                    <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                      <Activity size={14} className="text-indigo-500/50" />
                      <span>{job.status}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                      <MapPin size={14} className="text-slate-600" />
                      <span>{job.location || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                      <Calendar size={14} className="text-slate-600" />
                      {/* Formatted Date: dd mm yyyy */}
                      <span>{new Date(job.appliedDate).toLocaleDateString('en-GB')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-6 md:mt-0 w-full md:w-auto justify-end">
                    <button 
                      onClick={() => removeBookmark(job.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 transition-colors hover:cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureBookmarks;