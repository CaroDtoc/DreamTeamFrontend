import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../components/layout/AdminLayout";
import "./Create.css";

const tontinesData = [
  { id: 1, nom: "Tontine des amis", periode: "Mensuel", dateDebut: "01/01/2025", dateFin: "31/12/2025", dateButoir: "05 de chaque mois", sanctionNonBeneficiee: "5 000 FCFA", regleSanction: "Pénalité fixe", etat: "active", blocage: true },
  { id: 2, nom: "Tontine famille",  periode: "Hebdomadaire", dateDebut: "15/02/2025", dateFin: "15/02/2026", dateButoir: "20 de chaque sem.", sanctionNonBeneficiee: "3 500 FCFA", regleSanction: "Pénalité fixe", etat: "suspendue", blocage: false },
  { id: 3, nom: "Tontine bureau",   periode: "Trimestriel", dateDebut: "01/03/2025", dateFin: "01/03/2026", dateButoir: "10 de chaque trim.", sanctionNonBeneficiee: "7 000 FCFA", regleSanction: "Pénalité variable", etat: "active", blocage: true },
  { id: 4, nom: "Tontine quartier", periode: "Mensuel", dateDebut: "10/04/2025", dateFin: "10/04/2026", dateButoir: "15 de chaque mois", sanctionNonBeneficiee: "2 000 FCFA", regleSanction: "Pénalité fixe", etat: "inactive", blocage: false },
];

const Index = () => {
  const [tontines,       setTontines]       = useState(tontinesData);
  const [search,         setSearch]         = useState("");
  const [selectedTontine, setSelectedTontine] = useState(null);
  const navigate = useNavigate();

  const filtered = tontines.filter(t =>
    t.nom.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette tontine ?")) {
      setTontines(prev => prev.filter(t => t.id !== id));
    }
  };

  const getBadgeClass = (etat) => {
    switch (etat) {
      case "active":    return "badge badge-active";
      case "inactive":  return "badge badge-inactive";
      case "suspendue": return "badge badge-suspend";
      default:          return "badge";
    }
  };

  return (
    <AdminLayout>
      <div className="tontine-index">

        {/* Header */}
        <div className="ti-header">
          <div>
            <h2 className="ti-title">Liste des tontines</h2>
            <p className="ti-subtitle">Gestion et suivi de toutes les tontines en cours</p>
          </div>
          <button className="btn-add" onClick={() => navigate("/admin/tontine/create")}>
            + Nouvelle tontine
          </button>
        </div>

        {/* Tableau */}
        <div className="ti-card">
          <div className="ti-search">
            <input
              type="text"
              placeholder="Rechercher une tontine..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="ti-table-wrap">
            <table className="ti-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nom</th>
                  <th>Période</th>
                  <th>Date début</th>
                  <th>Date fin</th>
                  <th>Date butoir</th>
                  <th>État</th>
                  <th>Blocage</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="ti-empty">Aucune tontine trouvée</td>
                  </tr>
                ) : (
                  filtered.map((t, index) => (
                    <tr key={t.id}>
                      <td className="ti-id">{String(index + 1).padStart(2, "0")}</td>
                      <td className="ti-nom">{t.nom}</td>
                      <td>{t.periode}</td>
                      <td>{t.dateDebut}</td>
                      <td>{t.dateFin}</td>
                      <td>{t.dateButoir}</td>
                      <td><span className={getBadgeClass(t.etat)}>{t.etat}</span></td>
                      <td>
                        <span className={t.blocage ? "badge badge-active" : "badge badge-inactive"}>
                          {t.blocage ? "Oui" : "Non"}
                        </span>
                      </td>
                      <td>
                        <div className="ti-actions">
                          <button className="btn-detail" onClick={() => setSelectedTontine(t)}>
                            Détails
                          </button>
                          <button className="btn-del" onClick={() => handleDelete(t.id)}>
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="ti-footer">
            <span>{filtered.length} tontine{filtered.length > 1 ? "s" : ""}</span>
            <span>Page 1 sur 1</span>
          </div>
        </div>

        {/* Modal Détails */}
        {selectedTontine && (
          <div className="ti-modal-overlay" onClick={() => setSelectedTontine(null)}>
            <div className="ti-modal" onClick={e => e.stopPropagation()}>
              <h3 className="ti-modal-title">{selectedTontine.nom}</h3>
              <div className="ti-modal-rows">
                <div className="ti-modal-row"><span>Nom</span><span>{selectedTontine.nom}</span></div>
                <div className="ti-modal-row"><span>Période</span><span>{selectedTontine.periode}</span></div>
                <div className="ti-modal-row"><span>Date début</span><span>{selectedTontine.dateDebut}</span></div>
                <div className="ti-modal-row"><span>Date fin</span><span>{selectedTontine.dateFin}</span></div>
                <div className="ti-modal-row"><span>Date butoir</span><span>{selectedTontine.dateButoir}</span></div>
                <div className="ti-modal-row"><span>Sanction</span><span>{selectedTontine.sanctionNonBeneficiee}</span></div>
                <div className="ti-modal-row"><span>Règle</span><span>{selectedTontine.regleSanction}</span></div>
                <div className="ti-modal-row"><span>État</span><span>{selectedTontine.etat}</span></div>
                <div className="ti-modal-row"><span>Blocage</span><span>{selectedTontine.blocage ? "Oui" : "Non"}</span></div>
              </div>
              <button className="btn-close-modal" onClick={() => setSelectedTontine(null)}>
                Fermer
              </button>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default Index;