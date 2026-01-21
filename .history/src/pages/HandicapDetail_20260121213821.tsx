import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient"; 
import "./HandicapDetail.scss";

function HandicapDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function getHandicap() {
      setLoading(true);
      const { data: handicap, error } = await supabase
        .from("handicaps")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error) setData(handicap);
      setLoading(false);
    }
    getHandicap();
  }, [slug]);

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;
  if (!data) return <div className="error-page"><h2>Oups ! Page introuvable.</h2><Link to="/inclusion">Retourner à l'inclusion</Link></div>;

  return (
    <div className="handicap-detail-page">
      {/* HEADER : Fond clair pour contraster avec le Header Bleu */}
      <header className="hero-handicap">
        <div className="container">
          <div className="hero-grid">
            <div className="text-side">
              <span className="badge">Fiche Sensibilisation</span>
              <h1>{data.title}</h1>
              <p className="subtitle">{data.subtitle}</p>
              <div className="hero-buttons">
                 <a href={data.pdf_url} target="_blank" rel="noreferrer" className="btn-main">Télécharger le PDF</a>
              </div>
            </div>
            {/* Espace pour une éventuelle icône ou illustration */}
            <div className="decor-side">
               <div className="circle-decor"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="container main-content">
        {/* Section 1 : Comprendre */}
        <section className="content-section shadow-card">
          <div className="section-title">
            <span className="num">01</span>
            <h2>Comprendre la situation</h2>
          </div>
          <div className="text-body">
            <p>{data.description}</p>
          </div>
        </section>

        {/* Section 2 : Grille d'informations détaillées */}
        <div className="details-grid">
          <article className="detail-card">
            <h3>Les signes fréquents</h3>
            <p>Chaque personne est unique, mais on observe souvent des besoins liés à :</p>
            {/* Ici on peut imaginer une colonne "caracteristiques" dans Supabase */}
            <p className="dynamic-text">{data.characteristics || "Difficultés d'adaptation, besoins de repères fixes, ou fatigabilité accrue."}</p>
          </article>

          <article className="detail-card accent-card">
            <h3>Comment agir au quotidien ?</h3>
            <p>{data.inclusion_tips}</p>
          </article>
        </div>

        {/* Section 3 : Idées reçues */}
        <section className="content-section fact-section">
          <h2>Halte aux idées reçues !</h2>
          <div className="fact-grid">
             <div className="fact-item">
                <strong>Le saviez-vous ?</strong>
                <p>80% des handicaps sont invisibles. L'inclusion commence par l'écoute et l'observation, pas seulement par l'aménagement physique.</p>
             </div>
          </div>
        </section>

        {/* Section 4 : Navigation finale */}
        <footer className="footer-navigation">
            <div className="nav-box">
                <h3>Prêt à tester vos connaissances ?</h3>
                <p>Découvrez nos jeux conçus spécifiquement pour sensibiliser à ce handicap.</p>
                <Link to="/jeux" className="btn-secondary-custom">Accéder aux jeux</Link>
            </div>
        </footer>
      </div>
    </div>
  );
}

export default HandicapDetail;