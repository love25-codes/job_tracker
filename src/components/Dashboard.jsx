import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext'; // Adjust path as needed

function Dashboard() {
  const { jobs } = useContext(JobContext);

  // Stats Calculation
  const stats = [
    { title: "Total Jobs", count: jobs.length, color: "text-white", bg: "bg-slate-800" },
    { title: "Applied", count: jobs.filter(j => j.status === 'Applied').length, color: "text-blue-400", bg: "bg-blue-500/10" },
    { title: "Interviewing", count: jobs.filter(j => j.status === 'Interviewing').length, color: "text-amber-400", bg: "bg-amber-500/10" },
    { title: "Offers", count: jobs.filter(j => j.status === 'Offer').length, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { title: "Rejected", count: jobs.filter(j => j.status === 'Rejected').length, color: "text-rose-400", bg: "bg-rose-500/10" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter">Command Center</h1>
            <p className="text-slate-400 font-medium mt-2 tracking-wide uppercase text-xs">Overview of your career trajectory</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center gap-2">
            <span className="text-xl leading-none">+</span> Add New Job
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.bg} border border-white/5 p-6 rounded-[2rem] backdrop-blur-sm transition-transform hover:scale-105`}>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{stat.title}</p>
              <h3 className={`text-4xl font-black ${stat.color}`}>{stat.count}</h3>
            </div>
          ))}
        </div>

        {/* Recent Applications Section */}
        <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight">Recent Applications</h2>
            <div className="h-px flex-grow mx-8 bg-gradient-to-r from-white/10 to-transparent"></div>
        </div>

        {jobs.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-10 rounded-[3rem] bg-white/5 border border-dashed border-white/10 text-center">
            <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🚀</span>
            </div>
            <p className="text-xl text-slate-300 font-bold mb-2">Ready to land that dream role?</p>
            <p className="text-slate-500 max-w-sm mb-8 font-medium">
              Start tracking your job applications by adding your first application. Keep organized and never miss a follow-up!
            </p>
            <button className="border border-indigo-500/50 text-indigo-400 hover:bg-indigo-500 hover:text-white px-10 py-3 rounded-xl font-bold transition-all">
               + Add your first job
            </button>
          </div>
        ) : (
          /* Jobs List Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const JobCard = ({ job }) => (
  <div className="group relative p-6 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/[0.08] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 overflow-hidden">
    
    {/* Card Header */}
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center font-black text-xl">
          {job.companyName.charAt(0)}
        </div>
        <div>
          <h4 className="text-white font-bold text-lg leading-tight group-hover:text-indigo-300 transition-colors">{job.companyName}</h4>
          <p className="text-slate-500 text-sm font-medium">{job.jobTitle}</p>
        </div>
      </div>
      <button className="text-slate-600 hover:text-rose-500 transition-colors text-xl">♥</button>
    </div>

    {/* Details Section */}
    <div className="space-y-3 mb-8">
      <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
        <span className="px-3 py-1 bg-white/5 rounded-full">📍 {job.location}</span>
        <span className="px-3 py-1 bg-white/5 rounded-full uppercase">{job.locationType}</span>
      </div>
      <div className="flex justify-between items-center bg-black/20 p-4 rounded-2xl">
        <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Salary Range</span>
        <span className="text-white font-bold">{job.salaryRange || 'N/A'}</span>
      </div>
    </div>

    {/* Footer / Actions */}
    <div className="flex items-center justify-between pt-4 border-t border-white/5">
      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest 
        ${job.status === 'Offer' ? 'bg-emerald-500/20 text-emerald-400' : 
          job.status === 'Rejected' ? 'bg-rose-500/20 text-rose-400' : 
          job.status === 'Interviewing' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
        {job.status}
      </span>
      
      <div className="flex gap-2">
        <button className="p-2 rounded-xl bg-white/5 hover:bg-indigo-600 text-slate-400 hover:text-white transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth="2"/></svg>
        </button>
        <button className="p-2 rounded-xl bg-white/5 hover:bg-rose-600 text-slate-400 hover:text-white transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2"/></svg>
        </button>
      </div>
    </div>
  </div>
);

export default Dashboard;