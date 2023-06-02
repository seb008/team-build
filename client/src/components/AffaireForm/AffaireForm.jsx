import "./affaireForm.scss";
import { useEffect, useState } from "react";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import axios from "axios";

const AffaireForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    files: [0],
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
      <div className="img">
        <LocationCityIcon className="icon" />
        <span>Ajouter une photo</span>
      </div>
      <div className="form">
      
        <form onSubmit={handleSubmit}>
          <label>Nom :</label>
          <input
            type="text"
            name="name"
            className="name"
            placeholder="Nom"
            value={name}
            onChange={handleChange}
            required
          />

          <label>Adresse :</label>
          <input
            type="text"
            name="adress"
            className="adress"
            placeholder="Adresse"
            value={adress}
            onChange={handleChange}
            required
          />

          <label>Montant Total :</label>
          <input
            type="number"
            name="montantTotal"
            className="montantTotal"
            placeholder="0"
            value={montantTotal}
            onChange={handleChange}
            required
          />

          <label>Référence de l'affaire :</label>
          <input
            type="text"
            name="refAffaire"
            className="refAffaire"
            placeholder="Réf"
            value={refAffaire}
            onChange={handleChange}
          />

          <label>Description :</label>
          <textarea
            name="description"
            className="description"
            placeholder="Déscription"
            value={description}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Créer une nouvelle affaire</button>
        </form>
      </div>
    </div>
  );
};

export default AffaireForm;
