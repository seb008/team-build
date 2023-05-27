import { useState } from "react";
import AchatForm from "../AchatForm/AchatForm";
import MoForm from "../MoForm/MoForm";
import FormSelectFormAchatMo from "../FormSelectFormAchatMo/FormSelectFormAchatMo";
import useFetch from "../../hooks/useFetch";
import Modal from "../Modal/Modal";

import "./modifBlocAffaire.scss";

const ModifBlocAffaire = (props) => {
  const idBloc = props.idbloc;
  const [showForm, setShowForm] = useState(false);
  const [currentLigne, setCurrentLigne] = useState(null);
  const { data, loading, error, reFetch } = useFetch(`/blocAffaires/lignes/${idBloc}`);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAddBlocClick = () => {
    setCurrentLigne(null);
    setShowForm("select");
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    setShowForm(false);
    setCurrentLigne(null);
    await formData;
    reFetch();
    setModalIsOpen(false); // ferme la fenêtre modale
  };

  const handleModifier = (ligne) => {
    setModalIsOpen(true);
    setCurrentLigne(ligne);
    let type;
    if (ligne.titleLigneMo) {
      type = "MO";
    } else if (ligne.titleLigneAchat) {
      type = "Achat";
    }
    setShowForm(type);
  };

  const handleSupprimer = async (ligne) => {
    const userConfirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette ligne ?"
    );
    if (!userConfirmed) {
      return;
    }
    try {
      let url;
      if (ligne.titleLigneMo) {
        url = `/lignesMo/${ligne._id}/${idBloc}`;
      } else if (ligne.titleLigneAchat) {
        url = `/lignesAchat/${ligne._id}/${idBloc}`;
      }
      if (url) {
        const response = await fetch(url, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        reFetch();
      } else {
        console.log(
          "Neither titleLigneMo nor titleLigneAchat found in ligne:",
          ligne
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAjouterDocument = (idLigne) => {
    console.log("Add a document to the line with the ID:", idLigne);
  };

  const renderForm = () => {
    console.log("renderForm called with showForm:", showForm);
    switch (showForm) {
      case "Achat":
        return (
          <AchatForm
            idbloc={idBloc}
            onSubmit={handleFormSubmit}
            initialData={currentLigne}
          />
        );
      case "MO":
        return (
          <MoForm
            idbloc={idBloc}
            onSubmit={handleFormSubmit}
            initialData={currentLigne}
          />
        );
      case "select":
        return (
          <FormSelectFormAchatMo
            idbloc={idBloc}
            onSubmit={handleFormSubmit}
            initialData={currentLigne}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      ModifBlocAffaire
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Montant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ligne) => (
            <tr key={ligne._id}>
              <td>{ligne.titleLigneMo || ligne.titleLigneAchat}</td>
              <td>{ligne.montantLigneMo || ligne.montantLigneAchat} €</td>
              <td>
                <button onClick={() => handleModifier(ligne)}>Modifier</button>
                <button onClick={() => handleSupprimer(ligne)}>
                  Supprimer
                </button>
                <button onClick={() => handleAjouterDocument(ligne._id)}>
                  Ajouter un document
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleAddBlocClick}>+</button>
        <Modal
          title="Fenêtre Modale"
          content={showForm && renderForm()}
          isOpen={modalIsOpen}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default ModifBlocAffaire;
