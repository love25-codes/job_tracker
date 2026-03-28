import React, { useContext, useState, useMemo } from 'react';
import { JobContext } from '../context/JobContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, MapPin, Calendar, Banknote,
    StickyNote, Edit3, Trash2, Bookmark, BookmarkCheck,
    Search, Filter, Clock, DollarSign, Building
} from 'lucide-react';
import { JobFormModal } from './JobFormModal';

const Applications = () => {
    const { jobs, updateJob, deleteJob, bookmarkJob, savedJobs, addJob } = useContext(JobContext);
    
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("All");
    const [sortBy, setSortBy] = useState("newest");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState(null);

    const tabs = ["All", "Applied", "Interviewing", "Offer", "Rejected"];

    const getThemeStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'applied': return { card: 'bg-amber-50/100 border-amber-100', badge: 'bg-amber-100 text-amber-700 border-amber-200', icon: 'group-hover:bg-amber-600' };
            case 'interviewing': return { card: 'bg-blue-50/100 border-blue-100', badge: 'bg-blue-100 text-blue-700 border-blue-200', icon: 'group-hover:bg-blue-600' };
            case 'offer': return { card: 'bg-emerald-50/100 border-emerald-100', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: 'group-hover:bg-emerald-600' };
            case 'rejected': return { card: 'bg-rose-50/100 border-rose-100', badge: 'bg-rose-100 text-rose-700 border-rose-200', icon: 'group-hover:bg-rose-600' };
            default: return { card: 'bg-indigo-50/50 border-indigo-100', badge: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: 'group-hover:bg-indigo-600' };
        }
    };

    const filteredJobs = useMemo(() => {
        return jobs
            .filter(job => {
                const matchesSearch = job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                    job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesTab = activeTab === "All" || job.status?.toLowerCase() === activeTab.toLowerCase();
                return matchesSearch && matchesTab;
            })
            .sort((a, b) => {
                if (sortBy === "newest") return new Date(b.appliedDate) - new Date(a.appliedDate);
                if (sortBy === "company") return a.companyName.localeCompare(b.companyName);
                if (sortBy === "salary") {
                    const getVal = (s) => parseInt(s?.replace(/[^0-9]/g, '')) || 0;
                    return getVal(b.salaryRange) - getVal(a.salaryRange);
                }
                return 0;
            });
    }, [jobs, searchTerm, activeTab, sortBy]);

    const handleEdit = (job) => {
        setEditingJob(job);
        setIsModalOpen(true);
    };

    return (
        // Reduced gap and removed outer padding to anchor elements together
        <div className="flex flex-col lg:flex-row min-h-screen">
            <JobFormModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingJob(null); }}
                onSubmit={(data) => editingJob ? updateJob(editingJob.id, data) : addJob(data)}
                initialData={editingJob}
            />

            {/* --- SIDEBAR: Tightly integrated --- */}
            <aside className="w-full lg:w-80 p-8 lg:pr-6 space-y-8 shrink-0">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                        <Filter className="text-indigo-600" size={24} /> Smart Filtering
                    </h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1 px-1">Refine Database</p>
                    
                    <div className="relative group mt-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                        <input 
                            type="text"
                            placeholder="Search company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-3">Sort Results</p>
                    {[
                        { id: 'newest', label: 'Recent Date', icon: Clock },
                        { id: 'salary', label: 'Highest Salary', icon: DollarSign },
                        { id: 'company', label: 'Company (A-Z)', icon: Building },
                    ].map((btn) => (
                        <button
                            key={btn.id}
                            onClick={() => setSortBy(btn.id)}
                            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all hover:cursor-pointer ${
                                sortBy === btn.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            <btn.icon size={18} />
                            {btn.label}
                        </button>
                    ))}
                </div>
            </aside>

            {/* --- MAIN CONTENT: Removed gaps for seamless connection --- */}
            <main className="flex-1 bg-slate-100 border-l border-slate-100 p-8 lg:p-10">
                {/* Tabs Row - Kept Original CSS but aligned to top */}
                <div className="flex flex-wrap items-center gap-2 mb-10 bg-white p-2 rounded-[2rem] w-fit border border-slate-200/60 shadow-sm">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-2.5 rounded-full text-sm font-black transition-all hover:cursor-pointer ${
                                activeTab === tab ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-900'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-between mb-7">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{activeTab} Tracking</h3>
                        <p className="text-slate-400 text-xs font-bold mt-1">Showing applications for {activeTab.toLowerCase()} status</p>
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-white px-5 py-2.5 rounded-2xl border border-slate-200/50 shadow-sm">
                        {filteredJobs.length} {filteredJobs.length === 1 ? 'Result' : 'Results'}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredJobs.length === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                className="col-span-full py-24 text-center"
                            >
                                <div className="max-w-md mx-auto">
                                    <div className="bg-white border border-slate-200 rounded-[2.5rem] p-12 shadow-sm">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Search className="text-slate-300" size={30} />
                                        </div>
                                        <p className="text-slate-900 font-black text-xl mb-2">No jobs applied yet</p>
                                        <p className="text-slate-400 text-sm font-medium">We couldn't find any results. Try changing your search keywords or checking a different category.</p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            filteredJobs.map((job) => {
                                const theme = getThemeStyles(job.status);
                                const isBookmarked = savedJobs.some(s => s.id === job.id);

                                return (
                                    <motion.div
                                        key={job.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        whileHover={{ y: -8 }}
                                        className={`group relative border rounded-[2.5rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 ${theme.card} `}
                                    >
                                        <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-[-10px] group-hover:translate-y-0">
                                            <button 
                                                onClick={() => bookmarkJob(job)} 
                                                className="p-2.5 bg-white shadow-md rounded-full hover:scale-110 transition-transform border border-slate-100 hover:cursor-pointer"
                                            >
                                                {isBookmarked ? 
                                                    <BookmarkCheck size={18} className="text-indigo-600 fill-indigo-600" /> : 
                                                    <Bookmark size={18} className="text-slate-400" />
                                                }
                                            </button>
                                            <button onClick={() => handleEdit(job)} className="p-2.5 bg-white shadow-md rounded-full text-blue-500 hover:scale-110 transition-transform border border-slate-100 hover:cursor-pointer"><Edit3 size={16} /></button>
                                            <button onClick={() => deleteJob(job.id)} className="p-2.5 bg-white shadow-md rounded-full text-rose-500 hover:scale-110 transition-transform border border-slate-100 hover:cursor-pointer"><Trash2 size={16} /></button>
                                        </div>

                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white transition-colors duration-300 ${theme.icon}`}>
                                                <Building2 size={24} />
                                            </div>
                                            <div className="flex-1 truncate">
                                                <h4 className="font-bold text-slate-900 text-lg leading-tight truncate">{job.companyName}</h4>
                                                <p className="text-indigo-600 text-sm font-semibold">{job.jobTitle}</p>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${theme.badge}`}>
                                                {job.status || "Applied"}
                                            </span>
                                        </div>

                                        <div className="space-y-3 mb-6 text-sm font-medium text-slate-500">
                                            <div className="flex items-center gap-2"><MapPin size={16} className="text-slate-400" /> {job.location || "N/A"}</div>
                                            <div className="flex items-center gap-2"><Banknote size={16} className="text-slate-400" /> {job.salaryRange || "N/A"}</div>
                                            <div className="flex items-center gap-2"><Calendar size={16} className="text-slate-400" /> {new Date(job.appliedDate).toLocaleDateString('en-GB')}</div>
                                        </div>

                                        {job.notes && (
                                            <div className="bg-white/60 rounded-2xl p-4 flex gap-2 border border-slate-100/50">
                                                <StickyNote size={16} className="text-indigo-400 shrink-0" />
                                                <p className="text-xs text-slate-500 italic line-clamp-2 leading-relaxed">"{job.notes}"</p>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Applications;