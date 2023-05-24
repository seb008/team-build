import React, { useState } from "react";
import axios from "axios";
import "./achatForm.scss";

const AchatForm = ({ onSubmit, idbloc }) => {
  const [titre, setTitre] = useState("");
  const [montant, setMontant] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { titre, montant };

    onSubmit(formData);
    setTitre("");
    setMontant(0);
    try {
      const newLigneAchat = await axios.post(`/lignesAchat/${idbloc}`, {
        titleLigneAchat :titre ,
        montantLigneAchat : montant
      });
      console.log(newLigneAchat);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Formulaire Achat</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titreAchat">Titre Achat:</label>
          <input
            type="text"
            id="titreAchat"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="montantAchat">Montant Achat:</label>
          <input
            type="number"
            id="montantAchat"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default AchatForm;