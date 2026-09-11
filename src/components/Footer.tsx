import "./Footer.css";
import { FiInstagram, FiLinkedin, FiFacebook } from "react-icons/fi";
import logoMark from "../assets/logo-mark.png";

type FooterProps = {
  onBook: () => void;
};

const Footer = ({ onBook }: FooterProps) => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <img
          src={logoMark}
          alt="Delgender Communications logo"
          className="footer-logo"
        />

        <h3>Delgender Communications</h3>
        <p className="footer-tagline">Identify. Strategize. Elevate.</p>

        <button type="button" className="footer-book-btn" onClick={onBook}>
          Book an Appointment
        </button>

        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/delgender-communications-a36321429/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin className="social-icon" />
          </a>
          <a
            href="https://instagram.com/delgendercommunications"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FiInstagram className="social-icon" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61593191693003"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FiFacebook className="social-icon" />
          </a>
        </div>

        <a
          href="mailto:delgendercommunications@gmail.com"
          className="contact-link"
        >
          delgendercommunications@gmail.com
        </a>
      </div>

      <nav className="footer-legal-links" aria-label="Legal">
        <a href="/about">About</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </nav>

      <p className="footer-rights">
        © {new Date().getFullYear()} Delgender Communications | All Rights
        Reserved
      </p>
    </footer>
  );
};

export default Footer;
