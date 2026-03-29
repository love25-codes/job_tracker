import React, { useContext, useMemo } from 'react';
import { JobContext } from '../context/JobContext';
import { motion } from 'framer-motion';
import { BarChart2, Plus } from 'lucide-react';

const Analytics = () => {
  const { jobs } = useContext(JobContext);

  const stats = useMemo(() => {
    const counts = {
      applied: jobs.filter(j => j.status?.toLowerCase() === 'applied').length,
      interviewing: jobs.filter(j => j.status?.toLowerCase() === 'interviewing').length,
      offer: jobs.filter(j => j.status?.toLowerCase() === 'offer').length,
      rejected: jobs.filter(j => j.status?.toLowerCase() === 'rejected').length,
    };
    const max = Math.max(...Object.values(counts), 1);
    return { counts, max, total: jobs.length };
  }, [jobs]);

  // --- REFINED EMPTY STATE ---
  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-[3rem] p-20 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] my-12 mx-auto max-w-5xl flex flex-col items-center justify-center text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-indigo-50 rounded-3xl scale-110 animate-pulse" />
          <div className="relative bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
            <BarChart2 className="text-indigo-500" size={40} />
          </div>
        </div>
        
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Growth Analysis</h2>
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1 mb-8 text-center">Market Reach</p>
        
        <div className="max-w-xs">
          <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
            Your tracking engine is idle. Add your first application to unlock real-time growth metrics and success ratios.
          </p>
          <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
             Waiting for Data Input
          </div>
        </div>
      </div>
    );
  }

  const chartData = [
    { label: 'Applied', value: stats.counts.applied, color: '#f0d32f' },
    { label: 'Interview', value: stats.counts.interviewing, color: '#3b82f6' },
    { label: 'Offers', value: stats.counts.offer, color: '#10b981' },
    { label: 'Rejected', value: stats.counts.rejected, color: '#ef4444' }
  ];

  return (
    <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] my-12 mx-auto max-w-5xl">
      {/* Header */}
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Growth Analysis</h2>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">Market Reach</p>
        </div>
        <div className="text-right border-l-2 border-slate-50 pl-8">
          <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Efficiency</p>
          <p className="text-4xl font-black text-slate-900 leading-none mt-1">
            {Math.round((stats.counts.offer / (stats.total || 1)) * 100)}%
          </p>
        </div>
      </div>

      {/* The Graph Area */}
      <div className="relative h-72 w-full">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full border-t border-slate-100/80 relative">
              <span className="absolute -left-8 -top-2 text-[10px] font-bold text-slate-300">
                {Math.round((stats.max / 4) * (4 - i))}
              </span>
            </div>
          ))}
        </div>

        <div className="relative z-10 h-full flex items-end justify-around px-4">
          {chartData.map((item) => {
            const heightPercentage = (item.value / stats.max) * 100;
            return (
              <div key={item.label} className="flex flex-col items-center group w-full max-w-[80px]">
                <div className="relative w-full flex items-end justify-center h-72">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercentage}%` }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    style={{ backgroundColor: item.color }}
                    className="w-full rounded-t-lg shadow-sm group-hover:brightness-105 transition-all cursor-default relative"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.value} Units
                    </div>
                  </motion.div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-slate-900 font-black text-lg leading-none">{item.value}</p>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1.5">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Analytics