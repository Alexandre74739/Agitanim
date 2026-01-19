import "./CardInclusion.scss";
import Brain from "../../assets/brain.png";
import TSA from "../../assets/TSA.png";
import Limitation from "../../assets/limitation.png";
import Paraplegie from "../../assets/paraplegie.png";
import Puzzle from "../../assets/puzzle.png";

const cardsData = [
    { id: 1, title: "TDAH", icon: Puzzle, pdfName: "tdah.pdf" },
    { id: 2, title: "Paraplégie", icon: Paraplegie, pdfName: "paraplegie.pdf" },
    { id: 3, title: "Trouble TSA", icon: Limitation, pdfName: "tsa.pdf" },
    { id: 4, title: "Trisomie", icon: TSA, pdfName: "trisomie.pdf" },
    { id: 5, title: "Trouble TSA", icon: Brain, pdfName: "tsa_brain.pdf" },
];

function CardInclusion() {
    const SUPABASE_URL = "https://votre-projet.supabase.co/storage/v1/object/public/pdfs/";

    return (
        <section className="inclusion-section">
            <div className="container">
                <h2 className="section-title">J’ai besoin d’en savoir plus sur...</h2>
                
                <div className="cards-grid">
                    {cardsData.map((card) => (
                        <article 
                            key={card.id} 
                            className="card-inclusion"
                            onClick={() => window.open(`${SUPABASE_URL}${card.pdfName}`, '_blank')}
                        >
                            <div className="icon-wrapper">
                                <img src={card.icon} alt="" aria-hidden="true" />
                            </div>
                            
                            <div className="card-content">
                                <header>
                                    <p className="author-tag">PEREZ Alexandre-Philippe</p>
                                    <h3 className="card-title">{card.title}</h3>
                                </header>
                                
                                <div className="footer-action">
                                    <span className="btn-fake">Voir Plus</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}