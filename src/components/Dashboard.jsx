import React, { useContext, useState } from 'react';
import { JobContext } from '../context/JobContext';

function Dashboard() {
  const { jobs, addJob } = useContext(JobContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Expanded Form State to match JobContext requirements
  const [formData, setFormData] = useState({
    companyName: '', jobTitle: '', location: '', 
    locationType: 'Remote', status: 'Applied', 
    salaryRange: '', appliedDate: new Date().toISOString().split('T')[0], 
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addJob(formData); // This triggers the Context's useEffect to save to localStorage
    setIsModalOpen(false);
    // Reset form
    setFormData({ companyName: '', jobTitle: '', location: '', locationType: 'Remote', status: 'Applied', salaryRange: '', appliedDate: new Date().toISOString().split('T')[0], notes: '' });
  };

  const stats = [
    { title: "Total", count: jobs.length, emoji: "📁", color: "text-slate-700", border: "border-slate-200" },
    { title: "Applied", count: jobs.filter(j => j.status === 'Applied').length, emoji: "📨", color: "text-blue-600", border: "border-blue-200" },
    { title: "Interviews", count: jobs.filter(j => j.status === 'Interviewing').length, emoji: "✨", color: "text-indigo-600", border: "border-indigo-200" },
    { title: "Offers", count: jobs.filter(j => j.status === 'Offer').length, emoji: "🎯", color: "text-emerald-600", border: "border-emerald-200" },
    { title: "Rejected", count: jobs.filter(j => j.status === 'Rejected').length, emoji: "🚫", color: "text-rose-600", border: "border-rose-200" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-slate-500 text-sm font-medium">Manage your active job pipeline.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2"
          >
            <span className="text-lg">+</span> Add Job
          </button>
        </div>

        {/* Stats Grid - Sleek Rectangles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-5 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className={`bg-white border-b-4 ${stat.border} p-5 rounded-xl shadow-sm flex items-center justify-between`}>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1">{stat.title}</p>
                <h3 className={`text-2xl font-black ${stat.color}`}>{stat.count}</h3>
              </div>
              <span className="text-xl grayscale opacity-50">{stat.emoji}</span>
            </div>
          ))}
        </div>

        {/* Main List Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800">Recent Applications</h2>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{jobs.length} Applications Total</span>
          </div>

          <div className="p-6">
            {jobs.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-4xl mb-4 text-slate-300 italic">No data available</div>
                <p className="text-slate-500 text-sm max-w-xs mx-auto mb-6 font-medium">Start tracking your job applications by adding your first application. Keep organized and never miss a follow-up!</p>
                <button onClick={() => setIsModalOpen(true)} className="text-indigo-600 font-bold text-sm hover:underline uppercase tracking-widest">+ Add First Job</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => <JobCard key={job.id} job={job} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- PROFESSIONAL OVERLAY MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-[2px]">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">New Job Entry</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl">×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-2 gap-x-6 gap-y-5">
              <div className="col-span-2">
                <label className="block text-[11px] font-black uppercase text-slate-500 mb-1.5 ml-1">Company Name</label>
                <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium" 
                  type="text" placeholder="e.g. Microsoft" onChange={(e) => setFormData({...formData, companyName: e.target.value})} />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-[11px] font-black uppercase text-slate-500 mb-1.5 ml-1">Job Title</label>
                <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none font-medium" 
                  type="text" placeholder="Product Designer" onChange={(e) => setFormData({...formData, jobTitle: e.target.value})} />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-[11px] font-black uppercase text-slate-500 mb-1.5 ml-1">Applied Date</label>
                <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none font-medium" 
                  type="date" value={formData.appliedDate} onChange={(e) => setFormData({...formData, appliedDate: e.target.value})} />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-[11px] font-black uppercase text-slate-500 mb-1.5 ml-1">Location Type</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none font-medium" 
                  onChange={(e) => setFormData({...formData, locationType: e.target.value})}>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-[11px] font-black uppercase text-slate-500 mb-1.5 ml-1">Current Status</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none font-medium text-indigo-600 font-bold" 
                  onChange={(e) => setFormData({...formData, status: e.target.value})}>
                  <option>Applied</option>
                  <option>Interviewing</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-[11px] font-black uppercase text-slate-500 mb-1.5 ml-1">Salary Range & Notes</label>
                <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none font-medium resize-none h-20" 
                  placeholder="e.g. $120k - $140k. Mention specific benefits..." onChange={(e) => setFormData({...formData, notes: e.target.value})} />
              </div>

              <button type="submit" className="col-span-2 mt-4 bg-indigo-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]">
                Finalize Entry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const JobCard = ({ job }) => (
  <div className="p-6 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-50 text-indigo-600 rounded-lg flex items-center justify-center font-black border border-slate-100">
          {job.companyName.charAt(0)}
        </div>
        <div>
          <h4 className="text-slate-800 font-bold text-base leading-none mb-1">{job.companyName}</h4>
          <p className="text-slate-400 font-medium text-xs">{job.jobTitle}</p>
        </div>
      </div>
      <button className="text-slate-300 hover:text-rose-500 transition-colors">♥</button>
    </div>

    <div className="flex flex-wrap gap-2 mb-6">
      <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-slate-50 text-slate-500 rounded border border-slate-100">{job.locationType}</span>
      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border 
        ${job.status === 'Offer' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
          job.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
          job.status === 'Interviewing' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
          'bg-blue-50 text-blue-600 border-blue-100'}`}>
        {job.status}
      </span>
    </div>

    <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400">{job.appliedDate}</span>
        <div className="flex gap-1">
          <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all">✎</button>
          <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-rose-600 transition-all">🗑</button>
        </div>
    </div>
  </div>
);

export default Dashboard;