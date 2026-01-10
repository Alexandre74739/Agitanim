import Hero from "../components/sections/Hero";

const Contact = () => {
  return (
    <div>
      <Hero
        title=" Un projet pour tous les enfants ? Échangeons !"
        description="Parce que j'ai vu sur le terrain qu'un bon jeu adapté peut illuminer le regard d'un enfant, je mets mon vécu au service de vos projets. Animation ou défi d'inclusion : partagez-moi votre idée. Créons ensemble ce moment magique où chaque enfant, sans exception, se sent enfin à sa place."
        showButtons={false}
        showIcons={false}
        showForm={true}
      />
    </div>
  );
};
export default Contact;