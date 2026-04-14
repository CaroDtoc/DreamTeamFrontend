import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const App = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Affiche le message après 1 seconde
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    // Redirige vers login après 3 secondes
    const redirectTimer = setTimeout(() => {
    navigate("/login");
    }, 3000);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="welcome-root">
      {showMessage && (
        <h1 className="welcome-title">Bienvenue dans DreamTeam</h1>
      )}
    </div>
  );
};

export default App;