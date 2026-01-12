import { Link } from "react-router-dom";
import Limitation from "../../assets/limitation.png";
import logo from "../../assets/logo.png";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <img
        src={Limitation}
        className="footer-divider"
        alt=""
        aria-hidden="true"
      />

      <div className="footer-container">
        <Link to="/" className="footer-logo">
          <img src={logo} className="logo" alt="Logo" />
        </Link>

        <nav className="footer-nav">
          <Link to="/">Accueil</Link>
          <Link to="/jeux">Projets & Jeux</Link>
          <Link to="/inclusion">Handicap & Inclusion</Link>
          <Link to="/contact" className="btn-contact">
              Contact
            </Link>
        </nav>

        <div className="footer-info">
          <p>
            Développé et maintenu par <strong>PEREZ Alexandre-Philippe</strong>
          </p>
          <ul className="footer-legal">
            <li>© 2025 Alexandre-Philippe Perez</li>
            <li>
              <Link to="/">Tous droits réservés</Link>
            </li>
            <li>
              <Link to="/">Mentions légales & RGPD</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
