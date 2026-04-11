import { useState } from "react";
import "./Create.css";

const initialForm = {
  nom:          "",
  prenom:       "",
  telephone:    "",
  quartier:     "",
  email:        "",
  password:     "",
  inscription:  "",
  validation:   "",
  statut:       "",
  fond:         "oui",
};

const Create = () => {
  const [form,   setForm]   = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [toast,  setToast]  = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const selectFond = (value) => {
    setForm((prev) => ({ ...prev, fond: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nom)         newErrors.nom         = "Le nom est obligatoire";
    if (!form.prenom)      newErrors.prenom      = "Le prénom est obligatoire";
    if (!form.telephone)   newErrors.telephone   = "Le téléphone est obligatoire";
    if (!form.quartier)    newErrors.quartier    = "Le quartier est obligatoire";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                           newErrors.email       = "Email invalide";
    if (form.password.length < 6)
                           newErrors.password    = "Minimum 6 caractères";
    if (!form.inscription) newErrors.inscription = "Date obligatoire";
    if (!form.validation)  newErrors.validation  = "Date obligatoire";
    if (!form.statut)      newErrors.statut      = "Le statut est obligatoire";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Données soumises :", form);
    // TODO : appeler memberService.create(form)
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
  };

  return (
    <div className="create-member-root">
      <div className="create-member-card">
        <p className="cm-title">Nouveau membre</p>
        <p className="cm-subtitle">
          Remplissez les informations pour ajouter un membre
        </p>

        <form onSubmit={handleSubmit}>

          {/* Informations personnelles */}
          <p className="cm-divider">Informations personnelles</p>
          <div className="cm-grid">
            <div className={`cm-field ${errors.nom ? "has-error" : ""}`}>
              <label>Nom</label>
              <input type="text" name="nom" placeholder="Ex: Mbarga"
                value={form.nom} onChange={handleChange} />
              {errors.nom && <span className="err">{errors.nom}</span>}
            </div>

            <div className={`cm-field ${errors.prenom ? "has-error" : ""}`}>
              <label>Prénom</label>
              <input type="text" name="prenom" placeholder="Ex: Jean Paul"
                value={form.prenom} onChange={handleChange} />
              {errors.prenom && <span className="err">{errors.prenom}</span>}
            </div>

            <div className={`cm-field ${errors.telephone ? "has-error" : ""}`}>
              <label>Numéro de téléphone</label>
              <input type="tel" name="telephone" placeholder="Ex: 699 000 000"
                value={form.telephone} onChange={handleChange} />
              {errors.telephone && <span className="err">{errors.telephone}</span>}
            </div>

            <div className={`cm-field ${errors.quartier ? "has-error" : ""}`}>
              <label>Quartier</label>
              <input type="text" name="quartier" placeholder="Ex: Bonamoussadi"
                value={form.quartier} onChange={handleChange} />
              {errors.quartier && <span className="err">{errors.quartier}</span>}
            </div>
          </div>

          {/* Informations de connexion */}
          <p className="cm-divider">Informations de connexion</p>
          <div className="cm-grid">
            <div className={`cm-field ${errors.email ? "has-error" : ""}`}>
              <label>Adresse email</label>
              <input type="email" name="email" placeholder="exemple@mail.com"
                value={form.email} onChange={handleChange} />
              {errors.email && <span className="err">{errors.email}</span>}
            </div>

            <div className={`cm-field ${errors.password ? "has-error" : ""}`}>
              <label>Mot de passe</label>
              <input type="password" name="password" placeholder="••••••••"
                value={form.password} onChange={handleChange} />
              {errors.password && <span className="err">{errors.password}</span>}
            </div>
          </div>

          {/* Dates */}
          <p className="cm-divider">Dates</p>
          <div className="cm-grid">
            <div className={`cm-field ${errors.inscription ? "has-error" : ""}`}>
              <label>Date d'inscription</label>
              <input type="date" name="inscription"
                value={form.inscription} onChange={handleChange} />
              {errors.inscription && <span className="err">{errors.inscription}</span>}
            </div>

            <div className={`cm-field ${errors.validation ? "has-error" : ""}`}>
              <label>Date de validation</label>
              <input type="date" name="validation"
                value={form.validation} onChange={handleChange} />
              {errors.validation && <span className="err">{errors.validation}</span>}
            </div>
          </div>

          {/* Statut & Éligibilité */}
          <p className="cm-divider">Statut & Éligibilité</p>
          <div className="cm-grid">
            <div className={`cm-field ${errors.statut ? "has-error" : ""}`}>
              <label>Statut du membre</label>
              <input type="text" name="statut"
                placeholder="Ex: Membre actif, Président..."
                value={form.statut} onChange={handleChange} />
              {errors.statut && <span className="err">{errors.statut}</span>}
            </div>

            <div className="cm-field">
              <label>Fond d'éligibilité</label>
              <div className="fond-row">
                <button type="button"
                  className={`fond-btn ${form.fond === "oui" ? "fond-oui" : ""}`}
                  onClick={() => selectFond("oui")}>
                  Oui
                </button>
                <button type="button"
                  className={`fond-btn ${form.fond === "non" ? "fond-non" : ""}`}
                  onClick={() => selectFond("non")}>
                  Non
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="cm-actions">
            <button type="button" className="btn-cancel" onClick={handleReset}>
              Annuler
            </button>
            <button type="submit" className="btn-submit">
              Enregistrer le membre
            </button>
          </div>

        </form>
      </div>

      {/* Toast */}
      {toast && (
        <div className="cm-toast">Membre enregistré avec succès !</div>
      )}
    </div>
  );
};

export default Create;