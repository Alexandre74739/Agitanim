import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { Reveal } from "../components/layout/Reveal";

import form1 from "../../src/assets/forme1.png";
import form2 from "../../src/assets/forme2.png";
import form3 from "../../src/assets/forme3.png";

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

    if (loading) return
    <div className="loader-container">
        <div className="loader"></div>
    </div>;
    if (!data) return
    <div className="error-container">
        <h2>404</h2>
        <Link to="/inclusion">Retourner à l'accueil</Link>
    </div>;

    return (
        <section className="handicap-detail-page">
            <div className="forms">
                <img src={form1} className="form1" alt="" />
                <img src={form3} className="form2" alt="" />
                <img src={form2} className="form3" alt="" />
                <img src={form3} className="form4" alt="" />
            </div>

            <header className="hero-editorial">
                <div className="container">
                    <Reveal>
                        <div className="badge">Fiche Sensibilisation</div>
                        <h1>{data.title}</h1>
                        <p className="hero-subtitle">{data.subtitle}</p>
                        <div className="hero-cta-box">
                            <a href={data.pdf_url} target="_blank" rel="noreferrer" className="primary-btn">
                                Obtenir la fiche mémo (PDF)
                            </a>
                        </div>
                    </Reveal>
                </div>
            </header>

            <main className="content-flow">
                {/* Section 1 */}
                <section className="section-narrative container">
                    <Reveal>
                        <div className="grid-narrative">
                            <div className="text-content">
                                <span className="step-num">01</span>
                                <h2>Comprendre la situation</h2>
                                <p className="large-p">{data.description}</p>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">{data.statistics}</span>
                                <span className="stat-label">{data.key_figures}</span>
                                <div className="stat-bar" />
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* Section 2 */}
                <div className="interlude-banner">
                    <div className="container">
                        <Reveal>
                            <div className="interlude-grid">
                                <div className="info-box">
                                    <div className="icon">🔍</div>
                                    <h3>Observations</h3>
                                    <p>{data.characteristics}</p>
                                </div>
                                <div className="info-box accent">
                                    <div className="icon">🤝</div>
                                    <h3>Pistes d'inclusion</h3>
                                    <p>{data.inclusion_tips}</p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* S */}
                <section className="myth-section container">
                    <Reveal>
                        <div className="section-header-center">
                            <span className="step-num">02</span>
                            <h2>Changer de regard</h2>
                            <p>On oublie les préjugés pour laisser place aux faits.</p>
                        </div>

                        <div className="myth-reality-card">
                            <div className="myth-side">
                                <div className="card-label">Le Mythe</div>
                                <p>"{data.myth_text}"</p>
                            </div>
                            <div className="divider-icon">VS</div>
                            <div className="reality-side">
                                <div className="card-label">La Réalité</div>
                                <p>{data.reality_text}</p>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* SECTION 04 : LE SAVIEZ-VOUS / TRANSITION */}
                <section className="did-you-know container">
                    <Reveal>
                        <div className="dyk-box">
                            <h3>Le saviez-vous ?</h3>
                            <p>Plus de 80% des handicaps sont invisibles. L'inclusion ne commence pas par un aménagement technique, mais par une écoute active et une bienveillance quotidienne.</p>
                        </div>
                    </Reveal>
                </section>

                {/* FOOTER ACTION */}
                <footer className="final-action">
                    <Reveal>
                        <div className="action-card">
                            <h2>Envie de tester vos réflexes ?</h2>
                            <p>Mettez en pratique ce que vous venez d'apprendre via nos scénarios interactifs.</p>
                            <Link to="/jeux" className="primary-btn">Lancer l'expérience</Link>
                        </div>
                    </Reveal>
                </footer>
            </main>
        </section>
    );
}

export default HandicapDetail;