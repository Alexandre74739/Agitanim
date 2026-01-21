import "./LegalPages.scss";

function DroitsReserves() {
  return (
    <section className="legal-page">
      <div className="container">
        <h1>Tous Droits Réservés</h1>
        
        <div className="legal-block">
          <h3>Propriété du contenu</h3>
          <p>
            Sauf mention contraire, tous les éléments accessibles sur le site (textes, images, graphismes, logo) 
            restent la propriété exclusive de leur auteur, PEREZ Alexandre-Philippe.
          </p>
        </div>

        <div className="legal-block">
          <h3>Conditions d'utilisation</h3>
          <p>
            Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie 
            des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf 
            autorisation écrite préalable.
          </p>
        </div>

        <div className="legal-block">
          <h3>Crédits</h3>
          <p>
            Ce site a été conçu et développé avec passion pour promouvoir l'inclusion et le jeu. 
            Les ressources graphiques externes sont utilisées conformément à leurs licences respectives.
          </p>
        </div>
      </div>
    </section>
  );
}

export default DroitsReserves;