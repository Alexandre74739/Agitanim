import Buttons from "../common/Buttons";
import { Link } from "react-router-dom";
import contact from "../../assets/icon-contact.png";
import fleches from "../../assets/icon-fleche-double.png";
import handicap from "../../assets/icon-handicap.png";
import form1 from "../../assets/forme1.png";
import form2 from "../../assets/forme2.png";
import "./Hero.scss";

// Définition des types pour les props
interface HeroProps {
  title: string;
  description: string;
  showIcons?: boolean;
  showButtons?: boolean;
}

function Hero({
  title,
  description,
  showIcons = true,
  showButtons = true,
}: HeroProps) {
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("map");
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <h1>{title}</h1>
        <p>{description}</p>
        {showButtons && <Buttons />}
      </div>

      {showIcons && (
        <div className="icons">
          <Link to="/contact" className="icon-contact">
            <img src={contact} alt="Contact" />
          </Link>

          <Link to="/inclusion" className="icon-handicap">
            <img src={handicap} alt="Handicap" />
          </Link>

          <a className="icon-scroll" onClick={handleScroll}>
            <img src={fleches} alt="Scroll" />
          </a>
        </div>
      )}

      <div className="forms">
        <img src={form1} className="form1" alt="form" />
        <img src={form2} className="form2" alt="form" />
      </div>
    </section>
  );
}

export default Hero;
