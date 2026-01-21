import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Ton fichier de config Supabase
import "./HandicapDetail.scss";

function HandicapDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading) return <div className="loader">Chargement...</div>;
  if (!data) return <div className="error">Handicap non trouvé.</div>;

  return (
    <div className="handicap-detail-page">
      <div className="container">
        <h1>{data.title}</h1>
        <p className="subtitle">{data.subtitle}</p>

        <div className="content-grid">
          <section className="info-card">
            <h2>Présentation</h2>
            <p>{data.description}</p>
          </section>

          <section className="info-card highlight">
            <h2>Comment l'inclure ?</h2>
            <p>{data.inclusion_tips}</p>
          </section>
        </div>

        <div className="actions">
          {/* Le lien PDF vient aussi de Supabase maintenant */}
          <a href={data.pdf_url} target="_blank" rel="noreferrer" className="btn-primary">
            Télécharger la fiche PDF
          </a>
          <Link to="/jeux" className="btn-secondary">Voir les jeux</Link>
        </div>
      </div>
    </div>
  );
}

export default HandicapDetail;