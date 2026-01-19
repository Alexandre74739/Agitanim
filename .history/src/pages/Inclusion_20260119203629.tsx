import Hero from "../components/sections/Hero";
import ListeHandicap from "../components/sections/ListeHandicap";
import Separator from "../components/sections/Separator";

const Inclusion = () => {
  return (
    <div>
      <Hero title="Rendre l’animation accessible à tous"
        description="Accompagner un enfant en situation de handicap demande de la compréhension, de l’adaptation et des outils concrets. Cette section rassemble des ressources inclusives pour tous, afin de mieux accueillir chaque enfant, d’adapter les activités et de favoriser une participation réelle dans les temps de loisirs."
        showButtons={true}
        showIcons={false}
        showForm={false}
      />
      <Separator title="Pourquoi parler de handicap et d’inclusion ?"
        text="En centres de loisirs et en temps périscolaire, les équipes accueillent des enfants aux besoins très variés. Pourtant, les animateurs sont souvent peu formés, mal outillés, et se retrouvent seuls face à des situations complexes.
      Cette page est née d’un constat simple : mieux comprendre, c’est déjà mieux accompagner. Et personne ne devrait se sentir démuni sur le terrain."
      />
      <ListeHandicap />
      <Separator title="Une approche co-construite"
        text="En centres de loisirs et en temps périscolaire, les équipes accueillent des enfants aux besoins très variés. Pourtant, les animateurs sont souvent peu formés, mal outillés, et se retrouvent seuls face à des situations complexes.
        Cette page est née d’un constat simple : mieux comprendre, c’est déjà mieux accompagner. Et personne ne devrait se sentir démuni sur le terrain."
      />
    </div>
  );
};
export default Inclusion;