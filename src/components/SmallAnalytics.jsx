import React, { useContext, useState } from 'react';
import { JobContext } from '../context/JobContext'; // Adjust path as needed
import { motion } from 'framer-motion';
import { Plus, LayoutDashboard, Briefcase, Send, Users, Award, XCircle } from 'lucide-react';
import { JobFormModal } from './JobFormModal'; // Import the Modal

const SmallAnalytics = () => {
  const { jobs, addJob } = useContext(JobContext);
  
  // Logic for opening/closing the popup
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Logic to calculate totals from your context
  const stats = [
    { label: 'Total Jobs', value: jobs.length, icon: <Briefcase size={20} />, color: 'bg-slate-800' },
    { label: 'Applied', value: jobs.filter(j => j.status?.toLowerCase() === 'applied').length, icon: <Send size={20} />, color: 'bg-orange-400' },
    { label: 'Interviewing', value: jobs.filter(j => j.status?.toLowerCase() === 'interviewing').length, icon: <Users size={20} />, color: 'bg-indigo-700' },
    { label: 'Offers', value: jobs.filter(j => j.status?.toLowerCase() === 'offer').length, icon: <Award size={20} />, color: 'bg-emerald-500' },
    { label: 'Rejected', value: jobs.filter(j => j.status?.toLowerCase() === 'rejected').length, icon: <XCircle size={20} />, color: 'bg-rose-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  const handleFormSubmit = (data) => {
    addJob(data);
    setIsModalOpen(false);
  };

  return (
    <div className=" p-6 lg:p-8 bg-[#fdfdff]">
      {/* Modal Integration */}
      <JobFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleFormSubmit} 
      />

      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-indigo-600" size={24} />
            <h1 className="text-3xl font-extrabold tracking-tight text-black">Command Center</h1>
          </div>
          <p className="text-slate-500 font-medium">Overview of your career trajectory</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsModalOpen(true)} // Logic to open popup
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} strokeWidth={3} />
          <span>Add Application</span>
        </motion.button>
      </header>

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative overflow-hidden bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-lg transition-shadow group"
          >
            {/* Subtle background accent */}
            <div className={`absolute top-0 right-0 w-20 h-19 -mr-5 -mt-8 opacity-6 rounded-full ${stat.color} group-hover:scale-180 transition-transform duration-300`} />
            
            <div className="flex flex-col gap-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-3xl font-bold text-black">{stat.value}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SmallAnalytics;