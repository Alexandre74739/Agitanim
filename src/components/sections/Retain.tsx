import { Reveal } from "../layout/Reveal";
import form1 from "../../assets/forme1.png";
import form3 from "../../assets/forme3.png";
import "./Retain.scss";

function Retain() {
  return (
    <section className="retain-section">
      <Reveal>
        <h2>Ce qu'il faut retenir</h2>
      </Reveal>
      <div className="items-container">
        <Reveal>
          <div className="liste">
            <span>1.</span>
            <div className="content">
              <h3>Toujours garder en tête</h3>
              <p>
                Observer, écouter, ajuster. Un comportement est souvent une
                réponse à un environnement qui peut être plus compliqué qu’on ne
                le pense.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="liste">
            <span>2.</span>
            <div className="content">
              <h3>A éviter</h3>
              <p>
                Étiqueter, comparer, ou forcer un enfant à participer sans
                adaptation. Chaque enfant est unique et a ses goûts, on doit
                tout faire pour l’intégrer au groupe mais sans le forcer.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="liste">
            <span>3.</span>
            <div className="content">
              <h3>Communiquer</h3>
              <p>
                Échanger avec l’équipe et les familles permet souvent d’éviter
                des situations difficiles. De plus tu pourras aussi informer les
                autres de ce que tu sais et améliorer le quotidien de l’enfant.
              </p>
            </div>
          </div>
        </Reveal>
        <div className="forms">
          <img src={form1} className="form1" alt="form" />
          <img src={form3} className="form3" alt="form" />
        </div>
      </div>
    </section>
  );
}
export default Retain;
