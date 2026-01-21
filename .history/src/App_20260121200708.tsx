import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./App.scss";

// Pages
import Home from "./pages/Home";
import Jeux from "./pages/Jeux";
import Inclusion from "./pages/Inclusion";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/RGPD/MentionsLegales";
import DroitsReserves from "./pages/RGPD/DroitsReserves";
import HandicapDetail from "./pages/HandicapDetail";

function App() {
  return (
    <Router>
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jeux" element={<Jeux />} />
          <Route path="/inclusion" element={<Inclusion />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/droits-reserves" element={<DroitsReserves />} />
          <Route path=".handicap" element={HandicapDetail}
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;