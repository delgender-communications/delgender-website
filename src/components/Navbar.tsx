import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoMark from "../assets/logo-mark.png";

type NavbarProps = {
  onBook: () => void;
};

const items = [
  { href: "/about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
];

const Navbar = ({ onBook }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <div className={`nav-backdrop${scrolled ? " show" : ""}`} />

      <header className={`navbar${scrolled ? " scrolled" : ""}`}>
        <Link to="/" className="nav-brand" onClick={handleNavClick}>
          <img
            src={logoMark}
            alt="Delgender Communications logo"
            className="nav-logo"
          />
          <span className="nav-wordmark">
            DELGENDER
            <span className="nav-wordmark-sub">COMMUNICATIONS</span>
          </span>
        </Link>

        <nav className={`nav-links${menuOpen ? " open" : ""}`}>
          <ul>
            {items.map((it) => (
              <li key={it.href}>
                <Link to={it.href} onClick={handleNavClick}>
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="nav-book-btn"
            onClick={() => {
              handleNavClick();
              onBook();
            }}
          >
            Book Appointment
          </button>
        </nav>

        <button
          className={`nav-toggle${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </header>
    </>
  );
};

export default Navbar;
