import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/layout/Header";
import "./App.scss";

// Pages
import Home from "./pages/Home";
import Jeux from "./pages/Jeux";
import Inclusion from "./pages/Inclusion";
import Contact from "./pages/Contact";

// Composant pour le scroll
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jeux" element={<Jeux />} />
          <Route path="/inclusion" element={<Inclusion />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;