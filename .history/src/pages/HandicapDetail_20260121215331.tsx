import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient"; 
import { motion, useScroll, useSpring } from "framer-motion";
import "./HandicapDetail.scss";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

function HandicapDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchHandicap() {
      setLoading(true);
      const { data: handicap } = await supabase
        .from("handicaps")
        .select("*")
        .eq("slug", slug)
        .single();
      if (handicap) setData(handicap);
      setLoading(false);
    }
    fetchHandicap();
  }, [slug]);

  if (loading) return <div className="loading-screen"><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="spinner" /></div>;
  if (!data) return <div className="error-view"><h2>404</h2><Link to="/inclusion">Retour à l'essentiel</Link></div>;

  return (
    <div className="handicap-detail-page">
      <motion.div className="progress-bar" style={{ scaleX }} />

      <header className="minimal-hero">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.span variants={itemVariants} className="category-tag">Inclusion & Diversité</motion.span>
            <motion.h1 variants={itemVariants}>{data.title}</motion.h1>
            <motion.p variants={itemVariants} className="lead">{data.subtitle}</motion.p>
            <motion.div variants={itemVariants}>
              <a href={data.pdf_url} target="_blank" rel="noreferrer" className="action-link">
                Consulter les ressources PDF
                <span className="arrow">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </header>

      <main className="container">
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} className="split-section">
          <div className="label-side">
            <span className="step-number">01</span>
            <h3>Essentiel</h3>
          </div>
          <div className="content-side">
            <motion.p variants={itemVariants} className="large-text">{data.description}</motion.p>
            <motion.div variants={itemVariants} className="stat-highlight">
              <span className="big-num">{data.statistics}</span>
              <span className="big-label">{data.key_figures}</span>
            </motion.div>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} className="grid-section">
          <motion.div variants={itemVariants} className="info-block">
            <div className="dot" />
            <h4>Signes distinctifs</h4>
            <p>{data.characteristics}</p>
          </motion.div>
          <motion.div variants={itemVariants} className="info-block invert">
            <div className="dot" />
            <h4>Inclusion au quotidien</h4>
            <p>{data.inclusion_tips}</p>
          </motion.div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants} className="truth-section">
          <div className="truth-card">
            <div className="card-half">
              <span className="card-label">Mythe</span>
              <p>"{data.myth_text}"</p>
            </div>
            <div className="card-separator" />
            <div className="card-half">
              <span className="card-label highlight">Réalité</span>
              <p>{data.reality_text}</p>
            </div>
          </div>
        </motion.section>

        <motion.footer initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants} className="cta-footer">
          <div className="cta-inner">
            <h2>Prêt à agir ?</h2>
            <p>Apprenez à mieux comprendre {data.title} à travers nos expériences interactives.</p>
            <Link to="/jeux" className="btn-minimal">Découvrir les jeux</Link>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}

export default HandicapDetail;