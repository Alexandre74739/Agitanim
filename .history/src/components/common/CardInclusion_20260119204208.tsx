import "./CardInclusion.scss";
import Brain from "../../assets/brain.png";
import TSA from "../../assets/TSA.png";
import Limitation from "../../assets/limitation.png";
import Paraplegie from "../../assets/pa.png";
import Limitation from "../../assets/limitation.png";

const cardsData = [
    { id: 1, title: "TDAH", icon: "/assets/icons/tdah.png", pdfUrl: "https://votre-url-supabase/tdah.pdf" },
    { id: 2, title: "Paraplégie", icon: "/assets/icons/para.png", pdfUrl: "https://votre-url-supabase/para.pdf" },
    { id: 3, title: "Trouble TSA", icon: "/assets/icons/tsa.png", pdfUrl: "https://votre-url-supabase/tsa.pdf" },
    { id: 4, title: "Trisomie", icon: "/assets/icons/trisomie.png", pdfUrl: "https://votre-url-supabase/trisomie.pdf" },
    { id: 5, title: "Trouble TSA", icon: {Brain}, pdfUrl: "https://votre-url-supabase/tsa2.pdf" },
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
                        <button className="btn-voir-plus">Voir Plus</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardInclusion;