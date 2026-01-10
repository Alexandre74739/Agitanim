import Hero from "../components/sections/Hero";
import { Reveal } from "../components/layout/Reveal";

function Home() {
  return (
    <div className="home-page">
        <Hero />

      {/* Section animé au scroll */}
      <div style={{ padding: "100px 0" }}>
        <Reveal>
          <h1 style={{ textAlign: "center" }}>Salut, je suis une section animée</h1>
        </Reveal>
        
        <div style={{ height: "50vh" }} /> {/* Espace vide temporaire pour forcer le scroll */}

        <Reveal>
          <h1 style={{ textAlign: "center" }}>Et moi j'apparais plus tard !</h1>
        </Reveal>
      </div>
    </div>
  );
}

export default Home;