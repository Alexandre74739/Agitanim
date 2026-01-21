import { Link } from "react-router-dom";
import "./CardInclusion.scss";
import Brain from "../../assets/brain.png";
import TSA from "../../assets/TSA.png";
import Malvoyant from "../../assets/malvoyant.png";
import Paraplegie from "../../assets/paraplegie.png";
import Puzzle from "../../assets/puzzle.png";

const cardsData = [
  { id: 1, title: "TDAH", icon: Puzzle, slug: "tdah" },
  { id: 2, title: "Paraplégie", icon: Paraplegie, slug: "paraplegie" },
  { id: 3, title: "Malvoyant", icon: Malvoyant, slug: "malvoyant" },
  { id: 4, title: "Trisomie", icon: TSA, slug: "trisomie" },
  { id: 5, title: "Trouble TSA", icon: Brain, slug: "tsa" },
];

function CardInclusion() {
  return (
    <div className="cards-grid">
      {cardsData.map((card) => (
        /* Le Link doit être à l'intérieur du map pour être unique à chaque carte */
        <Link 
          to={`/inclusion/${card.slug}`} 
          key={card.id} 
          className="card-link"
          onClick={() => window.scrollTo(0, 0)}
        >
          <div className="card-inclusion">
            <div className="icon-container">
              <img src={card.icon} alt={card.title} />
            </div>
            <div className="card-content">
              <p className="author">PEREZ Alexandre-Philippe</p>
              <h3 className="card-title">{card.title}</h3>
              <button className="view-more">Voir Plus</button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CardInclusion;