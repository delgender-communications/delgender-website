// external
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// internal
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppointmentForm from "./components/AppointmentForm";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LegalPage from "./pages/LegalPage";

/** allows the "book an appointment" popup to be opened directly from an
 external link, e.g. https://your-domain.com/?book=1
 **/
const hasBookParam = () =>
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("book");

const App = () => {
  const [showAppointment, setShowAppointment] = useState(hasBookParam);
  const location = useLocation();

  useEffect(() => {
    document.title =
      "Delgender Communications | Identify. Strategize. Elevate.";

    const params = new URLSearchParams(window.location.search);
    if (params.has("book")) {
      params.delete("book");
      const cleanUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : "") +
        window.location.hash;
      window.history.replaceState({}, "", cleanUrl);
    }
  }, []);

  // jump to top on every route change
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  const openAppointment = () => setShowAppointment(true);
  const closeAppointment = () => setShowAppointment(false);

  return (
    <>
      <Navbar onBook={openAppointment} />

      <Routes>
        <Route path="/" element={<HomePage onBook={openAppointment} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<LegalPage />} />
        <Route path="/terms" element={<LegalPage />} />
      </Routes>

      <Footer onBook={openAppointment} />

      {showAppointment && <AppointmentForm onClose={closeAppointment} />}
    </>
  );
};

export default App;
