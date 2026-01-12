import { useState } from "react";
import { Link } from "react-router-dom";
import Limitation from "../../assets/limitation.png";
import logo from "../../assets/logo.png";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <img src={Limitation} alt="Limitation" />

      <div className="footer-container">
        <Link to="/">
          <img src={logo} className="logo" alt="Logo" />
        </Link>

        <p>Développé et maintenu par PEREZ Alexandre-Philippe</p>

        <nav className="nav-desktop">
          <Link to="/">Accueil</Link>
          <Link to="/jeux">Projets & Jeux</Link>
          <Link to="/inclusion">Handicap & Inclusion</Link>
          <Link to="/contact" className="btn-contact">
            Contact
          </Link>
        </nav>

        <ul>
            <li>© 2025 Alexandre-Philippe Perez</li>
            <li><Link to="/">Tous droits réservés</Link></li>
            <li><Link to="/">Mentions légales & RGPD</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
