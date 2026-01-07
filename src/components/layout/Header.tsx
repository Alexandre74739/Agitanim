import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <h1>Agitanim</h1>

      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/jeux">Projets & Jeux</Link>
        <Link to="/inclusion">Handicap & Inclusion</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {open && (
        <div className="nav-mobile">
          <Link to="/" onClick={() => setOpen(false)}>Accueil</Link>
          <Link to="/jeux" onClick={() => setOpen(false)}>Projets & Jeux</Link>
          <Link to="/inclusion" onClick={() => setOpen(false)}>Handicap & Inclusion</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}

export default Header;