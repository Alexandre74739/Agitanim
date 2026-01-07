import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import "./App.scss";

// Pages
import Home from "./pages/Home";
import Jeux from "./pages/Jeux";
import Inclusion from "./pages/Inclusion";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      {/* Pas besoin de <> </> ici car le Router joue déjà le rôle de parent unique */}
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jeux" element={<Jeux />} />
          <Route path="/inclusion" element={<Inclusion />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Optionnel : Redirection si l'utilisateur tape une URL inexistante */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;