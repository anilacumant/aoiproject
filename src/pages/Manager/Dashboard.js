import React, { useState } from "react";
import "./Dashboard.css";
import TeamManagement from "./TeamManagement";
import ProjectManagement from "./ProjectManagement";
import LeaveApproval from "./LeaveApproval";
import CertificationRequests from "./CertificationRequests";
import EmployeeFeedback from "./EmployeeFeedback";
import EmployeeCompetencies from "./EmployeeCompetencies";

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Dashboard":
        return <h3 className="dashboard-title">Welcome to the Manager Dashboard</h3>;
      case "TeamManagement":
        return <TeamManagement />;
      case "ProjectManagement":
        return <ProjectManagement />;
      case "LeaveApproval":
        return <LeaveApproval />;
      case "CertificationRequests":
        return <CertificationRequests />;
      case "EmployeeFeedback":
        return <EmployeeFeedback />;
      case "EmployeeCompetencies":
        return <EmployeeCompetencies />;
      default:
        return <h3 className="dashboard-title">Welcome to the Manager Dashboard</h3>;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">Manager Dashboard</header>
      <nav className="dashboard-tabs">
        {[
          "Dashboard",
          "TeamManagement",
          "ProjectManagement",
          "LeaveApproval",
          "CertificationRequests",
          "EmployeeFeedback",
          "EmployeeCompetencies",
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

export default ManagerDashboard;
