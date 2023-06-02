import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Affaire from "./Pages/Affaire/Affaire";
import SingleAffaire from "./Pages/SingleAffaire/SingleAffaire";
import BlocAffaire from "./Pages/BlocAffaire/BlocAffaire";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/affaires" element={<Affaire />} />
        <Route path="/affaires/:id" element={<SingleAffaire />} />
        <Route path="/affaires/:id/blocAffaires/remaining/:type" element={<BlocAffaire />} />
        <Route path="/affaires/:id/blocAffaires/realize/:type" element={<BlocAffaire />} />
      </Routes>
    </Router>
  );
}

export default App;
