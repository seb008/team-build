import "./affaireForm.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AffaireForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    adress: "",
    montantTotal: 0,
    refAffaire: "",
    description: "",
  });

  const { name, adress, montantTotal, refAffaire, description } = formData;

  const [shouldRefresh, setShouldRefresh] = useState(false);
  useEffect(() => {
    if (shouldRefresh) {
      window.location.reload();
    }
  }, [shouldRefresh]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAffaire = await axios.post("/affaires/", formData);
      console.log(newAffaire);
      setShouldRefresh(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="affairForm">
      <div>AffaireForm</div>
      <form onSubmit={handleSubmit}>
        <label>Nom :</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />

        <label>Adresse :</label>
        <input
          type="text"
          name="adress"
          value={adress}
          onChange={handleChange}
          required
        />

        <label>Montant Total :</label>
        <input
          type="number"
          name="montantTotal"
          value={montantTotal}
          onChange={handleChange}
          required
        />

        <label>Référence de l'affaire :</label>
        <input
          type="text"
          name="refAffaire"
          value={refAffaire}
          onChange={handleChange}
        />

        <label>Description :</label>
        <textarea
          name="description"
          value={description}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Créer une nouvelle affaire</button>
      </form>
    </div>
  );
};

export default AffaireForm;
