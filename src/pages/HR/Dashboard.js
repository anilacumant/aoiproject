import React, { useState } from "react";
import "./HRDashboard.css";
import EmployeeList from "./EmployeeList";
import LeaveRequests from "./LeaveRequests";
import Competencies from "./Competencies";
import TrainingAnalytics from "./TrainingAnalytics";
import FeedbackAnalysis from "./FeedbackAnalysis";
import CertificationOverview from "./CertificationOverview"; // Import the new component

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Dashboard":
        return <h3 className="dashboard-title">Welcome to the HR Dashboard</h3>;
      case "EmployeeList":
        return <EmployeeList />;
      case "LeaveRequests":
        return <LeaveRequests />;
      case "Competencies":
        return <Competencies />;
      // case "TrainingAnalytics":
      //   return <TrainingAnalytics />;
      case "FeedbackAnalysis":
        return <FeedbackAnalysis />;
      case "CertificationOverview": // Add new case for Certification Overview
        return <CertificationOverview />;
      default:
        return <h3 className="dashboard-title">Welcome to the HR Dashboard</h3>;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">HR Dashboard</header>
      <nav className="dashboard-tabs">
        {[
          "Dashboard",
          "EmployeeList",
          "LeaveRequests",
          "Competencies",
          "FeedbackAnalysis",
          "CertificationOverview", // Add CertificationOverview to tabs
        ].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.replace(/([A-Z])/g, " $1")} {/* Format as readable titles */}
          </button>
        ))}
      </nav>
      <div className="tab-content">{renderActiveTab()}</div>
    </div>
  );
};

export default HRDashboard;
