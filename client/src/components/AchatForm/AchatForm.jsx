import "./achatForm.scss"
import React, { useState } from "react";

const AchatForm = ({ onSubmit }) => {
  const [titreAchat, setTitreAchat] = useState("");
  const [montantAchat, setMontantAchat] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = { titreAchat, montantAchat };
    onSubmit(result);
    setTitreAchat("");
    setMontantAchat(0);
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