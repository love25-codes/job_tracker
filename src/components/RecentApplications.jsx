import React, { useContext, useState } from 'react';
import { JobContext } from '../context/JobContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, MapPin, Calendar, Banknote, 
  StickyNote, ChevronRight, Edit3, Trash2, Bookmark 
} from 'lucide-react';
import { JobFormModal } from './JobFormModal'; // Ensure correct import path

const RecentApplications = () => {
  const { jobs, addJob, updateJob, deleteJob } = useContext(JobContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  // Helper for styles
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'applied': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'interviewing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'offer': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'rejected': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const handleSubmit = (data) => {
    if (editingJob) {
      updateJob(editingJob.id, data);
    } else {
      addJob(data);
    }
    setEditingJob(null);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  return (
    <div className="lg:px-10 mb-5 relative">
      <JobFormModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingJob(null); }} 
        onSubmit={handleSubmit}
        initialData={editingJob}
      />

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
          Recent Applications
        </h2>
        <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full">
            {jobs.length} Total
            </span>
        </div>
      </div>

      {jobs.length === 0 ? (
        /* Empty State */
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 rounded-[3rem] bg-slate-50 border-2 border-dashed border-slate-200 text-center"
        >
          <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <span className="text-4xl">🚀</span>
          </div>
          <p className="text-2xl text-slate-800 font-black mb-2 tracking-tight">Ready to land that dream role?</p>
          <p className="text-slate-500 max-w-sm mb-8 font-medium leading-relaxed">
            Start tracking your job applications by adding your first application. Keep organized and never miss a follow-up!
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white hover:bg-black px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100 flex items-center hover:cursor-pointer"
          >
              <span>+ Add your first job</span>
          </button>
        </motion.div>
      ) : (
        /* Job Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -8 }}
                className="group relative bg-indigo-50 border border-indigo-200 rounded-[2rem] p-4 shadow-sm hover:shadow-xl transition-all duration-30"
              >
                {/* Action Buttons Overlay */}
                <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ">
                    <button className="p-2 hover:cursor-pointer bg-white shadow-md rounded-full text-slate-400 hover:text-indigo-600 hover:scale-110 transition-all">
                        <Bookmark size={16} />
                    </button>
                    <button onClick={() => handleEdit(job)} className="p-2 hover:cursor-pointer bg-white shadow-md rounded-full text-slate-400 hover:text-blue-600 hover:scale-110 transition-all">
                        <Edit3 size={16} />
                    </button>
                    <button onClick={() => deleteJob(job.id)} className="p-2 hover:cursor-pointer bg-white shadow-md rounded-full text-slate-400 hover:text-rose-600 hover:scale-110 transition-all">
                       <Trash2 size={16} />
                    </button>
                </div>

                {/* Header: Company & Status */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white group-hover:bg-indigo-600 transition-colors duration-300">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-xl leading-tight truncate w-32 md:w-40">
                        {job.companyName}
                      </h3>
                      <p className="text-indigo-700 text-md font-semibold">{job.jobTitle}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(job.status)}`}>
                    {job.status}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                    <MapPin size={16} className="text-slate-400" />
                    <span>{job.location} • <span className="capitalize">{job.locationType}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                    <Banknote size={16} className="text-slate-400" />
                    <span>{job.salaryRange || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                    <Calendar size={16} className="text-slate-400" />
                    <span>Applied: {new Date(job.appliedDate).toLocaleDateString('en-GB')}</span>
                  </div>
                </div>

                {/* Notes Section */}
                {job.notes && (
                  <div className="bg-slate-50 rounded-xl p-3 flex gap-3 border border-slate-100">
                    <StickyNote size={18} className="text-indigo-700 shrink-0" />
                    <p className="text-sm text-slate-600 italic">
                      "{job.notes}"
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default RecentApplications;