import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../utils/supabaseClient";
import { Reveal } from "../layout/Reveal";
import Buttons from "../common/Buttons";
import ActivityCard from "../../utils/ActivityCard";
// ... imports images

function Activites({ showLoadMore = true, showInfosBtn = false }: ActivitesProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  
  // ÉTATS DES FILTRES
  const [searchTerm, setSearchTerm] = useState("");
  const [maxDuration, setMaxDuration] = useState(120); // par tranche de 15min
  const [targetAge, setTargetAge] = useState(12);

  const loadData = useCallback(async () => {
    try {
      let query = supabase
        .from("activities")
        .select("*")
        .order("id", { ascending: true });

      // Filtre Recherche Textuelle
      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      // Filtre Durée (inférieure ou égale)
      query = query.lte('duration_max', maxDuration);

      // Filtre Âge (l'âge doit être compris entre min et max)
      query = query.lte('age_min', targetAge).gte('age_max', targetAge);

      const { data, error } = await query;

      if (error) throw error;
      setActivities(data || []);
    } catch (err) {
      console.error("Erreur de filtrage:", err);
    }
  }, [searchTerm, maxDuration, targetAge]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <section className="activites">
      {/* BARRE DE FILTRES */}
      <div className="filter-bar">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Rechercher un projet..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="range-filters">
          <div className="filter-group">
            <label>Durée max : {maxDuration} min</label>
            <input 
              type="range" 
              min="15" 
              max="180" 
              step="15" 
              value={maxDuration}
              onChange={(e) => setMaxDuration(parseInt(e.target.value))}
            />
          </div>

          <div className="filter-group">
            <label>Âge des enfants : {targetAge} ans</label>
            <input 
              type="range" 
              min="3" 
              max="17" 
              step="1" 
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
          <p className="no-results">Aucun projet ne correspond à vos filtres.</p>
        )}
      </div>
      
      {/* ... reste de votre modal et formulaires */}
    </section>
  );
}