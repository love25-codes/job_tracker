import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"
import { JobProvider } from "./context/JobContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <JobProvider>
        <App />
    </JobProvider>
   
);