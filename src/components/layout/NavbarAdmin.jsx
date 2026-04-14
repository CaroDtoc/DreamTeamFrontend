import { useState }            from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarAdmin             from "./NavbarAdmin";
import Sidebar                 from "./Sidebar";
import Footer                  from "./Footer";
import "../../pages/admin/dashboardadmin/Dashboard.css";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveLabel = () => {
    if (location.pathname.includes("member"))   return "Membres";
    if (location.pathname.includes("tontine"))  return "Tontine";
    if (location.pathname.includes("paiement")) return "Paiement";
    if (location.pathname.includes("sanction")) return "Sanction";
    return "Dashboard";
  };

  const handleNavigate = (path) => navigate(path);
  const handleLogout   = ()     => navigate("/login");

  return (
    <div className="dash-root">
      <NavbarAdmin onToggleSidebar={() => setSidebarOpen(o => !o)} />
      <div className="dash-body">
        <Sidebar
          isOpen={sidebarOpen}
          active={getActiveLabel()}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
        <main className="dash-main">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;