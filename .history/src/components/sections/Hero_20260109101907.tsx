import Buttons from "../common/Buttons";
import { Link } from "react-router-dom";
import contact from "../../assets/icon-contact.png";
import fleches from "../../assets/icon-fleche-double.png";
import handicap from "../../assets/icon-handicap.png";
import form1 from "../../assets/forme1.png";
import form2 from "../../assets/forme2.png";
import "./Hero.scss";

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <h1>Découvrez le métier de l'animation</h1>
        <p>
          Le métier d’animateur va bien au-delà de l’enchaînement d’activités. Il
          joue un rôle essentiel dans le développement, l’épanouissement et
          l’inclusion des enfants, en s’appuyant au quotidien sur l’écoute,
          l’adaptation et la créativité.
        </p>
        <Buttons />
      </div>

      <div className="icons">
        <Link to="/contact" className="icon-contact">
          <img src={contact} alt="Contact" />
        </Link>

        <Link to="/inclusion" className="icon-handicap">
          <img src={handicap} alt="Handicap" />
        </Link>

        <a href="#prochaine-section" className="icon-scroll">
          <img src={fleches} alt="Scroll" />
        </a>
      </div>

      <div className="forms">
      <img src={form1} className="form1" alt="form" />
      <img src={form2} className="form2" alt="form" />
      </div>
    </section>
    
  );
}

export default Hero;