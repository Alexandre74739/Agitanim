import { Link } from "react-router-dom";
import "./HandicapDetail.scss";
// Importe une image d'illustration (ex: moteur.png)
import illustration from "../../src../"; 

function HandicapDetail() {
  return (
    <div className="handicap-detail">
      {/* Hero Section */}
      <header className="detail-hero">
        <div className="container">
          <div className="hero-content">
            <span className="label">Comprendre & Inclure</span>
            <h1>Le Handicap Moteur</h1>
            <p>
              Mieux comprendre les défis de la mobilité pour construire un 
              environnement accessible et bienveillant pour tous.
            </p>
            <div className="hero-actions">
              <a href="/fiches/fiche-handicap-moteur.pdf" download className="btn-primary">
                Télécharger la fiche PDF
              </a>
              <Link to="/jeux" className="btn-secondary">
                Voir les jeux inclusifs
              </Link>
            </div>
          </div>
          <div className="hero-image">
             <img src={illustration} alt="Illustration handicap" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="detail-body">
        <div className="container">
          
          <article className="content-section">
            <h2>Qu'est-ce que c'est ?</h2>
            <p>
              Le handicap moteur désigne une limitation de la capacité du corps à se déplacer, 
              à réaliser certains gestes ou à maintenir une posture. Cela peut être dû à une 
              atteinte de la moelle épinière, une maladie neuromusculaire ou un accident.
            </p>
          </article>

          <article className="content-section card-grid">
            <div className="info-card">
              <h3>Défis quotidiens</h3>
              <ul>
                <li>Accessibilité des infrastructures</li>
                <li>Fatigabilité lors des déplacements</li>
                <li>Manipulation d'objets précis</li>
              </ul>
            </div>
            <div className="info-card highlight">
              <h3>Clés de l'inclusion</h3>
              <ul>
                <li>Dégager les espaces de passage</li>
                <li>Adapter la hauteur du mobilier</li>
                <li>Toujours demander avant d'aider</li>
              </ul>
            </div>
          </article>

          <article className="content-section next-steps">
            <h2>Passer à l'action</h2>
            <p>
              L'inclusion passe aussi par le jeu et le partage ! Nous avons conçu des 
              activités ludiques pour sensibiliser les petits et les grands.
            </p>
            <Link to="/jeux" className="btn-primary">
              Découvrir nos jeux éducatifs
            </Link>
          </article>

        </div>
      </section>
    </div>
  );
}

export default HandicapDetail;