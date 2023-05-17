import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Affaire from "./pages/affaire/Affaire";
import Modal from "react-modal";
import CreatBlocAffaire from "./pages/creatBlocAffaire/CreatBlocAffaire";
import ResultFormBlocAffaire from "./components/ResultBlocAffaire/ResultBlocAffaire";

// Définir l'élément racine de l'application pour l'accessibilité
Modal.setAppElement("#root");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/affaires" element={<Affaire />} />
        <Route path="/affaires/:id" element={<CreatBlocAffaire />} />
    
      </Routes>
    </Router>
  );
}

export default App;