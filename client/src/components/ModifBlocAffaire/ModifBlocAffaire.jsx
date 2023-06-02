import { useState } from "react";
import AchatForm from "../AchatForm/AchatForm";
import MoForm from "../MoForm/MoForm";
import FormSelectFormAchatMo from "../FormSelectFormAchatMo/FormSelectFormAchatMo";
import useFetch from "../../hooks/useFetch";
import Modal from "../Modal/Modal";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import "./modifBlocAffaire.scss";
import Tooltip from "../../Tooltip";

const ModifBlocAffaire = (props) => {
  const idBloc = props.idbloc;
  const [showForm, setShowForm] = useState(false);
  const [currentLigne, setCurrentLigne] = useState(null);
  const { data, loading, error, reFetch } = useFetch(
    `/blocAffaires/lignes/${idBloc}`
  );
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
    setModalIsOpen(false); 
    props.onUpdate();
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
        props.onUpdate();
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
            onUpdate={handleFormSubmit}
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
    <div className="modifblocaffaire">
      <div className="result">
        <table className="tableresult">
          <thead>
            <tr>
              <th className="type">Type</th>
              <th className="nom">Nom</th>
              <th className="montant">Montant</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ligne) => (
              <tr key={ligne._id}>
                <td className="type">
                  {ligne.titleLigneMo
                    ? "MO"
                    : ligne.titleLigneAchat
                    ? "Achat"
                    : ""}
                </td> 
                <td className="nom">
                  {ligne.titleLigneMo || ligne.titleLigneAchat}
                </td>
                <td className="montant">
                  {ligne.montantLigneMo || ligne.montantLigneAchat} €
                </td>
                <td className="actions">
                  <span onClick={() => handleModifier(ligne)}>
                  <Tooltip content="Modifier la ligne">
                    <EditIcon className="icon" />
                    </Tooltip>
                  </span>
                  <span onClick={() => handleSupprimer(ligne)}>
                  <Tooltip content="Supprimer la ligne">
                    <DeleteForeverIcon className="icon" />
                    </Tooltip>
                  </span>
                  <span onClick={() => handleAjouterDocument(ligne._id)}>
                  <Tooltip content="Ajouter un justificatif a la ligne">
                    <AttachEmailIcon className="icon" />
                    </Tooltip>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={handleAddBlocClick}>Ajouter une ligne au bloc</button>
        <Modal
          title="Ajouter une ligne au bloc"
          content={showForm && renderForm()}
          isOpen={modalIsOpen}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};
export default ModifBlocAffaire;
 