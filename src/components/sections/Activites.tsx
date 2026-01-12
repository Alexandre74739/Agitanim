import { Reveal } from "../layout/Reveal";
import Buttons from "../common/Buttons";

import "./Activites.scss";

function Activites() {
  return (
    <section className="activites">
      <Reveal>
        <div className="container">
          <h2>Projets et jeux</h2>
          <p>
            Concevoir des activités est l’essence même du métier d’animateur.
            Des projets pédagogiques aux grands jeux, chaque instant est pensé
            pour rythmer la journée et enrichir l'expérience des enfants.
          </p>
        </div>
      </Reveal>
      <Reveal>
        <Buttons />
      </Reveal>
    </section>
  );
}

export default Activites;
