import React, { useState, useEffect } from "react";
import axios from "axios";
import "./achatForm.scss";
import useUpdateLigneAchat from '../../hooks/useUpdateLigneAchat';

const AchatForm = ({ onSubmit, idbloc, initialData }) => {
  const [titre, setTitre] = useState("");
  const [montant, setMontant] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const { execute } = useUpdateLigneAchat(initialData._id);

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
        await execute({ title: titre, amount: montant, file: selectedFile});
        onSubmit(formData);
      } else {
        const newLigneAchat = await axios.post(`/lignesAchat/${idbloc}`, {
          titleLigneAchat: titre,
          montantLigneAchat: montant
        });
        console.log(newLigneAchat);
        await onSubmit(formData);
      }

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
          <label htmlFor="factureAchat">Facture Achat:</label>
          <input id="factureAchat" type="file" onChange={(e) => setSelectedFile(e.target.files[0])}  />
        <button type="submit">{isUpdate ? 'Update' : 'Enregistrer'}</button>
      </form>
    </div>
  );
};

export default AchatForm;