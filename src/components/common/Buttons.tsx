import { Link } from "react-router-dom";
import "./Buttons.scss";

function Buttons() {
  return (
    <div className="btns">
      <Link
        to="/jeux"
        className="primary-btn-link"
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <button className="primary-btn">Projets & Jeux</button>
      </Link>

      <Link
        to="/inclusion"
        className="secondary-btn-link"
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <button className="secondary-btn">Handicap & Inclusion</button>
      </Link>
    </div>
  );
}

export default Buttons;