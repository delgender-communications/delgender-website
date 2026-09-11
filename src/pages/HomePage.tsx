// internal
import "../App.css";
import services from "../data/services";
import processSteps from "../data/process";

type HomePageProps = {
  onBook: () => void;
};

const HomePage = ({ onBook }: HomePageProps) => {
  return (
    <div className="app-container" id="top">
      {/* hero */}
      <section className="hero">
        <span className="section-label">Delgender Communications</span>
        <h1 className="hero-title">
          We find the issue.
          <br />
          We create the solution.
          <br />
          We help you <span className="accent-text">grow</span>.
        </h1>
        <p className="hero-subtitle">
          A strategic communications and brand consultancy helping businesses
          identify what's holding them back, strategize a clear path forward,
          and elevate how the world sees them.
        </p>
        <div className="hero-actions">
          <button type="button" className="btn-primary" onClick={onBook}>
            Book an Appointment
          </button>
          <a href="#services" className="btn-ghost">
            View our services
          </a>
        </div>
      </section>

      {/* about */}
      <section className="about">
        <div className="about-card">
          <div className="about-col">
            <h3>Identify</h3>
            <p>
              We dig into your brand, your audience, and your market to pinpoint
              exactly where communication is breaking down.
            </p>
          </div>
          <div className="about-col">
            <h3>Strategize</h3>
            <p>
              We turn that insight into a clear, actionable plan built around
              your goals, not generic templates.
            </p>
          </div>
          <div className="about-col">
            <h3>Elevate</h3>
            <p>
              We execute with precision and refine as we go, so your brand keeps
              growing long after launch.
            </p>
          </div>
        </div>
      </section>

      {/* services */}
      <section className="services" id="services">
        <span className="section-label">What we do</span>
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          Every business needs to be seen clearly and heard consistently. Here's
          how we make that happen.
        </p>

        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div className="service-card" key={service.title}>
                <div className="service-icon">
                  <Icon size={22} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* process */}
      <section className="process" id="process">
        <span className="section-label">How we work</span>
        <h2 className="section-title">Our Process</h2>
        <p className="section-subtitle">
          Three simple stages take you from unclear messaging to a brand people
          remember.
        </p>

        <div className="process-grid">
          {processSteps.map((step) => (
            <div className="process-step" key={step.number}>
              <span className="process-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="cta">
        <h2 className="section-title">Ready to elevate your brand?</h2>
        <p className="section-subtitle">
          Book a free introductory call and let's talk about where your brand
          is, and where it could be.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
