import React, { useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/sideBar/SideBar";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import CardView from "../../components/CardView/CardView";
import "./affaire.scss";
import AffaireForm from "../../components/AffaireForm/AffaireForm";
import Datatable from "../../components/datatable/Datatable";
import { affairesColumns } from "../../datatablesourse.js";
import Modal from "../../components/Modal/Modal";

const Affaire = () => {
  const [affaireFormVisible, setAffaireFormVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState("card");

  const handleAffaireFormClick = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleListViewClick = () => {
    setViewMode("list");
  };

  const handleCardViewClick = () => {
    setViewMode("card");
  };

  return (
    <>
      <NavBar />
      <div className="affaire">
        <SideBar />
        <div className="affaireContainer">
          <div className="top">
            <div className="title">
              <h1>Classement Affaires :</h1>
            </div>
            <div className="viewModeButtons">
              <button
                className={viewMode === "list" ? "active" : ""}
                onClick={handleListViewClick}
              >
                Liste
              </button>
              <button
                className={viewMode === "card" ? "active" : ""}
                onClick={handleCardViewClick}
              >
                Card
              </button>
            </div>
            <div className="affairform">
              {!affaireFormVisible && (
                <button className="button" onClick={handleAffaireFormClick}>
                  Créer une affaire
                </button>
              )}
              <Modal
                title="Fenêtre Modale"
                content={<AffaireForm />}
                isOpen={modalIsOpen}
                onClose={closeModal}
              />
            </div>
          </div>
          <div className="listaffaire">
            {viewMode === "list" ? (
              <Datatable columns={affairesColumns} />
            ) : (
              <div className="CardView">
                <CardView />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Affaire;
