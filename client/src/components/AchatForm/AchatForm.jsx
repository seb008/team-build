import React, { useState, useEffect } from "react";
import axios from "axios";
import "./achatForm.scss";

const AchatForm = ({ onSubmit, idbloc, initialData }) => {
  const [titre, setTitre] = useState("");
  const [montant, setMontant] = useState(0);
  const isUpdate = !!initialData;

  useEffect(() => {
    if (initialData) {
      setTitre(initialData.titleLigneAchat);
      setMontant(initialData.montantLigneAchat);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { titre, montant };
  

    try {
      if (isUpdate) {
        const updatedLigneAchat = await axios.put(`/lignesAchat/${initialData._id}`, {
          titleLigneAchat: titre,
          montantLigneAchat: montant
        });
        console.log(updatedLigneAchat);
      } else {
        const newLigneAchat = await axios.post(`/lignesAchat/${idbloc}`, {
          titleLigneAchat: titre,
          montantLigneAchat: montant
        });
        console.log(newLigneAchat);
      }
      await onSubmit(formData);
      setTitre("");
      setMontant(0);
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="achatform">
      
      <form onSubmit={handleSubmit}>
          <label htmlFor="titreAchat">Titre Achat:</label>
          <input
            type="text"
            id="titreAchat"
            className="titreAchat"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
          <label htmlFor="montantAchat">Montant Achat:</label>
          <input
            type="number"
            id="montantAchat"
            className="montantAchat"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
          />
        <button type="submit">{isUpdate ? 'Update' : 'Enregistrer'}</button>
      </form>
    </div>
  );
};

export default AchatForm;