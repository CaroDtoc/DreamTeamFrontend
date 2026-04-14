import { useState } from "react";
import "./Dashboard.css";

const stats = [
  {
    id: 1,
    label: "Utilisateurs inscrits",
    value: "1 284",
    delta: "+12% ce mois",
    up: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: "green",
  },
  {
    id: 2,
    label: "Paiements effectués",
    value: "3 540 000 F",
    delta: "+8% ce mois",
    up: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    color: "orange",
  },
  {
    id: 3,
    label: "Tontines en cours",
    value: "27",
    delta: "3 nouvelles",
    up: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    color: "yellow",
  },
  {
    id: 4,
    label: "Sanctions",
    value: "48",
    delta: "12 non payées",
    up: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    color: "red",
  },
];

const sanctions = [
  { id: 1, membre: "Kouamé Yao", montant: "5 000 F", motif: "Retard cotisation", statut: "payée" },
  { id: 2, membre: "Adjoua Bamba", montant: "3 500 F", motif: "Absence réunion", statut: "non payée" },
  { id: 3, membre: "Koffi Mensah", montant: "7 000 F", motif: "Retard cotisation", statut: "payée" },
  { id: 4, membre: "Awa Traoré", montant: "2 500 F", motif: "Absence réunion", statut: "non payée" },
  { id: 5, membre: "Seydou Diallo", montant: "5 000 F", motif: "Retard cotisation", statut: "en attente" },
  { id: 6, membre: "Fatou Coulibaly", montant: "4 000 F", motif: "Retard cotisation", statut: "payée" },
];

const navLinks = [
  {
    label: "Membres",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: "Tontine",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    label: "Paiement",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
  {
    label: "Sanction",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
];

export default function Dashboard() {
  const [active, setActive] = useState("Membres");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="dash-root">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-left">
          <button className="burger" onClick={() => setSidebarOpen(o => !o)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div className="navbar-brand">
            <span className="brand-icon"></span>
            <span className="brand-name">TontineAdmin</span>
          </div>
        </div>
        <div className="navbar-right">
          <div className="notif-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className="notif-dot"></span>
          </div>
          <div className="admin-avatar">
            <span>AD</span>
          </div>
          <div className="admin-info">
            <span className="admin-name">Administrateur</span>
            <span className="admin-role">Super Admin</span>
          </div>
        </div>
      </nav>

      <div className="dash-body">
        {/* SIDEBAR */}
        <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <div className="sidebar-section-title">NAVIGATION</div>
          <ul className="sidebar-menu">
            {navLinks.map((item) => (
              <li
                key={item.label}
                className={`sidebar-item ${active === item.label ? "active" : ""}`}
                onClick={() => setActive(item.label)}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {sidebarOpen && <span className="sidebar-label">{item.label}</span>}
                {active === item.label && <span className="active-bar" />}
              </li>
            ))}
          </ul>
          <div className="sidebar-footer">
            <div className="sidebar-item logout">
              <span className="sidebar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </span>
              {sidebarOpen && <span className="sidebar-label">Déconnexion</span>}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="dash-main">
          <div className="dash-header">
            <div>
              <h1 className="dash-title">Tableau de bord</h1>
              <p className="dash-subtitle">Vue d'ensemble de votre tontine</p>
            </div>
            <div className="dash-date">
              {new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>

          {/* STAT CARDS */}
          <div className="stats-grid">
            {stats.map((s) => (
              <div className={`stat-card stat-${s.color}`} key={s.id}>
                <div className="stat-top">
                  <div className="stat-icon">{s.icon}</div>
                  <span className={`stat-delta ${s.up ? "up" : "down"}`}>
                    {s.up ? "▲" : "▼"} {s.delta}
                  </span>
                </div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* SANCTIONS TABLE */}
          <div className="table-section">
            <div className="table-header">
              <div>
                <h2 className="table-title">Suivi des Sanctions</h2>
                <p className="table-sub">Liste des sanctions et leur statut de paiement</p>
              </div>
              <button className="btn-add">+ Ajouter</button>
            </div>
            <div className="table-wrap">
              <table className="sanction-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Membre</th>
                    <th>Motif</th>
                    <th>Montant</th>
                    <th>Statut</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sanctions.map((s) => (
                    <tr key={s.id}>
                      <td className="td-id">{s.id}</td>
                      <td className="td-membre">
                        <div className="membre-avatar">{s.membre[0]}</div>
                        {s.membre}
                      </td>
                      <td>{s.motif}</td>
                      <td className="td-montant">{s.montant}</td>
                      <td>
                        <span className={`badge-statut statut-${s.statut.replace(" ", "-")}`}>
                          {s.statut === "payée" ? "✓ " : s.statut === "non payée" ? "✕ " : "⏳ "}
                          {s.statut}
                        </span>
                      </td>
                      <td>
                        <button className="btn-voir">Voir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
