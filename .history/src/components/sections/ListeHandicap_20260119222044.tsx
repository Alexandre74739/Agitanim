import { Reveal } from "../layout/Reveal";
import form1 from "../../assets/forme1.png";
import CardInclusion from "../common/CardInclusion";

function ListeHandicap() {
    return (
        <section className="liste-handicap">
            <Reveal>
                <h2>J'ai besoin d'en savoir plus sur...</h2>
            </Reveal>    <Reveal>
                <CardInclusion />
                <div className="forms">
                    <img src={form1} className="form1" alt="form" />
                <img src={form1} className="form2" alt="form" />
                </div>
            </Reveal>
        </section>
    );
} export default ListeHandicap;