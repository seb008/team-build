import React, { useState } from "react";
import axios from "axios";
import "./achatForm.scss";

const AchatForm = ({ onSubmit, idbloc }) => {
  const [titreAchat, setTitreAchat] = useState("");
  const [montantAchat, setMontantAchat] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { titreAchat, montantAchat };

    onSubmit(formData);
    setTitreAchat("");
    setMontantAchat(0);
    try {
      const newLigneAchat = await axios.post(`/lignesAchat/${idbloc}`, formData);
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
            value={titreAchat}
            onChange={(e) => setTitreAchat(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="montantAchat">Montant Achat:</label>
          <input
            type="number"
            id="montantAchat"
            value={montantAchat}
            onChange={(e) => setMontantAchat(e.target.value)}
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default AchatForm;