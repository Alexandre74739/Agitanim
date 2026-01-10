import Buttons from "../common/Buttons";
import { Reveal } from "../layout/Reveal";
import roadMap from "../../assets/roadMap.png";
import form2 from "../../assets/forme2.png";
import form3 from "../../assets/forme3.png";
import "./Map.scss";

function Map() {
  return (
    <section className="map">
      <Reveal>
        <div className="container">
          <h2>C'est parti pour une journée en centre de loisirs</h2>
          <p>
            Chaque journée en centre de loisirs suit une organisation précise.
            De l’accueil aux activités en passant par les temps calmes,
            l’animateur s’adapte au rythme, à l’âge et aux besoins des enfants.
            Cette roadmap va permettre de te guider à travers les étapes clés
            d’une journée type.
          </p>
          <Buttons />
        </div>
      </Reveal>

      <Reveal>
        <div className="organisation">
          <img src={roadMap} className="roadMap" alt="roadMap" />

          <div className="forms">
            <img src={form3} className="form3" alt="form" />
            <img src={form3} className="form3" alt="form" />
            <img src={form2} className="form2" alt="form" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default Map;
