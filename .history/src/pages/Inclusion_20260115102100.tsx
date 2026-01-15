import Hero from "../components/sections/Hero";

const Inclusion = () => {
  return (
    <div>
      <Hero title="Rendre l’animation accessible à tous" 
      description="Accompagner un enfant en situation de handicap demande de la compréhension, de l’adaptation et des outils concrets. Cette section rassemble des ressources inclusives pour tous, afin de mieux accueillir chaque enfant, d’adapter les activités et de favoriser une participation réelle dans les temps de loisirs."
      showButtons={true}
      showIcons={false}
      showForm={false}
      />
      <Activites 
      showLoadMore={false}
      showInfosBtn={false}/>
    </div>
  );
};
export default Inclusion;
