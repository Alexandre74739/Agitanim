import "./LegalPages.scss";

function MentionsLegales() {
  return (
    <section className="legal-page">
      <div className="container">
        <h1>Mentions Légales & RGPD</h1>

        <div className="legal-block">
          <h3>1. Éditeur du site</h3>
          <p>
            Le présent site est édité par{" "}
            <strong>PEREZ Alexandre-Philippe</strong>, résidant au 14 Terrasses
            Jean Renaudie, 38400 Saint Martin d'Hères, France. <br />
            Contact : perezalexandre430@gmail.com
          </p>
        </div>

        <div className="legal-block">
          <h3>2. Hébergement</h3>
          <p>
            Le site est hébergé par la société <strong>Vercel.</strong>, située
            au 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
          </p>
        </div>

        <div className="legal-block">
          <h3>3. Propriété intellectuelle</h3>
          <p>
            L'ensemble de ce site relève de la législation française et
            internationale sur le droit d'auteur et la propriété intellectuelle.
            Les icônes sont issues de la plateforme <strong>Flaticon</strong>.
            Certaines illustrations ont été générées via l'outil{" "}
            <strong>Gemini</strong> pour la road-map de la page d'accueil.
          </p>
        </div>

        <div className="legal-block">
          <h3>4. Protection des données (RGPD)</h3>
          <p>
            Les données collectées via le formulaire de contact (nom, e-mail)
            sont uniquement destinées à un usage interne pour répondre à vos
            demandes. Elles ne seront jamais cédées ou vendues à des tiers. Vous
            disposez d'un droit d'accès et de suppression en nous contactant par
            e-mail.
          </p>
        </div>
      </div>
    </section>
  );
}

export default MentionsLegales;
