// internal
import "./AboutPage.css";
import { storyIntro, storySections, storyVision } from "../data/story";
import team from "../data/team";

const AboutPage = () => {
  return (
    <div className="app-container" id="top">
      {/* Story */}
      <section className="story-hero">
        <span className="section-label">Our Story</span>
        <h1 className="story-title">Why Delgender Communications exists</h1>
        <p className="story-intro">{storyIntro}</p>
      </section>

      <section className="story-body">
        {storySections.map((section) => (
          <div className="story-section" key={section.heading}>
            <h3>{section.heading}</h3>
            <p>{section.body}</p>
          </div>
        ))}
      </section>

      <section className="story-vision">
        <span className="section-label">Our Vision</span>
        <p>{storyVision}</p>
      </section>

      {/* Team */}
      <section className="team" id="team">
        <span className="section-label">The People Behind It</span>
        <h2 className="section-title">Meet the Team</h2>
        <p className="section-subtitle">
          The people diagnosing, strategizing, and building for every brand we
          work with.
        </p>

        <div className="team-grid">
          {team.map((member) => (
            <div className="team-card" key={member.name}>
              {member.photo && (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="team-photo"
                />
              )}
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
