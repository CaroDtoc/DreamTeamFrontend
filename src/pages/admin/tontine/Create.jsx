import { useState } from "react";
import "./Create.css";

const steps = ["Informations générales", "Dates", "Règles & Sanctions"];

const initialForm = {
  nom: "",
  periode: "",
  dateDebut: "",
  dateFin: "",
  dateButoir: "",
  sanctionNonBeneficiee: "",
  regleSanction: "",
  etat: "active",
  blocageApresCotisation: false,
};

const Create = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm]               = useState(initialForm);
  const [errors, setErrors]           = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validation par étape
  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 0) {
      if (!form.nom)     newErrors.nom     = "Le nom est obligatoire.";
      if (!form.periode) newErrors.periode = "La période est obligatoire.";
    }

    if (currentStep === 1) {
      if (!form.dateDebut)  newErrors.dateDebut  = "La date de début est obligatoire.";
      if (!form.dateFin)    newErrors.dateFin    = "La date de fin est obligatoire.";
      if (!form.dateButoir) newErrors.dateButoir = "La date butoir est obligatoire.";
      if (form.dateDebut && form.dateFin && form.dateDebut > form.dateFin)
        newErrors.dateFin = "La date de fin doit être après la date de début.";
    }

    if (currentStep === 2) {
      if (!form.sanctionNonBeneficiee) newErrors.sanctionNonBeneficiee = "Ce champ est obligatoire.";
      if (!form.regleSanction)         newErrors.regleSanction         = "Ce champ est obligatoire.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Données soumises :", form);
      // TODO : appeler tontineService.create(form)
    }
  };

  return (
    <div className="add-tontine-root">
      <div className="add-tontine-card">
        <h2 className="add-tontine-title">Nouvelle Tontine</h2>

        {/* Stepper */}
        <div className="stepper">
          {steps.map((step, index) => (
            <div key={index} className={`step ${index === currentStep ? "active" : ""} ${index < currentStep ? "done" : ""}`}>
              <div className="step-circle">{index < currentStep ? "✓" : index + 1}</div>
              <span className="step-label">{step}</span>
              {index < steps.length - 1 && <div className="step-line" />}
            </div>
          ))}
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>

          {/* Étape 1 — Informations générales */}
          {currentStep === 0 && (
            <div className="step-content">
              <div className="field">
                <label>Nom de la tontine</label>
                <input
                  type="text"
                  name="nom"
                  placeholder="Ex: Tontine des amis"
                  value={form.nom}
                  onChange={handleChange}
                />
                {errors.nom && <span className="error">{errors.nom}</span>}
              </div>

              <div className="field">
                <label>Période</label>
                <select name="periode" value={form.periode} onChange={handleChange}>
                  <option value="">-- Sélectionner --</option>
                  <option value="hebdomadaire">Hebdomadaire</option>
                  <option value="mensuel">Mensuel</option>
                  <option value="trimestriel">Trimestriel</option>
                  <option value="annuel">Annuel</option>
                </select>
                {errors.periode && <span className="error">{errors.periode}</span>}
              </div>
            </div>
          )}

          {/* Étape 2 — Dates */}
          {currentStep === 1 && (
            <div className="step-content">
              <div className="field">
                <label>Date de début</label>
                <input
                  type="date"
                  name="dateDebut"
                  value={form.dateDebut}
                  onChange={handleChange}
                />
                {errors.dateDebut && <span className="error">{errors.dateDebut}</span>}
              </div>

              <div className="field">
                <label>Date de fin</label>
                <input
                  type="date"
                  name="dateFin"
                  value={form.dateFin}
                  onChange={handleChange}
                />
                {errors.dateFin && <span className="error">{errors.dateFin}</span>}
              </div>

              <div className="field">
                <label>Date butoir de cotisation</label>
                <input
                  type="date"
                  name="dateButoir"
                  value={form.dateButoir}
                  onChange={handleChange}
                />
                {errors.dateButoir && <span className="error">{errors.dateButoir}</span>}
              </div>
            </div>
          )}

          {/* Étape 3 — Règles & Sanctions */}
          {currentStep === 2 && (
            <div className="step-content">
              <div className="field">
                <label>Sanction non bénéficiée</label>
                <input
                  type="text"
                  name="sanctionNonBeneficiee"
                  placeholder="Ex: 5000 FCFA"
                  value={form.sanctionNonBeneficiee}
                  onChange={handleChange}
                />
                {errors.sanctionNonBeneficiee && <span className="error">{errors.sanctionNonBeneficiee}</span>}
              </div>

              <div className="field">
                <label>Règle de sanction</label>
                <textarea
                  name="regleSanction"
                  placeholder="Décrivez la règle de sanction..."
                  value={form.regleSanction}
                  onChange={handleChange}
                  rows={3}
                />
                {errors.regleSanction && <span className="error">{errors.regleSanction}</span>}
              </div>

              <div className="field">
                <label>État de la tontine</label>
                <select name="etat" value={form.etat} onChange={handleChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspendue">Suspendue</option>
                </select>
              </div>

              <div className="field checkbox-field">
                <input
                  type="checkbox"
                  name="blocageApresCotisation"
                  id="blocage"
                  checked={form.blocageApresCotisation}
                  onChange={handleChange}
                />
                <label htmlFor="blocage">Blocage après cotisation</label>
              </div>
            </div>
          )}

          {/* Boutons navigation */}
          <div className="step-actions">
            {currentStep > 0 && (
              <button type="button" className="btn-prev" onClick={handlePrev}>
                ← Précédent
              </button>
            )}
            {currentStep < steps.length - 1 && (
              <button type="button" className="btn-next" onClick={handleNext}>
                Suivant →
              </button>
            )}
            {currentStep === steps.length - 1 && (
              <button type="submit" className="btn-submit">
                 Enregistrer
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default Create;