import React, { useState, useEffect } from "react";
import axios from "axios";
import FormSelectFormAchatMo from "../FormSelectFormAchatMo/FormSelectFormAchatMo.jsx";
import useFetch from "../../hooks/useFetch.js";
import Modal from "../Modal/Modal.jsx";

const LineTable = (props) => {
  const { lines } = props;
  console.log(lines);

  return (
    <table>
      <thead>
        <tr>
          <th>Form Type</th>
          <th>Titre</th>
          <th>Montant</th>
          <th>Jours</th>
          <th>Personnes</th>
        </tr>
      </thead>
      <tbody>
        {lines?.map((ligne) => (
          <tr key={ligne._id}>
            <td>{ligne.titleLigneMo || ligne.titleLigneAchat}</td>
            <td>{ligne.montantLigneMo || ligne.montantLigneAchat} €</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const CreatBlocAffaireComponent = ({ id }) => {
  const [showForm, setShowForm] = useState(false);
  const [titleBloc, setTitleBloc] = useState("");
  const [idbloc, setIdBloc] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleTitleChange = (e) => {
    setTitleBloc(e.target.value);
  };

  const handleAddBlocClick = () => {
    setShowForm(true);
    setModalIsOpen(true);
  };

  const handleBlocValidation = async () => {
    if (titleBloc.trim() === "") {
      console.log("Veuillez entrer un titre pour le bloc");
      return;
    }
    try {
      const newBlocAffaire = await axios.post(`/blocAffaires/${id}`, {
        titleBloc: titleBloc,
      });
      const createdBloc = newBlocAffaire.data;
      setIdBloc(createdBloc._id);
      console.log(idbloc);
    } catch (error) {
      console.log(error);
    }

    // Réinitialiser le formulaire
    setShowForm(false);
  };

  const handleLigneValidation = async () => {
    reFetch(); 
  };

  const renderModalContent = () => (
          <>
          <LineTable lines={data} />

        {showForm ? (
          <div className="formcreatbloc">
            <input
              type="text"
              value={titleBloc}
              onChange={handleTitleChange}
              placeholder="Titre du bloc"
            />
            <button onClick={handleBlocValidation}>Valider</button>
          </div>
        ) : null}
        {idbloc !== "" && (
          <div className="formligne">
            <FormSelectFormAchatMo
              idbloc={idbloc}
              onSubmit={handleLigneValidation}
            />
          </div>
        )}
        <button onClick={() => window.location.reload()}>valider le bloc</button>
          </>
          
  )

  useEffect(() => {
    if (idbloc !== "") {
      setShowForm(false);
    }
  }, [idbloc]);

  const { data, loading, error, reFetch } = useFetch(`/blocAffaires/lignes/${idbloc}`);

  return (
    <div>
      <Modal title={titleBloc} content={renderModalContent()} isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
      <button onClick={handleAddBlocClick}>+</button>
    </div>
  );
};

export default CreatBlocAffaireComponent; 
