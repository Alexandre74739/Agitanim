import { useRef, useState } from "react";
import { Reveal } from "../layout/Reveal";
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
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("map");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

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
            setStatus("success");
            formRef.current?.reset();
            setTimeout(() => setStatus("idle"), 3000);
          },
          () => {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
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
            <Reveal>
              <div className="input-group">
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  placeholder=" "
                  required
                />
                <label htmlFor="nom">Nom...</label>
              </div>
            </Reveal>

            <Reveal>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder=" "
                  required
                />
                <label htmlFor="email">E-mail...</label>
              </div>
            </Reveal>

            <Reveal>
              <div className="input-group">
                <textarea
                  name="message"
                  id="message"
                  placeholder=" "
                  required
                />
                <label htmlFor="message">Votre message...</label>
              </div>
            </Reveal>

            <Reveal>
              <button
                type="submit"
                className={`btn-submit ${status}`}
                disabled={status === "sending"}
              >
                {status === "idle" && "Donner vie à ce projet"}
                {status === "sending" && "Envoi en cours..."}
                {status === "success" && "Message envoyé ! ✓"}
                {status === "error" && "Erreur d'envoi"}
              </button>
            </Reveal>

            {status === "success" && (
              <span className="form-feedback success">
                <strong>✓ Succès :</strong> Votre message a bien été transmis.
                Je vous réponds sous peu.
              </span>
            )}
            {status === "error" && (
              <span className="form-feedback error">
                {" "}
                <strong>✕ Erreur :</strong> Un problème technique est survenu.
                Contactez-moi à perezalexandre430@gmail.com
              </span>
            )}
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
          <a
            className="icon-scroll"
            onClick={handleScroll}
            style={{ cursor: "pointer" }}
          >
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