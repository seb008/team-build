import "./moForm.scss";

import React, { useState } from "react";

const MoForm = ({ onSubmit }) => {
  const [titre, setTitre] = useState("");
  const [montant, setMontant] = useState(0);
  const [jours, setJours] = useState(0);
  const [personnes, setPersonnes] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ titre, montant, jours, personnes });
    setTitre("");
    setMontant(0);
    setJours(0);
    setPersonnes(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titre de la tache :
        <input
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
      </label>
      <br />
      <label>
        Montant de la tache :
        <input
          type="number"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
        />
      </label>
      <br />
      <label>
        Nombre de jours :
        <input
          type="number"
          value={jours}
          onChange={(e) => setJours(e.target.value)}
        />
      </label>
      <br />
      <label>
        Nombre de personnes :
        <input
          type="number"
          value={personnes}
          onChange={(e) => setPersonnes(e.target.value)}
        />{" "}
      </label>
      <br />
      <button type="submit">Valider</button>
    </form>
  );
};

export default MoForm;
