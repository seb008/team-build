import React, { useState, useEffect } from "react";
import MoForm from "../MoForm/MoForm.jsx";
import AchatForm from "../AchatForm/AchatForm.jsx";
import axios from "axios";
import ReactModal from "react-modal";

const CreatBlocAffaireComponent = ({ id }) => {
  const [formType, setFormType] = useState("");
  const [results, setResults] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [titleBloc, setTitleBloc] = useState("");
  const [idbloc, setIdBloc] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSelectChange = (e) => {
    setFormType(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitleBloc(e.target.value);
  };

  const handleSubmit = (result) => {
    setResults([...results, { ...result, formType }]);
    setFormType("");
  };

  const handleAddBlocClick = () => {
    setShowForm(true);
    setModalIsOpen(true);
  };

  const handleValidation = async (e) => {
    e.preventDefault();
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

  useEffect(() => {
    if (idbloc !== "") {
      setShowForm(false);
    }
  }, [idbloc]);



  return (
    <div>
      <ReactModal isOpen={modalIsOpen}>
        <div className="container-affaire">
        <button onClick={() => setModalIsOpen(false)}>X fermer</button>
          <span>{titleBloc}</span>
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
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.formType}</td>
                  <td>{result.titre}</td>
                  <td>{result.montant}€</td>
                  <td>{result.jours}</td>
                  <td>{result.personnes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm ? (
          <div className="formcreatbloc">
            <input
              type="text"
              value={titleBloc}
              onChange={handleTitleChange}
              placeholder="Titre du bloc"
            />
            <button onClick={handleValidation}>Valider</button>
          </div>
        ) : null}
        {idbloc !== "" && (
          <div className="formligne">
            <select onChange={handleSelectChange}>
              <option value="">--Choisissez une option--</option>
              <option value="MO">MO</option>
              <option value="Achat">Achat</option>
            </select>
            {formType === "MO" && (
              <MoForm
                onSubmit={(data) => handleSubmit(data, idbloc)}
                idbloc={idbloc}
              />
            )}
            {formType === "Achat" && (
              <AchatForm
                onSubmit={(data) => handleSubmit(data, idbloc)}
                idbloc={idbloc}
              />
            )}
          </div>
        )}
         <button onClick={() => window.location.reload()}>valider le bloc</button>
      </ReactModal>
      <button onClick={handleAddBlocClick}>+</button>
    </div>
  );
};

export default CreatBlocAffaireComponent;
