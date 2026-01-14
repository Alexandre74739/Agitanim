import Hero from "../components/sections/Hero";
import Map from "../components/sections/Map";
import Activites from "../components/sections/Activites";

function Home() {
  return (
    <div className="home-page">
      <Hero
        title="Découvrez le métier de l’animation"
        description="Le métier d’animateur va bien au-delà de l’enchaînement d’activités. Il joue un rôle essentiel dans le développement, l’épanouissement et l’inclusion des enfants, en s’appuyant au quotidien sur l’écoute, l’adaptation et la créativité."
        showButtons={true}
        showIcons={true}
        showForm={false}
      />
      <Map />
      <Activites 
      showInfosBtn={/>
    </div>
  );
}

export default Home;
