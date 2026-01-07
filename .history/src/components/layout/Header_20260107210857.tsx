import { useState } from "react";
import { Link } from "react-router-dom";
import burgerIcon from "../../assets/menu-de-hamburger.png";
import "./Header.scss";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <p className="logo">Agitanim</p>

        <div className="header-left">
          <nav className="nav-desktop">
            <Link to="/">Accueil</Link>
            <Link to="/jeux">Projets & Jeux</Link>
            <Link to="/inclusion">Handicap & Inclusion</Link>
            <Link to="/contact" className="btn-contact">
              Contact
            </Link>
          </nav>

          <button 
          className="burger-button" onClick={() => setOpen(!open)}>
            <img src={burgerIcon} alt="Menu" />
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-mobile">
          <Link to="/" onClick={() => setOpen(false)}>
            Accueil
          </Link>
          <Link to="/jeux" onClick={() => setOpen(false)}>
            Projets & Jeux
          </Link>
          <Link to="/inclusion" onClick={() => setOpen(false)}>
            Handicap & Inclusion
          </Link>
          <Link to="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
