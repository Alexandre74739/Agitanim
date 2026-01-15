import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../utils/supabaseClient";
import { Reveal } from "../layout/Reveal";
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
  
  // ÉTATS DES FILTRES ET PAGINATION
  const [searchTerm, setSearchTerm] = useState("");
  const [maxDuration, setMaxDuration] = useState(120);
  const [targetAge, setTargetAge] = useState(8);
  const [limit, setLimit] = useState(3); // On commence par 6
  const [hasMore, setHasMore] = useState(true);

  // Fonction de téléchargement PDF
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

  // Chargement des données filtrées + Pagination
  const loadData = useCallback(async () => {
    try {
      let query = supabase
        .from("activities")
        .select("*", { count: 'exact' }) // count: exact permet de savoir s'il reste des données
        .order("id", { ascending: true })
        .range(0, limit - 1);

      if (searchTerm) query = query.ilike('title', `%${searchTerm}%`);
      query = query.lte('duration_min', maxDuration);
      query = query.lte('age_min', targetAge).gte('age_max', targetAge);

      const { data, error, count } = await query;
      if (error) throw error;

      setActivities(data || []);
      
      // Vérifier s'il reste des éléments à charger
      if (count && data && data.length >= count) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (err) {
      console.error("Erreur système:", err);
    }
  }, [searchTerm, maxDuration, targetAge, limit]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Réinitialiser la limite quand on change de filtre
  useEffect(() => {
    setLimit(6);
  }, [searchTerm, maxDuration, targetAge]);

  // Gestion Échap
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
          <p>Concevoir des activités est l’essence même du métier d’animateur.</p>
        </div>
      </Reveal>

      {/* FILTRES UI */}
      <div className="filter-section">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Rechercher une fiche..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sliders-container">
          <div className="filter-group">
            <label>Durée (max {maxDuration} min)</label>
            <input type="range" min="15" max="180" step="15" value={maxDuration} onChange={(e) => setMaxDuration(parseInt(e.target.value))} />
          </div>
          <div className="filter-group">
            <label>Âge ({targetAge} ans)</label>
            <input type="range" min="3" max="17" step="1" value={targetAge} onChange={(e) => setTargetAge(parseInt(e.target.value))} />
          </div>
        </div>
      </div>

      <div className="cards-grid">
        {activities.map((activity) => (
          <Reveal key={activity.id}>
            <ActivityCard activity={activity} onClick={() => setSelectedPdf(activity.pdf_url)} />
          </Reveal>
        ))}
      </div>

      {/* BOUTONS D'ACTIONS (LOAD MORE) */}
      <div className="actions-area">
        {hasMore && activities.length >= 3 && (
          <Reveal>
            <button className="primary-btn" onClick={() => setLimit(prev => prev + 3)}>
              Je veux plus d'idées
            </button>
          </Reveal>
        )}
        
        {showLoadMore && (
          <Reveal>
            <Link to="/jeux" className="primary-btn-link" onClick={() => window.scrollTo({ top: 0 })}>
              <button className="primary-btn secondary-style">
                Explorer tout le catalogue
              </button>
            </Link>
          </Reveal>
        )}
      </div>

      {/* MODAL */}
      {selectedPdf && (
        <div className="modal-overlay" onClick={() => setSelectedPdf(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button onClick={() => handleDownload(selectedPdf, "fiche-activite")} className="download-btn-top">
                Télécharger le PDF
              </button>
              <span className="esc-hint">Échap pour fermer</span>
            </div>
            <div className="pdf-body">
              <iframe src={`${selectedPdf}#view=FitH&toolbar=0`} title="PDF" />
            </div>
          </div>
        </div>
      )}

      <div className="forms">
        <img src={form1} className="form1" alt="form" /><img src={form3} className="form2" alt="form" />
        <img src={form2} className="form3" alt="form" /><img src={form3} className="form4" alt="form" />
      </div>
    </section>
  );
}

export default Activites;