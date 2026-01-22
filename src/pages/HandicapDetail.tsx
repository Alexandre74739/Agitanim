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
    const [isSwapped, setIsSwapped] = useState(false);

    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

    // Récupération des données
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

    useEffect(() => {
        const header = document.querySelector("header");

        if (!header) return;

        if (selectedPdf) {
            header.style.display = "none";
        } else {
            header.style.display = "";
        }

        return () => {
            header.style.display = "";
        };
    }, [selectedPdf]);

    // Fonction de téléchargement
    const handleDownload = async (pdfUrl: string, fileName: string) => {
        try {
            const filePath = pdfUrl.split("/public/medias/")[1];
            const { data, error } = await supabase.storage
                .from("medias")
                .download(filePath);

            if (error) throw error;

            const url = window.URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${fileName.replace(/\s+/g, "-").toLowerCase()}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Erreur de téléchargement:", err);
            window.open(pdfUrl, "_blank");
        }
    };

    if (loading) return (
        <div className="loader-container">
            <div className="loader"></div>
        </div>
    );

    if (!data) return (
        <div className="error-container">
            <h2>404</h2>
            <Link to="/inclusion">Retourner à l'accueil</Link>
        </div>
    );

    return (
        <section className="handicap-detail-page">
            <div className="hero-editorial">
                <div className="container">
                    <Reveal>
                        <div className="badge">Fiche Sensibilisation</div>
                        <h1>{data.title}</h1>
                        <p className="hero-subtitle">{data.subtitle}</p>
                        <div className="hero-cta-box">
                            <button
                                onClick={() => setSelectedPdf(data.pdf_url)}
                                className="primary-btn"
                                style={{ border: 'none', cursor: 'pointer' }}
                            >
                                Obtenir la fiche mémo (PDF)
                            </button>
                        </div>
                    </Reveal>
                </div>
            </div>

            <div className="content-flow">
                <div className="section-narrative container">
                    <Reveal>
                        <div className="grid-narrative">
                            <div className="text-content">
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
                </div>

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

                <div
                    className={"myth-section container"}>
                    <Reveal>
                        <div className="section-header-center">
                            <h2>Changer de regard</h2>
                            <p>Les idées reçues sont souvent le premier frein à l'inclusion.
                                En confrontant nos préjugés à la réalité des faits, nous déconstruisons
                                les barrières pour construire un environnement plus juste et accessible à tous.</p>
                        </div>
                    </Reveal>
                    <Reveal>
                        <div
                            className={`myth-reality-card ${isSwapped ? 'change' : ''}`}
                            onClick={() => setIsSwapped(!isSwapped)}
                            style={{ cursor: 'pointer' }}
                        >
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
                </div>

                <div className="did-you-know container">
                    <Reveal>
                        <div className="dyk-box">
                            <h3>Le saviez-vous ?</h3>
                            <p>Plus de 80% des handicaps sont invisibles. L'inclusion ne commence pas par un aménagement technique, mais par une écoute active et une bienveillance quotidienne.</p>
                        </div>
                    </Reveal>
                </div>

                <div className="final-action">
                    <Reveal>
                        <div className="action-card">
                            <h2>Envie de tester vos réflexes ?</h2>
                            <p>Mettez en pratique ce que vous venez d'apprendre via nos scénarios interactifs.</p>
                            <Link to="/jeux" className="primary-btn">Lancer l'expérience</Link>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Modal aperçu PDF */}
            {
                selectedPdf && (
                    <div className="modal-overlay" onClick={() => setSelectedPdf(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <iframe
                                src={`${selectedPdf}#view=FitH&toolbar=0&navpanes=0`}
                                title="Aperçu de l'activité"
                            />
                            <button
                                onClick={() => handleDownload(selectedPdf, "Mon-Activite")}
                                className="download-btn"
                            >
                                Télécharger le PDF
                            </button>
                        </div>
                    </div>
                )
            }

            <div className="forms">
                <img src={form1} className="form1" alt="" />
                <img src={form3} className="form2" alt="" />
                <img src={form2} className="form3" alt="" />
                <img src={form3} className="form4" alt="" />
            </div>
        </section >
    );
}

export default HandicapDetail;