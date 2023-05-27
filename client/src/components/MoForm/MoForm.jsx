import React, { useState, useEffect } from "react";
import axios from "axios";
import "./moForm.scss";

const MoForm = ({ onSubmit, idbloc, initialData }) => {
  const [titre, setTitre] = useState("");
  const [montant, setMontant] = useState(0);
  const [jours, setJours] = useState(0);
  const [personnes, setPersonnes] = useState(0);

  const isUpdate = !!initialData;

  useEffect(() => {
    if (initialData) {
      setTitre(initialData.titleLigneMo);
      setMontant(initialData.montantLigneMo);
      setJours(initialData.duration);
      setPersonnes(initialData.workersNeed);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { titre, montant, jours, personnes };
  

    try {
      if (isUpdate) {
        const updatedLigneMo = await axios.put(`/lignesMo/${idbloc}/${initialData._id}`, {
          titleLigneMo: titre,
          montantLigneMo: montant,
          duration: jours,
          workersNeed: personnes,
        });
        console.log(updatedLigneMo);
      } else {
        const newLigneMo = await axios.post(`/lignesMo/${idbloc}`, {
          titleLigneMo : titre,
          montantLigneMo : montant,
          duration : jours ,
          workersNeed : personnes,
        });
        console.log(newLigneMo);
      }
      await onSubmit(formData);
      setTitre("");
      setMontant(0);
      setJours(0);
      setPersonnes(0);
    } catch (error) {
      console.log(error);
    }
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
        />
      </label>
      <br />
      <button type="submit">{isUpdate ? 'Update' : 'Valider'}</button>
    </form>
  );
};

export default MoForm;