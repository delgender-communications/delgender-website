import "./Footer.css";
import { FiInstagram, FiLinkedin, FiFacebook } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoMark from "../assets/logo-mark.png";

type FooterProps = {
  onBook: () => void;
};

const Footer = ({ onBook: _onBook }: FooterProps) => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-col brand-col">
          <img
            src={logoMark}
            alt="Delgender Communications logo"
            className="footer-logo"
          />
          <h3>Delgender Communications</h3>
          <p className="footer-tagline">Identify. Strategize. Elevate.</p>

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
            <a
              href="https://wa.me/27606196707"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="social-icon" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <nav className="footer-nav" aria-label="Footer navigation">
            <Link to="/about">About us</Link>
            <Link to="/#services">Our services</Link>
            <Link to="/#process">How we work</Link>
          </nav>
        </div>

        {/* Legal */}
        <div className="footer-col">
          <h4 className="footer-heading">Legal</h4>
          <nav className="footer-nav" aria-label="Legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </nav>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">Contact</h4>
          <div className="footer-contact">
            <a
              href="mailto:delgendercommunications@gmail.com"
              className="contact-link"
            >
              delgendercommunications@gmail.com
            </a>
            <a href="tel:+27606196707" className="contact-link">
              +27 60 619 6707
            </a>
          </div>
        </div>
      </div>

      <p className="footer-rights">
        © {new Date().getFullYear()} Delgender Communications | All Rights
        Reserved
      </p>
    </footer>
  );
};

export default Footer;
