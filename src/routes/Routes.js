import { Routes, Route } from 'react-router-dom';
import EntrancePage from '../pages/Common/EntrancePage';
import LoginPage from '../pages/Common/LoginPage';
import HRDashboard from '../pages/HR/Dashboard';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<EntrancePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/hr/dashboard" element={<HRDashboard />} />
  </Routes>
);

export default AppRoutes;
