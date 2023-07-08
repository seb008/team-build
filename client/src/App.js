import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Affaire from "./pages/affaire/Affaire";
import Modal from "react-modal";
import CreatBlocAffaire from "./pages/creatBlocAffaire/CreatBlocAffaire";
import ResultFormBlocAffaire from "./components/ResultBlocAffaire/ResultBlocAffaire";
import User from "./pages/User/User";
import SuivisAffaire from "./pages/suivisAffaire/SuivisAffaire";

// Définir l'élément racine de l'application pour l'accessibilité
Modal.setAppElement("#root");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/affaires" element={<Affaire />} />
        <Route path="/affaires/:id" element={<CreatBlocAffaire />} />
        <Route path="/users" element={<User />} />
        <Route path="/affaires/:id/suivis" element={<SuivisAffaire />} />
      </Routes>
    </Router>
  );
}

export default App;