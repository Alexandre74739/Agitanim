import "./CardInclusion.scss";
import Brain from "../../assets/brain.png";
import TSA from "../../assets/TSA.png";
import Malvoyant from "../../assets/malvoyant.png";
import Paraplegie from "../../assets/paraplegie.png";
import Puzzle from "../../assets/puzzle.png";

const cardsData = [
  { id: 1, title: "TDAH", icon: Puzzle, pdfName: "tdah.pdf" },
  { id: 2, title: "Paraplégie", icon: Paraplegie, pdfName: "paraplegie.pdf" },
  { id: 3, title: "Malvoyant", icon: Malvoyant, pdfName: "tsa.pdf" },
  { id: 4, title: "Trisomie", icon: TSA, pdfName: "trisomie.pdf" },
  { id: 5, title: "Trouble TSA", icon: Brain, pdfName: "tsa_brain.pdf" },
];

function CardInclusion() {
    const handleOpenPdf = (url: string) => {
        window.open(url, "_blank", "noreferrer");
    };

    return (
        <div className="cards-grid">
            {cardsData.map((card) => (
                <div key={card.id} className="card-inclusion" onClick={() => handleOpenPdf(card.pdfUrl)}>
                    <div className="icon-container">
                        <img src={card.icon} alt={card.title} />
                    </div>
                    <div className="card-content">
                        <p className="author">PEREZ Alexandre-Philippe</p>
                        <h3 className="card-title">{card.title}</h3>
                        <button>Voir Plus</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardInclusion;