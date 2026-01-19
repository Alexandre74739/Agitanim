import "./CardInclusion.scss";
import Brain from "../../assets/brain.png";
import TSA from "../../assets/TSA.png";
import Limitation from "../../assets/limitation.png";
import Paraplegie from "../../assets/paraplegie.png";
import Puzzle from "../../assets/puzzle.png";

const cardsData = [
    { id: 1, title: "TDAH", icon: Puzzle, pdf: "tdah.pdf" },
    { id: 2, title: "Paraplégie", icon: Paraplegie, pdf: "paraplegie.pdf" },
    { id: 3, title: "Trouble TSA", icon: Limitation, pdf: "tsa.pdf" },
    { id: 4, title: "Trisomie", icon: TSA, pdf: "trisomie.pdf" },
    { id: 5, title: "Trouble TSA", icon: Brain, pdf: "tsa2.pdf" },
];

const ListeHandicap = () => {
    const SUPABASE_URL = "https://votre-projet.supabase.co/storage/v1/object/public/pdfs/";

    return (
        <section className="liste-handicap">
            <div className="cards-grid">
                {cardsData.map((card) => (
                    <div key={card.id} className="card-inclusion">
                        <div className="card-top">
                            <img src={card.icon} alt={card.title} className="card-icon" />
                        </div>
                        <div className="card-bottom">
                            <p className="card-author">PEREZ Alexandre-Philippe</p>
                            <h3 className="card-title">{card.title}</h3>
                            <button 
                                className="btn-voir-plus"
                                onClick={() => window.open(`${SUPABASE_URL}${card.pdf}`, "_blank")}
                            >
                                Voir Plus
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ListeHandicap;