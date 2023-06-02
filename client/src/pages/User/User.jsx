import { useState } from "react";
import NavBar from "../../components/navBar/NavBar"
import SideBar from "../../components/sideBar/SideBar"
import Modal from "../../components/Modal/Modal";
import Datatable from "../../components/datatable/Datatable";
import CardView from "../../components/CardView/CardView";
import UsersForm from "../../components/UsersForm/UsersForm";
import { usersColumns } from "../../datatablesourse";
import {usersCard} from "../../cardsource";

import "./user.scss"



const User = () => {
    const [userFormVisible, setUserFormVisible] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [viewMode, setViewMode] = useState("list");
  
    const handleUserFormClick = () => {
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
    <div className="users">
      <SideBar />
      <div className="container">
      <div className="top">
            <div className="title">
              <h1>Utilisateurs :</h1>
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
            <div className="userform">
              {!userFormVisible && (
                <button className="button" onClick={handleUserFormClick}>
                  Créer un user
                </button>
              )}
              <Modal 
                title="Fenêtre Modale"
                content={<UsersForm closeModal={closeModal} onUpdate={() => console.log("Data updated!")}/>}
                isOpen={modalIsOpen}
                onClose={closeModal}
               
              />
            </div>
          </div>
          <div className="listaffaire">
            {viewMode === "list" ? (
              <Datatable columns={usersColumns} />
            ) : (
              <div className="CardView">
                <CardView info = {usersCard}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default User