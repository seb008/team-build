import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/sideBar/SideBar";
import CreatBlocAffaire from "../../components/creatBlocAffaire/CraetBlocAffaire.jsx";
import { useState } from "react";
import axios from "axios";
import "./affaire.scss";

const Affaire = () => {
  const [formData, setFormData] = useState({
    name: "",
    adress: "",
    montantTotal: 0,
    refAffaire: "",
    description: "",
  });

  const { name, adress, montantTotal, refAffaire, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      const newAffaire = await axios.post(/affaires/, formData);
      console.log(newAffaire);
      // Traitez ici la réponse de la requête POST
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="affaire">
      <SideBar />
      <div className="affaireContainer">
        <NavBar />
        <div className="top">
          <h1>Nouvelle Affaire</h1>
          <div className="form">
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
          <div className="blocAffaire"></div>
        </div>
      </div>
    </div>
  );
};

export default Affaire;
