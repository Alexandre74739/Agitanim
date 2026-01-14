import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { Reveal } from "../layout/Reveal";
import Buttons from "../common/Buttons";
import ActivityCard from "../../utils/ActivityCard";

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

function Activites({ showLoadMore = true, showInfosBtn = false }: ActivitesProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [limit, setLimit] = useState(3);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

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
            <div className="buttons-group">
              <Link
                to="/jeux"
                className="primary-btn-link"
                onClick={() => window.scrollTo({ top: 0 })}
              >
                <button className="primary-btn">Je veux plus de projets & jeux</button>
              </Link>
            </div>
          </Reveal>
        )}
      </div>

      {selectedPdf && (
        <div className="modal-overlay" onClick={() => setSelectedPdf(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedPdf(null)}>
              ✕
            </button>
            <iframe src={selectedPdf} title="Aperçu de l'activité" />
            <a href={selectedPdf} download className="download-btn">
              Télécharger le PDF
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

export default Activites;
