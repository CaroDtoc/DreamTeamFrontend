import { Routes, Route }  from 'react-router-dom';
import PrivateRoute        from './PrivateRoute';

import App                 from './App';
import Login               from './pages/common/connexion/Login';
import AdminDashboard      from './pages/admin/Dashboard';

export default function AppRoutes() {
  return (
    <Routes>

      {/*  Page d'accueil */}
      <Route path="/" element={<App />} />

      {/*  Page login */}
      <Route path="/login" element={<Login />} />

      {/*  Dashboard admin protégé */}
      <Route path="/admin/dashboard" element={
        <PrivateRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </PrivateRoute>
      }/>

    </Routes>
  );
}