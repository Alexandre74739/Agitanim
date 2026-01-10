import { useRef } from "react";
import emailjs from "@emailjs/browser";
import Buttons from "../common/Buttons";
import { Link } from "react-router-dom";
import contact from "../../assets/icon-contact.png";
import fleches from "../../assets/icon-fleche-double.png";
import handicap from "../../assets/icon-handicap.png";
import form1 from "../../assets/forme1.png";
import form2 from "../../assets/forme2.png";
import "./Hero.scss";

interface HeroProps {
  title: string;
  description: string;
  showIcons?: boolean;
  showButtons?: boolean;
  showForm?: boolean;
}

function Hero({
  title,
  description,
  showIcons = true,
  showButtons = true,
  showForm = false,
}: HeroProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("map");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      emailjs
        .sendForm(
          "service_b185ozm",
          "template_xd0b3kx",
          formRef.current,
          "yzwF8faERTPk67O45"
        )
        .then(
          () => {
            alert("Message envoyé avec succès !");
            formRef.current?.reset();
          },
          () => {
            alert("Erreur. Écrivez à perezalexandre430@gmail.com");
          }
        );
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <h1>{title}</h1>
        <p>{description}</p>
        
        {showButtons && <Buttons />}

        {showForm && (
          <form className="hero-form" ref={formRef} onSubmit={sendEmail}>
            <input type="text" name="nom" placeholder="Nom" required />
            <input type="email" name="email" placeholder="E-mail" required />
            <textarea name="message" placeholder="Message" rows={4} required />
            <button type="submit">Envoyer</button>
          </form>
        )}
      </div>

      {showIcons && (
        <div className="icons">
          <Link to="/contact" className="icon-contact">
            <img src={contact} alt="Contact" />
          </Link>
          <Link to="/inclusion" className="icon-handicap">
            <img src={handicap} alt="Handicap" />
          </Link>
          <a className="icon-scroll" onClick={handleScroll} style={{cursor: 'pointer'}}>
            <img src={fleches} alt="Scroll" />
          </a>
        </div>
      )}

      <div className="forms">
        <img src={form1} className="form1" alt="form" />
        <img src={form2} className="form2" alt="form" />
      </div>
    </section>
  );
}

export default Hero;