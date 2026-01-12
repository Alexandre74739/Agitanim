import { useState } from "react";
import { Link } from "react-router-dom";
import burgerIcon from "../../assets/menu-de-hamburger.png";
import logo from "../../assets/logo.png";
import "./Header.scss";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" onClick={() => setOpen(false)}>
          <img src={logo} className="logo" alt="Logo" />
        </Link>

        <div className="header-left">
          <nav className="nav-desktop">
            <Link to="/" onClick={() => window.scrollTo({ top: 0 })}>
              Accueil
            </Link>
            <Link to="/jeux" onClick={() => window.scrollTo({ top: 0 })}>
              Projets & Jeux
            </Link>
            <Link to="/inclusion" onClick={() => window.scrollTo({ top: 0 })}>
              Handicap & Inclusion
            </Link>
            <Link
              to="/contact"
              className="btn-contact"
              onClick={() => window.scrollTo({ top: 0 })}
            >
              Contact
            </Link>
          </nav>

          <button className="burger-button" onClick={() => setOpen(!open)}>
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
