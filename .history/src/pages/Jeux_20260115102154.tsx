import Activites from "../components/sections/Activites";
import Hero from "../components/sections/Hero";

const Jeux = () => {
  return (
    <div>
      <Hero
        title=" Boostez vos animations par activités"
        description="Découvrez des activités clés en main, adaptées aux différents âges et besoins, pour accompagner chaque animateur dans la préparation de journées variées, dynamiques et inclusives."
        showButtons={true}
        showIcons={false}
        showForm={false}
      />
      <Activites
        showLoadMore={false}
        showInfosBtn={true} />
    </div>
  );
};
export default Jeux;