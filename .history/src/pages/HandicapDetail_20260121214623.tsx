import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient"; 
import { motion } from "framer-motion";
import "./HandicapDetail.scss";

// Variantes d'animation
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.2 } }
};

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
  if (!data) return <div className="error-page"><h2>Page introuvable</h2><Link to="/inclusion">Retour</Link></div>;

  return (
    <div className="handicap-detail-page">
      {/* SECTION HERO */}
      <header className="hero-handicap">
        <div className="container">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeInUp}
            className="hero-grid"
          >
            <div className="text-side">
              <span className="badge">Fiche Sensibilisation</span>
              <h1>{data.title}</h1>
              <p className="subtitle">{data.subtitle}</p>
              <div className="hero-buttons">
                 <a href={data.pdf_url} target="_blank" rel="noreferrer" className="btn-main">
                    Télécharger la fiche (PDF)
                 </a>
              </div>
            </div>

            <div className="stat-blob">
                <span className="number">{data.statistics || "1/10"}</span>
                <span className="desc">{data.key_figures || "personnes concernées"}</span>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container main-content">
        {/* SECTION 01 : COMPRENDRE */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="content-section shadow-card"
        >
          <div className="section-title">
            <span className="num">01</span>
            <h2>Comprendre la situation</h2>
          </div>
          <div className="text-body">
            <p className="lead-text">{data.description}</p>
          </div>
        </motion.section>

        {/* SECTION 02 : SIGNES & INCLUSION */}
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="details-grid"
        >
          <motion.article variants={fadeInUp} className="detail-card">
            <div className="icon">🔍</div>
            <h3>Les signes fréquents</h3>
            <p>{data.characteristics || "Caractéristiques et besoins spécifiques au quotidien."}</p>
          </motion.article>

          <motion.article variants={fadeInUp} className="detail-card accent-card">
            <div className="icon">🤝</div>
            <h3>Comment agir ?</h3>
            <p>{data.inclusion_tips}</p>
          </motion.article>
        </motion.div>

        {/* SECTION 03 : MYTH BUSTER (VRAI/FAUX) */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="myth-section"
        >
          <div className="myth-box">
            <div className="side myth">
                <h4>Idée reçue</h4>
                <p>{data.myth_text || "C'est une fatalité ou un manque de volonté."}</p>
            </div>
            <div className="side reality">
                <h4>La Réalité</h4>
                <p>{data.reality_text || "Une adaptation de l'environnement permet une pleine inclusion."}</p>
            </div>
          </div>
        </motion.section>

        {/* SECTION 04 : JEUX */}
        <motion.footer 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="footer-navigation"
        >
            <div className="nav-box">
                <div className="nav-text">
                  <h3>Apprendre en s'amusant</h3>
                  <p>Découvrez nos jeux pour tester vos connaissances sur {data.title}.</p>
                </div>
                <Link to="/jeux" className="btn-secondary-custom">Accéder aux jeux</Link>
            </div>
        </motion.footer>
      </div>
    </div>
  );
}

export default HandicapDetail;