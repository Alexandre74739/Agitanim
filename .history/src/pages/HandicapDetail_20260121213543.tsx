import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient"; 
import "./HandicapDetail.scss";

function HandicapDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Remonter en haut de page quand le slug change
    window.scrollTo(0, 0);

    async function getHandicap() {
      setLoading(true);
      const { data: handicap, error } = await supabase
        .from("handicaps")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error) {
        setData(handicap);
      }
      setLoading(false);
    }
    getHandicap();
  }, [slug]);

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;
  if (!data) return <div className="error-page"><h2>Handicap non trouvé</h2><Link to="/inclusion">Retour</Link></div>;

  return (
    <div className="handicap-detail-page">
      {/* Header avec fond coloré */}
      <header className="hero-handicap">
        <div className="container">
          <span className="label-top">Fiche Inclusion</span>
          <h1>{data.title}</h1>
          <p className="subtitle">{data.subtitle}</p>
        </div>
      </header>

      <div className="container main-content">
        <div className="content-grid">
          {/* Section Présentation */}
          <section className="info-card">
            <div className="card-header">
              <span className="icon">📝</span>
              <h2>Présentation</h2>
            </div>
            <p>{data.description}</p>
          </section>

          {/* Section Inclusion (Mise en avant) */}
          <section className="info-card highlight">
            <div className="card-header">
              <span className="icon">🤝</span>
              <h2>Comment l'inclure ?</h2>
            </div>
            <p>{data.inclusion_tips}</p>
          </section>
        </div>

        {/* Barre d'actions fixe ou en bas de page */}
        <div className="actions-footer">
          <div className="text-cta">
            <h3>Aller plus loin</h3>
            <p>Téléchargez la fiche complète ou découvrez nos outils ludiques.</p>
          </div>
          <div className="buttons">
            <a href={data.pdf_url} target="_blank" rel="noreferrer" className="btn-download">
              Télécharger le PDF
            </a>
            <Link to="/jeux" className="btn-games">
              Voir les jeux
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HandicapDetail;