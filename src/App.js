import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil.js";
import Stats from "./pages/Stats.js";
import Error from "./pages/Error.js";
import Bibliotheque from "./pages/Bibliotheque.js";
import Random from "./pages/Random.js";
import Liste_jeux from "./components/Liste_jeux.js";
import Recherche_jeux from "./pages/Recherche_jeux.js";
import DetailJeux from "./pages/DetailJeux.js";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/bibliotheque" element={<Bibliotheque />} />
        <Route path="/random" element={<Random />} />
        <Route path="/Recherche_jeux" element={<Recherche_jeux />} />
        <Route path="/detailJeux/:id" element={<DetailJeux />} />
        {/* path * pour tout les autres url */}
        <Route path="*" element={<Error />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
