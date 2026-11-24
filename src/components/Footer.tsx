import Logo from "../assets/logo.svg";
import "../styles/footer.css";

const navLinks = [
  { href: "#hero", label: "Início" },
  { href: "#solution", label: "Modalidades" },
  { href: "#testimonials", label: "Depoimentos" },
  { href: "#pricing", label: "Planos" },
  { href: "#contact", label: "Contato" }
];

const modalities = ["Hip-Hop", "Danças Urbanas", "Coreografias"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img
            src={Logo}
            alt="Logo Alkin Move"
            width={180}
            height={52}
          />
          <p>
            Seu ritmo. Seu espaço. Seu movimento.
            Descubra o universo do hip-hop e das danças urbanas.
          </p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h3>Navegação</h3>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3>Modalidades</h3>
          <ul>
            {modalities.map((modality) => (
              <li key={modality}>
                <a href="#solution">{modality}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Comece agora</h3>
          <p>
            Agende sua aula experimental e venha fazer parte
            da nossa comunidade.
          </p>
          <a href="#contact" className="footer-cta">
            Aula experimental →
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} Alkin Move. Todos os direitos reservados.</p>
        <a href="#hero">Voltar ao topo ↑</a>
      </div>
    </footer>
  );
}
