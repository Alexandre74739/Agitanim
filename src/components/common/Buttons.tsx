import { Link } from "react-router-dom";
import "./Buttons.scss";

function Buttons() {
  return (
    <div className="btns">
      <Link to="/jeux" className="primary-btn-link">
        <button className="primary-btn">Projets & Jeux</button>
      </Link>

      <Link to="/inclusion" className="secondary-btn-link">
        <button className="secondary-btn">Handicap & Inclusion</button>
      </Link>
    </div>
  );
}

export default Buttons;