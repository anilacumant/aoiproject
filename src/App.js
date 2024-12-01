import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EntrancePage from './pages/Common/EntrancePage';
import LoginPage from './pages/Common/LoginPage';
import HRDashboard from './pages/HR/Dashboard';
import ManagerDashboard from './pages/Manager/Dashboard';
import EmployeeDashboard from './pages/Employee/Dashboard';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<EntrancePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/hr/*" element={<PrivateRoute role="HR" component={HRDashboard} />} />
        <Route path="/manager/*" element={<PrivateRoute role="Manager" component={ManagerDashboard} />} />
        <Route path="/employee/*" element={<PrivateRoute role="Employee" component={EmployeeDashboard} />} />
      </Routes>
    </div>
  );
}

export default App;
