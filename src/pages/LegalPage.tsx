import { marked } from "marked";
import { Link, useLocation } from "react-router-dom";
import "./LegalPage.css";
import privacyContent from "../content/privacy.md?raw";
import termsContent from "../content/terms.md?raw";

type LegalDoc = {
  path: string;
  label: string;
  markdown: string;
};

// both legal docs live here so the two pages can switch between each other.
// remove an entry (and its <Route> in App.tsx) if the company doesn't need it.
const legalDocs: LegalDoc[] = [
  { path: "/privacy", label: "Privacy Policy", markdown: privacyContent },
  { path: "/terms", label: "Terms of Service", markdown: termsContent },
];

const LegalPage = () => {
  const { pathname } = useLocation();
  const activeDoc =
    legalDocs.find((doc) => doc.path === pathname) ?? legalDocs[0];

  return (
    <div className="app-container legal-container" id="top">
      {legalDocs.length > 1 && (
        <nav className="legal-switcher" aria-label="Legal documents">
          {legalDocs.map((doc) => (
            <Link
              key={doc.path}
              to={doc.path}
              className={`legal-switcher-link${
                doc.path === activeDoc.path ? " active" : ""
              }`}
            >
              {doc.label}
            </Link>
          ))}
        </nav>
      )}

      <div
        className="legal-content"
        dangerouslySetInnerHTML={{
          __html: marked.parse(activeDoc.markdown) as string,
        }}
      />
    </div>
  );
};

export default LegalPage;
