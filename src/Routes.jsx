import { Routes, Route } from 'react-router-dom';

import App            from './App';
import Login          from './pages/common/connexion/Login';
import AdminDashboard from './pages/admin/dashboardadmin/Dashboard';
import CreateTontine from './pages/admin/tontine/Create';
import TontineIndex  from './pages/admin/tontine/Index';



export default function AppRoutes() {
  return (
    <Routes>
      {/* Page d'accueil */}
      <Route path="/"                element={<App />} />

      {/* Page login */}
      <Route path="/login"           element={<Login />} />

      {/* Dashboard admin */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      {/* Dashboard create tontine */}
      <Route path="/admin/tontine/create" element={<CreateTontine />} />
      <Route path="/admin/tontine"        element={<TontineIndex />} />
    

    </Routes>
  );
}