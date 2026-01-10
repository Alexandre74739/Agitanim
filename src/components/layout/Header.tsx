import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import burgerIcon from "../../assets/menu-de-hamburger.png";
import logo from "../../assets/logo.png";
import "./Header.scss";

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = (to: string) => {
    setOpen(false);

    if (location.pathname === to) {
      window.scrollTo({
        top: 0,
      });
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" onClick={() => handleLinkClick("/")}>
          <img src={logo} className="logo" alt="Logo" />
        </Link>

        <div className="header-left">
          <nav className="nav-desktop">
            <Link to="/" onClick={() => handleLinkClick("/")}>
              Accueil
            </Link>
            <Link to="/jeux" onClick={() => handleLinkClick("/jeux")}>
              Projets & Jeux
            </Link>
            <Link to="/inclusion" onClick={() => handleLinkClick("/inclusion")}>
              Handicap & Inclusion
            </Link>
            <Link
              to="/contact"
              className="btn-contact"
              onClick={() => handleLinkClick("/contact")}
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
          <Link to="/" onClick={() => handleLinkClick("/")}>
            Accueil
          </Link>
          <Link to="/jeux" onClick={() => handleLinkClick("/jeux")}>
            Projets & Jeux
          </Link>
          <Link to="/inclusion" onClick={() => handleLinkClick("/inclusion")}>
            Handicap & Inclusion
          </Link>
          <Link to="/contact" onClick={() => handleLinkClick("/contact")}>
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
