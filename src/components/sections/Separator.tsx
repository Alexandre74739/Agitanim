import Limitation from "../../assets/limitation.png";
import { Reveal } from "../layout/Reveal";
import "./Separator.scss";

interface TextProps {
  title?: string;
  text?: string;
}

function Separator({ title, text }: TextProps) {
  return (
    <Reveal>
      <div className="separator">
        <img
          src={Limitation}
          className="footer-divider"
          alt=""
          aria-hidden="true"
        />

        <div className="text-container">
          {title && <h2>{title}</h2>}
          {text && <p>{text}</p>}
        </div>

        <img
          src={Limitation}
          className="footer-divider-inverse"
          alt=""
          aria-hidden="true"
        />
      </div>
    </Reveal>
  );
}

export default Separator;