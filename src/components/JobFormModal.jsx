import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, MapPin, Banknote, StickyNote, Send, Briefcase } from 'lucide-react';

export const JobFormModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    companyName: '', jobTitle: '', location: '', locationType: 'remote',
    status: 'applied', salaryRange: '', appliedDate: new Date().toISOString().split('T')[0], notes: ''
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({ 
      companyName: '', jobTitle: '', location: '', locationType: 'remote', 
      status: 'applied', salaryRange: '', appliedDate: new Date().toISOString().split('T')[0], notes: '' 
    });
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100"
        >
          {/* Header - Black & Indigo Theme */}
          <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black text-white">{initialData ? 'Edit Application' : 'New Journey'}</h2>
              <p className="text-indigo-400 text-sm font-bold uppercase tracking-wider">Smartly Tracker</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white hover:cursor-pointer">
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form className="p-8 space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); onClose(); }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-black uppercase text-slate-500 ml-1">Company Name</label>
                <div className="relative mt-1">
                  <Building2 className="absolute left-4 top-3.5 text-indigo-500" size={18} />
                  <input required className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 ring-indigo-500 outline-none font-semibold text-slate-900" 
                    placeholder="e.g. Google" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
                </div>
              </div>

              <div className="col-span-2">
                <label className="text-xs font-black uppercase text-slate-500 ml-1">Job Title</label>
                <div className="relative mt-1">
                  <Briefcase className="absolute left-4 top-3.5 text-indigo-500" size={18} />
                  <input required className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 ring-indigo-500 outline-none font-semibold text-slate-900" 
                    placeholder="e.g. Software Engineer" value={formData.jobTitle} onChange={e => setFormData({...formData, jobTitle: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="text-xs font-black uppercase text-slate-500 ml-1">Location</label>
                <input className="w-full px-4 py-3 mt-1 bg-slate-50 border-none rounded-2xl focus:ring-2 ring-indigo-500 outline-none font-semibold text-slate-900" 
                  placeholder="e.g. Bengaluru" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>

              <div>
                <label className="text-xs font-black uppercase text-slate-500 ml-1">Salary Range</label>
                <input className="w-full px-4 py-3 mt-1 bg-slate-50 border-none rounded-2xl focus:ring-2 ring-indigo-500 outline-none font-semibold text-slate-900" 
                  placeholder="e.g. $120k" value={formData.salaryRange} onChange={e => setFormData({...formData, salaryRange: e.target.value})} />
              </div>

              <div>
                <label className="text-xs font-black uppercase text-slate-500 ml-1">Status</label>
                <select className="w-full px-4 py-3 mt-1 bg-slate-50 border-none rounded-2xl focus:ring-2 ring-indigo-500 outline-none font-bold text-indigo-600 cursor-pointer"
                  value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black uppercase text-slate-500 ml-1">Type</label>
                <select className="w-full px-4 py-3 mt-1 bg-slate-50 border-none rounded-2xl focus:ring-2 ring-indigo-500 outline-none font-bold text-slate-900 cursor-pointer"
                  value={formData.locationType} onChange={e => setFormData({...formData, locationType: e.target.value})}>
                  <option value="remote">Remote</option>
                  <option value="onsite">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="text-xs font-black uppercase text-slate-500 ml-1">Notes</label>
                <textarea className="w-full px-4 py-3 mt-1 bg-slate-50 border-none rounded-2xl focus:ring-2 ring-indigo-500 outline-none font-semibold text-slate-900 resize-none" rows="2"
                  placeholder="Add any extra details..." value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-slate-900 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 mt-2">
              <Send size={18} /> {initialData ? 'Update Application' : 'Add to Tracker'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};