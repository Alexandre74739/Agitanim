import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient"; 
import { motion } from "framer-motion";
import "./HandicapDetail.scss";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

function HandicapDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchHandicap() {
      setLoading(true);
      const { data: handicap, error } = await supabase
        .from("handicaps")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error) setData(handicap);
      setLoading(false);
    }
    fetchHandicap();
  }, [slug]);

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;
  if (!data) return <div className="error-container"><h2>Fiche non trouvée</h2><Link to="/inclusion">Retour</Link></div>;

  return (
    <motion.div initial="hidden" animate="visible" className="handicap-detail-page">
      {/* HERO SECTION */}
      <header className="hero-handicap">
        <div className="container">
          <div className="hero-grid">
            <motion.div variants={fadeInUp} className="text-side">
              <span className="badge">Sensibilisation</span>
              <h1>{data.title}</h1>
              <p className="subtitle">{data.subtitle}</p>
              <a href={data.pdf_url} target="_blank" rel="noreferrer" className="btn-main">
                Télécharger la fiche PDF
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="stat-container">
              <div className="stat-blob">
                <span className="number">{data.statistics || "1/10"}</span>
                <span className="label">{data.key_figures || "personnes"}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="container main-content">
        {/* COMPRENDRE */}
        <motion.section variants={fadeInUp} whileInView="visible" viewport={{ once: true }} className="content-section">
          <div className="section-header">
            <span className="num">01</span>
            <h2>Comprendre la situation</h2>
          </div>
          <p className="description-text">{data.description}</p>
        </motion.section>

        {/* CARDS */}
        <div className="info-grid">
          <motion.article variants={fadeInUp} whileInView="visible" viewport={{ once: true }} className="info-card">
            <h3>🔍 Signes & Besoins</h3>
            <p>{data.characteristics || "Détails à venir..."}</p>
          </motion.article>

          <motion.article variants={fadeInUp} whileInView="visible" viewport={{ once: true }} className="info-card primary-card">
            <h3>🤝 Conseils d'inclusion</h3>
            <p>{data.inclusion_tips}</p>
          </motion.article>
        </div>

        {/* MYTH BUSTER */}
        <motion.section variants={fadeInUp} whileInView="visible" viewport={{ once: true }} className="myth-buster">
          <div className="myth-card">
            <div className="side myth">
              <h4>Idée reçue</h4>
              <p>"{data.myth_text || "..."}"</p>
            </div>
            <div className="side reality">
              <h4>La Réalité</h4>
              <p>{data.reality_text || "..."}</p>
            </div>
          </div>
        </motion.section>

        {/* CTA FINAL */}
        <footer className="final-cta">
          <div className="cta-box">
            <h3>Envie de tester vos connaissances ?</h3>
            <p>Découvrez nos jeux interactifs sur le thème : {data.title}</p>
            <Link to="/jeux" className="btn-secondary">Aller aux jeux</Link>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}

export default HandicapDetail;