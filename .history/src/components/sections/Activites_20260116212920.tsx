function Activites({ showLoadMore = true, showInfosBtn = true, showFiltres = true }: ActivitesProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  // ÉTATS DES FILTRES
  const [searchTerm, setSearchTerm] = useState("");
  const [minDuration, setMinDuration] = useState(30); // Valeur par défaut
  const [targetAge, setTargetAge] = useState(8);
  const [limit, setLimit] = useState(3);
  const [hasMore, setHasMore] = useState(true);

  const loadData = useCallback(async () => {
    try {
      let query = supabase
        .from("activities")
        .select("*", { count: "exact" })
        .order("id", { ascending: true })
        .range(0, limit - 1);

      if (searchTerm) query = query.ilike("title", `%${searchTerm}%`);

      // FILTRE DURÉE : La durée choisie doit être incluse dans la plage de l'activité
      query = query.lte("duration_min", minDuration).gte("duration_max", minDuration);

      // FILTRE ÂGE : L'âge choisi doit être inclus dans la plage de l'activité
      query = query.lte("age_min", targetAge).gte("age_max", targetAge);

      const { data, error, count } = await query;
      if (error) throw error;

      setActivities(data || []);
      if (count !== null && data) {
        setHasMore(data.length < count);
      }
    } catch (err) {
      console.error("Erreur système:", err);
    }
  }, [searchTerm, minDuration, targetAge, limit]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Reset la pagination lors d'un changement de filtre
  useEffect(() => {
    setLimit(3);
  }, [searchTerm, minDuration, targetAge]);

  // ... reste de vos useEffect (PDF, Escape key) ...

  return (
    <section className="activites">
      {/* ... Reveal header ... */}

      {showFiltres && (
        <Reveal>
          <div className="filter-section">
            <div className="search-bar">
              <input
                type="text"
                id="search"
                placeholder=" "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <label htmlFor="search">Rechercher une fiche...</label>
            </div>
            
            <div className="sliders-container">
              {/* Filtre Âge */}
              <div className="filter-group">
                <label>Âge cible : {targetAge} ans</label>
                <input
                  type="range"
                  min="3"
                  max="17"
                  step="1"
                  value={targetAge}
                  onChange={(e) => setTargetAge(Number(e.target.value))}
                />
              </div>

              {/* Filtre Durée - Fonctionne maintenant en intervalle */}
              <div className="filter-group">
                <label>Durée souhaitée : {minDuration} min</label>
                <input
                  type="range"
                  min="15"
                  max="180"
                  step="15"
                  value={minDuration}
                  onChange={(e) => setMinDuration(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* ... Grille de cartes et Modale ... */}
    </section>
  );
}