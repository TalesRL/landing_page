
import { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import Menu from "../assets/hamburguer.svg";
import Close from "../assets/close.svg";
import Button from "../components/Button";
import "../styles/header.css";
import HeroRectangleOne from "../assets/images/rectangleOne.png";
import HeroRectangleTwo from "../assets/images/rectangleTwo.png";
import "../styles/hero.css";
import Card from "../components/Card";
import Dance from "../assets/dance.svg";
import Rhythm from "../assets/rhythm.svg";
import Group from "../assets/group.svg";
import "../styles/solution.css";
import TestimonialCard from "../components/TestimonialCard";
import "../styles/testimonials.css";
import "../styles/pricing.css";
import ContactForm from "../components/ContactForm";
import "../styles/contact.css";
import Footer from "../components/Footer";

export default function Home() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        document.body.style.overflow = showMobileMenu ? "hidden" : "initial";
        return () => {
            document.body.style.overflow = "";
        };
    }, [showMobileMenu]);

    function goToSection(section: string) {
        setShowMobileMenu(false);
        window.location.hash = section;
    }

    const testimonials = [
        {
            image: HeroRectangleOne,
            name: "Mariana",
            role: "Aluna fictícia",
            text: "A dança me ajudou a ganhar confiança e encontrar uma nova forma de me expressar.",
            rating: 5
        },
        {
            image: HeroRectangleTwo,
            name: "Lucas",
            role: "Aluno fictício",
            text: "As aulas de hip-hop são uma oportunidade incrível para aprender e evoluir.",
            rating: 5
        },
        {
            image: HeroRectangleOne,
            name: "Camila",
            role: "Aluna fictícia",
            text: "Descobri que dançar vai muito além de aprender passos. É também sobre conexão.",
            rating: 4
        },
        {
            image: HeroRectangleTwo,
            name: "Rafael",
            role: "Aluno fictício",
            text: "Cada coreografia representa um desafio diferente e uma nova conquista.",
            rating: 5
        }
    ];

    return (
        <>
            <header className="site-header py-sm">
                <nav className="container flex items-center justify-between">
                    <img
                        src={Logo}
                        alt="Logo Alkin Move"
                        width={220}
                        height={64}
                    />

                    <div className="desktop-only">
                        <ul className="flex gap-1">
                            <li><a href="#hero">Início</a></li>
                            <li><a href="#solution">Modalidades</a></li>
                            <li><a href="#testimonials">Depoimentos</a></li>
                            <li><a href="#pricing">Planos</a></li>
                            <li><a href="#contact">Contato</a></li>
                        </ul>
                    </div>

                    <div className="desktop-only">
                        <Button
                            text="Aula experimental"
                            onClick={() => goToSection("contact")}
                        />
                    </div>

                    <div className="mobile-menu">
                        {showMobileMenu ? (
                            <div className="mobile-menu-content">
                                <div className="container flex">
                                    <ul>
                                        <li>
                                            <a href="#hero" onClick={() => setShowMobileMenu(false)}>
                                                Início
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#solution" onClick={() => setShowMobileMenu(false)}>
                                                Modalidades
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#testimonials" onClick={() => setShowMobileMenu(false)}>
                                                Depoimentos
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#pricing" onClick={() => setShowMobileMenu(false)}>
                                                Planos
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#contact" onClick={() => setShowMobileMenu(false)}>
                                                Contato
                                            </a>
                                        </li>
                                    </ul>

                                    <button
                                        type="button"
                                        className="btn-wrapper"
                                        aria-label="Fechar menu"
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        <img src={Close} alt="" width={24} height={24} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="btn-wrapper"
                                aria-label="Abrir menu"
                                onClick={() => setShowMobileMenu(true)}
                            >
                                <img src={Menu} alt="" width={24} height={24} />
                            </button>
                        )}
                    </div>
                </nav>
            </header>

            <main>

                <section id="hero">
                    <div className="container content">
                        <p className="desktop-only">
                            Bem-vindo à Alkin Move
                        </p>

                        <h1>
                            Seu ritmo. Seu espaço. Seu movimento.
                        </h1>

                        <p>
                            Descubra o universo do hip-hop e das danças urbanas.
                            Desenvolva suas habilidades, encontre sua identidade
                            e faça parte da nossa comunidade.
                        </p>

                        <div className="flex gap-1">
                            <span>
                                <Button
                                    text="Aula experimental"
                                    onClick={() => goToSection("contact")}
                                />
                            </span>

                            <span className="desktop-only">
                                <Button
                                    text="Conheça mais"
                                    secondary
                                    onClick={() => goToSection("solution")}
                                />
                            </span>
                        </div>
                    </div>

                    <div className="hero-images">
                        <img
                            src={HeroRectangleOne}
                            alt="Grupo de dançarinos de hip-hop"
                        />

                        <img
                            src={HeroRectangleTwo}
                            alt="Dançarinos em apresentação urbana"
                        />
                    </div>
                </section>

                <section className="container" id="solution">
                    <header>
                        <span>
                            <h2>Modalidades</h2>

                            <span className="desktop-only">
                                <h2>Encontre seu estilo. Viva seu movimento.</h2>
                            </span>
                        </span>

                        <p>
                            Na <strong>Alkin Move</strong>, acreditamos que a dança
                            é uma forma de expressão e liberdade.
                            Conheça nossas modalidades e descubra
                            o ritmo que combina com você.
                        </p>
                    </header>

                    <section className="even-columns" aria-label="Modalidades de dança">
                        <Card
                            icon={Dance}
                            title="Hip-Hop"
                            description="Aprenda movimentos, desenvolva sua musicalidade e encontre seu estilo na cultura hip-hop."
                        />

                        <Card
                            icon={Rhythm}
                            title="Danças Urbanas"
                            description="Explore diferentes ritmos, técnicas e estilos para desenvolver criatividade e expressão."
                        />

                        <Card
                            icon={Group}
                            title="Coreografias"
                            description="Participe de aulas em grupo, desenvolva sua coordenação e descubra a força de dançar em conjunto."
                        />
                    </section>
                </section>

                <section id="testimonials">
                    <header>
                        <span>
                            <p className="desktop-only">Depoimentos</p>
                            <h2>Cada movimento conta uma história.</h2>
                        </span>

                        <p>
                            Conheça experiências ilustrativas de pessoas que
                            descobriram na dança uma forma de expressão,
                            confiança e conexão.
                        </p>
                    </header>

                    <section
                        className="carousel"
                        aria-label="Depoimentos demonstrativos"
                    >
                        <div className="carousel-track">
                            <div className="carousel-content">
                                {testimonials.map((testimonial, index) => (
                                    <TestimonialCard
                                        key={index}
                                        image={testimonial.image}
                                        name={testimonial.name}
                                        role={testimonial.role}
                                        text={testimonial.text}
                                        rating={testimonial.rating}
                                    />
                                ))}
                            </div>

                            <div className="carousel-content" aria-hidden="true">
                                {testimonials.map((testimonial, index) => (
                                    <TestimonialCard
                                        key={index}
                                        image={testimonial.image}
                                        name={testimonial.name}
                                        role={testimonial.role}
                                        text={testimonial.text}
                                        rating={testimonial.rating}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </section>

                <section id="pricing" className="container">
                    <header>
                        <p className="desktop-only">Planos e preços</p>
                        <h2>Escolha seu ritmo</h2>
                        <p>Planos demonstrativos para nossa escola de dança.</p>
                    </header>

                    <section className="even-columns gap-1.5" aria-label="Planos de aulas">
                        <div className="pricing-card">
                            <span className="plan">
                                <h3>Essencial</h3>
                                <p>Para começar sua jornada no universo da dança.</p>
                            </span>

                            <span className="price">
                                <h2>R$ 99</h2>
                                <p>/mês</p>
                            </span>

                            <Button
                                text="Tenho interesse"
                                secondary
                                onClick={() => goToSection("contact")}
                            />

                            <span className="hr" />

                            <div className="features">
                                <span aria-hidden="true">✓</span>
                                <p>Uma aula por semana</p>
                            </div>

                            <div className="features">
                                <span aria-hidden="true">✓</span>
                                <p>Aulas em grupo</p>
                            </div>

                            <div className="features">
                                <span aria-hidden="true">✓</span>
                                <p>Acompanhamento do professor</p>
                            </div>
                        </div>

                        <div className="pricing-card premium">
                            <span className="bonus">
                                <p>PLANO DESTAQUE</p>
                            </span>

                            <span className="plan">
                                <h3>Move Plus</h3>
                                <p>Para quem quer se desenvolver ainda mais.</p>
                            </span>

                            <span className="price">
                                <h2>R$ 179</h2>
                                <p>/mês</p>
                            </span>

                            <Button
                                text="Tenho interesse"
                                onClick={() => goToSection("contact")}
                            />

                            <span className="hr" />

                            <div className="features">
                                <span aria-hidden="true">✓</span>
                                <p>Três aulas por semana</p>
                            </div>

                            <div className="features">
                                <span aria-hidden="true">✓</span>
                                <p>Diferentes modalidades</p>
                            </div>

                            <div className="features">
                                <span aria-hidden="true">✓</span>
                                <p>Participação em coreografias</p>
                            </div>
                        </div>
                    </section>
                </section>

                <section id="contact" className="container">
                    <header>
                        <p>Entre em contato</p>
                        <h2>Seu próximo movimento começa aqui.</h2>
                        <p>
                            Quer conhecer a Alkin Move e descobrir as modalidades
                            disponíveis? Envie sua mensagem para solicitar
                            informações sobre uma aula experimental.
                        </p>
                    </header>

                    <ContactForm />
                </section>


            </main>

            <Footer />
        </>
    );
}
