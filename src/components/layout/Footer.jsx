const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© {year} DreamTeam — Tous droits réservés</p>
    </footer>
  );
};

export default Footer;