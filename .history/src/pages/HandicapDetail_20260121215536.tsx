import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient"; 
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import "./HandicapDetail.scss";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
};

function HandicapDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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

  if (loading) return <div className="loader-screen"><div className="pulse" /></div>;

  return (
    <div className="handicap-detail-page">
      <motion.div className="progress-bar" style={{ scaleX }} />

      <header className="hero-editorial">
        <motion.div style={{ opacity }} className="hero-bg-text">{data.title}</motion.div>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="hero-content">
            <span className="eyebrow">Comprendre pour mieux inclure</span>
            <h1>{data.title}</h1>
            <p className="lead">{data.subtitle}</p>
            <div className="hero-actions">
              <a href={data.pdf_url} className="btn-primary-dark">Télécharger la ressource</a>
              <span className="scroll-hint">Scrollez pour découvrir</span>
            </div>
          </motion.div>
        </div>
      </header>

      <section className="transition-text">
        <div className="container">
          <motion.p initial="hidden" whileInView="visible" variants={fadeUp}>
            Derrière chaque définition se cache une réalité plurielle. 
            Découvrons ensemble les nuances du <strong>{data.title}</strong>.
          </motion.p>
        </div>
      </section>

      <main className="main-layout">
        <div className="container">
          
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="content-block stats-section">
            <div className="block-label">L'impact en chiffres</div>
            <div className="stats-flex">
              <div className="stat-item">
                <span className="value">{data.statistics}</span>
                <p className="label">{data.key_figures}</p>
              </div>
              <div className="stat-description">
                <p>{data.description}</p>
              </div>
            </div>
          </motion.section>

          <div className="section-divider" />

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="content-block grid-details">
            <div className="detail-item">
              <h3>Signes & Perception</h3>
              <p>{data.characteristics}</p>
            </div>
            <div className="detail-item dark">
              <h3>Agir ensemble</h3>
              <p>{data.inclusion_tips}</p>
            </div>
          </motion.section>

          <section className="interlude">
             <div className="interlude-content">
                <h2>Déconstruire les préjugés</h2>
                <p>Parce que l'inclusion commence par la fin des stéréotypes.</p>
             </div>
          </section>

          

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="truth-comparison">
            <div className="comparison-card">
              <div className="side-myth">
                <span className="tag">Mythe</span>
                <p>{data.myth_text}</p>
              </div>
              <div className="side-reality">
                <span className="tag">Réalité</span>
                <p>{data.reality_text}</p>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <footer className="footer-cta">
        <div className="container">
          <div className="cta-wrapper">
            <span className="eyebrow">Passer à la pratique</span>
            <h2>Prêt à relever le défi ?</h2>
            <Link to="/jeux" className="btn-cta">Tester mes connaissances</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HandicapDetail;