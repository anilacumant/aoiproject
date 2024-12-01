import React, { useState } from "react";
import "./EmployeeDashboard.css";
import SkillTracker from "./SkillTracker";
import ProjectExplorer from "./ProjectExplorer";
import TrainingProgress from "./TrainingProgress";
import Feedback from "./Feedback";
import LeaveManagement from "./LeaveManagement";
import LearningResources from "./LearningResources";

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Dashboard":
        return <h3 className="dashboard-title">Welcome to Your Dashboard</h3>;
      case "SkillTracker":
        return <SkillTracker />;
      case "ProjectExplorer":
        return <ProjectExplorer />;
      case "TrainingProgress":
        return <TrainingProgress />;
      case "Feedback":
        return <Feedback />;
      case "LeaveManagement":
        return <LeaveManagement />;
      case "LearningResources":
        return <LearningResources />;
      default:
        return <h3 className="dashboard-title">Welcome to Your Dashboard</h3>;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">Employee Dashboard</header>
      <nav className="dashboard-tabs">
        {[
          "Dashboard",
          "SkillTracker",
          "ProjectExplorer",
          "TrainingProgress",
          "Feedback",
          "LeaveManagement",
          "LearningResources",
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

export default EmployeeDashboard;
