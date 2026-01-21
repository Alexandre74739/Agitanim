import { useState } from "react";
import Buttons from "../common/Buttons";
import { Reveal } from "../layout/Reveal";
import roadMap from "../../assets/roadMap.png";
import form2 from "../../assets/forme2.png";
import form3 from "../../assets/forme3.png";
import "./Map.scss";

function Map() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      title: "Accueil",
      text: "L’accueil est le moment où les enfants arrivent au sein du centre de loisirs et où ils découvrent l’équipe d’animation. C’est le moment où il faut faire bonne impression et poser le cadre !!!",
      side: "right",
    },
    {
      id: 2,
      title: "Activités Du Matin",
      text: "C’est le moment de briller avec des activités variées. D’une durée d’environ 1h30, cette phase demande une bonne organisation afin de diviser le groupe et de proposer des activités adaptées aux besoins de chaque enfant.",
      side: "left",
    },
    {
      id: 3,
      title: "Temps Calmes & Repas",
      text: "Avant et après le repas du midi, il est important de faire des temps calmes afin que les enfants redescendent et se calment. Quand vient l’heure du repas, tu dois toujours assurer l’animation et t’occuper des tables.",
      side: "right",
    },
    {
      id: 4,
      title: "Activités De l’Après-Midi",
      text: "Deux situations sont possibles : avec les maternelles, il s’agit d’accompagner les enfants au temps de repos ou à la sieste. Sinon, de nouvelles activités sont proposées. C’est aussi durant l’après-midi que s’organisent les grands jeux.",
      side: "left",
    },
    {
      id: 5,
      title: "Goûter et départ",
      text: "Après le goûter, de petits jeux rapides peuvent être proposés en attendant l’arrivée des parents. Ce moment est aussi celui où les parents découvrent ton travail à travers un court temps d’échange.",
      side: "right",
    },
  ];
  return (
    <section className="map" id="map">
      <div className="container">
        <Reveal>
          <h2>C'est parti pour une journée en centre de loisirs</h2>
          <p>
            Chaque journée en centre de loisirs suit une organisation précise.
            De l’accueil aux activités en passant par les temps calmes,
            l’animateur s’adapte au rythme, à l’âge et aux besoins des enfants.
            Cette roadmap va permettre de te guider à travers les étapes clés
            d’une journée type.sdkjfndcslikhnf
          </p>
        </Reveal>
        <Reveal>
          <Buttons />
        </Reveal>
      </div>

      <div className="organisation">
        <div className="items">
          <Reveal>
            <img src={roadMap} className="roadMap" alt="Route de la journée" />
          </Reveal>

          {steps.map((step) => (
            <div key={step.id} className={`step-container step-${step.id}`}>
              <Reveal>
                <div className={`${step.side}StepCard`}>
                  <div className="stepNumber">
                    <span onClick={() => setActiveStep(step.id)}>
                      {step.id}
                    </span>
                  </div>
                  <div className="stepContent">
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>

                  {activeStep !== null && (
                    <div
                      className="modal-overlay"
                      onClick={() => setActiveStep(null)}
                    >
                      <div
                        className="modal-card"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="close-btn"
                          onClick={() => setActiveStep(null)}
                        >
                          ✕
                        </button>
                        <div className="modal-header">
                          <span>{steps[activeStep - 1].id}</span>
                          <h3>{steps[activeStep - 1].title}</h3>
                        </div>
                        <p>{steps[activeStep - 1].text}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        <div className="forms">
          <img src={form3} className="form1" alt="form" />
          <img src={form3} className="form2" alt="form" />
          <img src={form2} className="form3" alt="form" />
        </div>
      </div>
    </section>
  );
}

export default Map;
