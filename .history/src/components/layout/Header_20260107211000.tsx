import { useState } from 'react';
import { Link } from 'react-router-dom'; // 1. Import indispensable

function Header() {
  const [open, setOpen] = useState(false);

  // Fonction pour fermer le menu mobile
  const closeMenu = () => setOpen(false);

  return (
    <header className="header">
      <div className="header-container">
        <h1>Agitanim</h1>

        {/* 2. Bouton "Burger" pour le mobile */}
        <button 
          className="menu-toggle" 
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir le menu"
        >
          {open ? '✖' : '☰'}
        </button>

        {/* Navigation Bureau */}
        <nav className="nav-desktop">
          <Link to="/">Accueil</Link>
          <Link to="/jeux">Projets & Jeux</Link>
          <Link to="/inclusion">Handicap & Inclusion</Link>
          <Link to="/contact" className="btn-contact">Contact</Link>
        </nav>
      </div>

      {/* Navigation Mobile */}
      {open && (
        <div className="nav-mobile">
          <Link to="/" onClick={closeMenu}>Accueil</Link>
          <Link to="/jeux" onClick={closeMenu}>Projets & Jeux</Link>
          <Link to="/inclusion" onClick={closeMenu}>Handicap & Inclusion</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
        </div>
      )}
    </header>
  );
}

export default Header;