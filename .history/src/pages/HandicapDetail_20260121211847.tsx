import { useParams, Link } from "react-router-dom";
import { HANDICAP_DATA } from "./HandicapDat"; // Import de tes textes
import "./HandicapDetail.scss";

function HandicapDetail() {
  // 1. On récupère le mot dans l'URL (ex: 'tdah' ou 'trisomie')
  const { slug } = useParams<{ slug: string }>();

  // 2. On récupère les données correspondantes
  const data = HANDICAP_DATA[slug as keyof typeof HANDICAP_DATA];

  // 3. Sécurité si l'URL ne correspond à rien
  if (!data) {
    return <div className="error">Contenu introuvable</div>;
  }

  return (
    <div className="handicap-detail-page">
      <section className="hero-detail">
        <div className="container">
          <h1>{data.title}</h1>
          <p className="subtitle">{data.subtitle}</p>
        </div>
      </section>

      <section className="content-detail">
        <div className="container">
          <div className="info-card">
            <h2>Description</h2>
            <p>{data.description}</p>
          </div>

          <div className="info-card highlight">
            <h2>Comment l'inclure ?</h2>
            <p>{data.inclusion}</p>
          </div>

          <div className="actions">
            <a href={data.pdfUrl} download className="btn-primary">
               Télécharger la fiche explicative
            </a>
            <Link to="/jeux" className="btn-secondary">
               Découvrir les jeux associés
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HandicapDetail;