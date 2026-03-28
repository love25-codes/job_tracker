import { createContext, useEffect, useState } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {

  const [jobs, setJobs] = useState(() => {
    const storedJobs = localStorage.getItem("jobs");
    return storedJobs ? JSON.parse(storedJobs) : [];
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

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

  return (
    <JobContext.Provider value={{ jobs, addJob }}>
      {children}
    </JobContext.Provider>
  );
};