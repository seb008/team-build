import React, { useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/sideBar/SideBar";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";

import "./affaire.scss";
import AffaireForm from "../../components/AffaireForm/AffaireForm";
import Datatable from "../../components/datatable/Datatable";
import { affairesColumns } from "../../datatablesourse.js";
import Modal from "../../components/Modal/Modal";



const Affaire = () => {
  const [affaireFormVisible, setAffaireFormVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAffaireFormClick = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="affaire">
      <SideBar />
      <div className="affaireContainer">
        <NavBar />
        <div className="top">
          <h1>Affaires</h1>
          <div className="affairform">
            {!affaireFormVisible && (
              <div className="button">
                <button onClick={handleAffaireFormClick}>Créer une affaire</button>
              </div>
            )}
            <Modal title="Fenêtre Modale" content={<AffaireForm />} isOpen={modalIsOpen} onClose={closeModal} />
          </div>
          <div className="listaffaire">
            <Datatable columns={affairesColumns} />
          </div>
          <div className="blocAffaire"></div>
        </div>
      </div>
    </div>
  );
};

export default Affaire;
