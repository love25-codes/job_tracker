// JobContext.js - The Engine
import { createContext, useEffect, useState } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  // --- STATE 1: MAIN TRACKER JOBS ---
  const [jobs, setJobs] = useState(() => {
    const storedJobs = localStorage.getItem("jobs");
    return storedJobs ? JSON.parse(storedJobs) : [];
  });

  // --- STATE 2: SAVED (BOOKMARKED) JOBS ---
  const [savedJobs, setSavedJobs] = useState(() => {
    const storedSavedJobs = localStorage.getItem("savedJobs");
    return storedSavedJobs ? JSON.parse(storedSavedJobs) : [];
  });

  // --- PERSISTENCE (Local Storage Sync) ---
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  // --- ACTIONS 1: TRACKER ---
  const addJob = (jobData) => {
    const newJob = {
      id: Date.now(), 
      companyName: jobData.companyName,
      jobTitle: jobData.jobTitle,
      location: jobData.location,
      locationType: jobData.locationType, // remote / onsite / hybrid
      status: jobData.status, // applied, interviewing, offer, rejected
      salaryRange: jobData.salaryRange,
      appliedDate: jobData.appliedDate,
      notes: jobData.notes,
      createdAt: new Date().toISOString(),
    };
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  // JobContext.js

const deleteJob = (id) => {
  setJobs((prev) => prev.filter(job => job.id !== id));
  setSavedJobs((prev) => prev.filter(job => job.id !== id));
};

  const updateJob = (id, updatedData) => {
    setJobs((prev) => prev.map(job => job.id === id ? { ...job, ...updatedData } : job));
  };

  // --- ACTIONS 2: BOOKMARKS ---
  const bookmarkJob = (job) => {
    // Prevent duplicates
    if (!savedJobs.some(sj => sj.id === job.id)) {
      setSavedJobs((prev) => [...prev, job]);
    }
  };

  const removeBookmark = (id) => {
    setSavedJobs((prev) => prev.filter(job => job.id !== id));
  };

  return (
    <JobContext.Provider value={{ 
      jobs, addJob, deleteJob, updateJob, 
      savedJobs, bookmarkJob, removeBookmark // Add new values here
    }}>
      {children}
    </JobContext.Provider>
  );
};