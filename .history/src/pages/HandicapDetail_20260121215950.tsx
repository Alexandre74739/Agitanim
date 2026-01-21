import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient"; 
import { Reveal } from "../../";
import { motion } from "framer-motion";

// Import des formes identiques à la section Activités
import form1 from "../../assets/forme1.png";
import form2 from "../../assets/forme2.png";
import form3 from "../../assets/forme3.png";

import "./HandicapDetail.scss";

function HandicapDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchHandicap() {
      setLoading(true);
      const { data: handicap } = await supabase.from("handicaps").select("*").eq("slug", slug).single();
      if (handicap) setData(handicap);
      setLoading(false);
    }
    fetchHandicap();
  }, [slug]);

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;
  if (!data) return <div className="error-container"><p>Fiche introuvable.</p><Link to="/inclusion">Retour</Link></div>;

  return (
    <section className="handicap-detail-page">
      {/* HERO SECTION - Style Activités */}
      <Reveal>
        <header className="hero-section">
          <div className="container">
            <span className="eyebrow">Sensibilisation & Inclusion</span>
            <h1>{data.title}</h1>
            <p className="lead-text">{data.subtitle}</p>
            <a href={data.pdf_url} target="_blank" rel="noreferrer" className="primary-btn">
              Télécharger la fiche complète (PDF)
            </a>
          </div>
        </header>
      </Reveal>

      {/* SECTION CHIFFRES - Transition organique */}
      <div className="container main-layout">
        <Reveal>
          <div className="stat-highlight-box">
            <div className="stat-content">
              <span className="big-number">{data.statistics}</span>
              <p>{data.key_figures}</p>
            </div>
            <div className="stat-description">
              <p>{data.description}</p>
            </div>
          </div>
        </Reveal>

        {/* GRILLE D'INFOS - Comme les ActivityCard */}
        <div className="details-grid">
          <Reveal>
            <div className="info-card">
              <div className="card-icon">🔍</div>
              <h3>Signes & Besoins</h3>
              <p>{data.characteristics}</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="info-card primary-style">
              <div className="card-icon">🤝</div>
              <h3>Conseils d'inclusion</h3>
              <p>{data.inclusion_tips}</p>
            </div>
          </Reveal>
        </div>

        {/* MYTH BUSTER - Design Épuré */}
        <Reveal>
          <section className="myth-reality-section">
            <div className="comparison-container">
              <div className="side myth">
                <label>Idée reçue</label>
                <p>"{data.myth_text}"</p>
              </div>
              <div className="side reality">
                <label>La Réalité</label>
                <p>{data.reality_text}</p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* CTA FINAL - Identique aux boutons Activités */}
        <Reveal>
          <footer className="actions-area-handicap">
            <h2>Prêt à tester vos connaissances ?</h2>
            <p>Apprenez-en plus sur {data.title} avec nos jeux.</p>
            <Link to="/jeux" className="primary-btn-link">
              <button className="primary-btn">Explorer les jeux interactifs</button>
            </Link>
          </footer>
        </Reveal>
      </div>

      {/* FORMES DÉCORATIVES - Reprise exacte de Activités.scss */}
      <div className="forms">
        <img src={form1} className="form1" alt="" />
        <img src={form3} className="form2" alt="" />
        <img src={form2} className="form3" alt="" />
        <img src={form3} className="form4" alt="" />
      </div>
    </section>
  );
}

export default HandicapDetail;