import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
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

function Activites({ showLoadMore = true, showInfosBtn = false }: ActivitesProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  
  // ÉTATS DES FILTRES
  const [searchTerm, setSearchTerm] = useState("");
  const [maxDuration, setMaxDuration] = useState(120); // Tranches de 15min
  const [targetAge, setTargetAge] = useState(8);

  // Fonction de téléchargement PDF forcée
  const handleDownload = async (pdfUrl: string, fileName: string) => {
    try {
      const filePath = pdfUrl.split("/public/")[1];
      const { data, error } = await supabase.storage
        .from("medias")
        .download(filePath.split("medias/")[1]);

      if (error) throw error;

      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erreur de téléchargement:", err);
      window.open(pdfUrl, "_blank");
    }
  };

  // Chargement des données avec filtres Supabase (lte = Less Than or Equal, gte = Greater Than or Equal)
  const loadFilteredData = useCallback(async () => {
    try {
      let query = supabase
        .from("activities")
        .select("*")
        .order("id", { ascending: true });

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      // On filtre les projets dont la durée minimale est inférieure ou égale à notre curseur
      query = query.lte('duration_min', maxDuration);

      // On filtre les projets où l'âge cible est compris entre le min et le max du projet
      query = query.lte('age_min', targetAge).gte('age_max', targetAge);

      const { data, error } = await query;
      if (error) throw error;
      setActivities(data || []);
    } catch (err) {
      console.error("Erreur système:", err);
    }
  }, [searchTerm, maxDuration, targetAge]);

  useEffect(() => {
    loadFilteredData();
  }, [loadFilteredData]);

  // Gestion de la touche Échap
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPdf(null);
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
          <p>Filtrez parmi nos 50+ fiches pédagogiques pour trouver l'activité idéale.</p>
        </div>
      </Reveal>

      {/* BARRE DE NAVIGATION ET FILTRES */}
      <div className="filter-section">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Rechercher par titre..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="sliders-container">
          <div className="filter-group">
            <label>Durée (max {maxDuration} min)</label>
            <input 
              type="range" min="15" max="180" step="15" 
              value={maxDuration} 
              onChange={(e) => setMaxDuration(parseInt(e.target.value))}
            />
          </div>

          <div className="filter-group">
            <label>Âge des enfants ({targetAge} ans)</label>
            <input 
              type="range" min="3" max="17" step="1" 
              value={targetAge} 
              onChange={(e) => setTargetAge(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="cards-grid">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <Reveal key={activity.id}>
              <ActivityCard
                activity={activity}
                onClick={() => setSelectedPdf(activity.pdf_url)}
              />
            </Reveal>
          ))
        ) : (
          <div className="no-results">Aucun projet ne correspond à ces critères.</div>
        )}
      </div>

      {/* MODAL PDF */}
      {selectedPdf && (
        <div className="modal-overlay" onClick={() => setSelectedPdf(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
               <button onClick={() => handleDownload(selectedPdf, "activite")} className="download-btn-top">
                Télécharger le PDF
              </button>
              <span className="esc-text">Échap pour fermer</span>
            </div>
            <div className="pdf-container">
              <iframe src={`${selectedPdf}#view=FitH&toolbar=0`} title="Aperçu" />
            </div>
          </div>
        </div>
      )}

      <div className="forms">
        <img src={form1} className="form1" alt="form" />
        <img src={form3} className="form2" alt="form" />
        <img src={form2} className="form3" alt="form" />
        <img src={form3} className="form4" alt="form" />
      </div>
    </section>
  );
}

export default Activites;