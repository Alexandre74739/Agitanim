import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { Reveal } from "../layout/Reveal";
import Buttons from "../common/Buttons";
import ActivityCard from "../../utils/ActivityCard";
import form1 from "../../assets/forme1.png";
import form2 from "../../assets/forme2.png";
import form3 from "../../assets/forme3.png";

import "./Activites.scss";

interface Activity {
  id: number;
  title: string;
  description: string;
  author: string;
  age_min: number;
  age_max: number;
  duration_min: number;
  duration_max: number;
  nb_kids: number;
  image_url: string;
  pdf_url: string;
}

interface ActivitesProps {
  showLoadMore?: boolean;
  showInfosBtn?: boolean;
}

function Activites({
  showLoadMore = true,
  showInfosBtn = false,
}: ActivitesProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [limit, setLimit] = useState(3);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const handleDownload = async (pdfUrl: string, fileName: string) => {
    try {
      const filePath = pdfUrl.split("/public/")[1];

      const { data, error } = await supabase.storage
        .from("medias")
        .download(filePath.split("medias/")[1]);

      if (error) throw error;

      // Création d'un lien temporaire pour déclencher le téléchargement
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erreur de téléchargement:", err);
      window.open(pdfUrl, "_blank");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from("activities")
          .select("*")
          .order("id", { ascending: true })
          .range(0, limit - 1);

        if (supabaseError) {
          console.error("Erreur Supabase détaillée:", supabaseError.message);
          return;
        }

        if (data) {
          console.log("Données reçues :", data);
          setActivities(data);
        }
      } catch (err) {
        console.error("Erreur système inattendue:", err);
      }
    };

    loadData();
  }, [limit]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPdf(null);
      }
    };

    if (selectedPdf) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedPdf]);

  return (
    <section className="activites">
      <Reveal>
        <div className="container">
          <h2>Projets et jeux</h2>
          <p>
            Concevoir des activités est l’essence même du métier d’animateur.
            Chaque instant est pensé pour rythmer la journée et enrichir
            l'expérience des enfants.
          </p>
        </div>
      </Reveal>
      <Reveal>
        <Buttons />
      </Reveal>

      <div className="cards-grid">
        {activities.map((activity) => (
          <Reveal key={activity.id}>
            <ActivityCard
              activity={activity}
              onClick={() => setSelectedPdf(activity.pdf_url)}
            />
          </Reveal>
        ))}
      </div>

      <div className="actions-area">
        {showInfosBtn && (
          <Reveal>
            <div className="buttons-group">
              {activities.length >= limit && (
                <button
                  className="primary-btn-link"
                  onClick={() => setLimit((prev) => prev + 3)}
                >
                  Je veux plus d'idées
                </button>
              )}
            </div>
          </Reveal>
        )}
        {showLoadMore && (
          <Reveal>
            <div className="pri">
              <Link
                to="/jeux"
                className="primary-btn-link"
                onClick={() => window.scrollTo({ top: 0 })}
              >
                <button className="primary-btn">
                  Je veux explorer plus d'idées
                </button>
              </Link>
            </div>
          </Reveal>
        )}
      </div>

      <div className="forms">
        <img src={form1} className="form1" alt="form" />
        <img src={form3} className="form2" alt="form" />
        <img src={form2} className="form3" alt="form" />
        <img src={form3} className="form4" alt="form" />
      </div>

      {selectedPdf && (
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
      )}
    </section>
  );
}

export default Activites;
