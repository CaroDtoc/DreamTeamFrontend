import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/admin/dashboard"); // ✅ d minuscule
    }, 1400);
  };

  return (
    <div className="login-root">
      <div className="card">
        <h1>DreamTeam</h1>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Adresse email</label>
            <div className="input-wrap">
              <input
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label>Mot de passe</label>
            <div className="input-wrap">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              <a className="forgot">Se souvenir de moi ?</a>
            </label>
            <a className="forgot">Mot de passe oublié ?</a>
          </div>

          <button className="btn-login" type="submit" disabled={loading}>
            {loading ? "Connexion en cours..." : "Connexion"}
          </button>
        </form>

        <div className="divider">ou</div>

        <div className="signup-row">
          Pas encore de compte ?{" "}
          <a className="signup-link">Créer un compte</a>
        </div>
      </div>
    </div>
  );
}

export default Login;