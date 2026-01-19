import "../common/CardInclusion"
import form1 from "../../assets/forme1.png";

function ListeHandicap() {
    return (
        <section className="liste-handicap">
            <h2>J'ai besoin d'en savoir plus sur...</h2>

            <img src={form1} className="form1" alt="form" />
            <img src={form1} className="form2" alt="form" />
        </section>
    );
} export default ListeHandicap;