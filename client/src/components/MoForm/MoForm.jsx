import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./moForm.scss";

const MoForm = ({ onSubmit, idbloc, initialData, onUpdate }) => {
  const [titre, setTitre] = useState("");
  const [montant, setMontant] = useState(0);
  const [jours, setJours] = useState(0);
  const [personnes, setPersonnes] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [users, setUsers] = useState([]);

  const isUpdate = !!initialData;

  useEffect(() => {
    if (initialData) {
      setTitre(initialData.titleLigneMo);
      setMontant(initialData.montantLigneMo);
      setJours(initialData.duration);
      setPersonnes(initialData.workersNeed);
      setSelectedUserIds(initialData.workersId);
      if (Date.parse(initialData.dateStart)) {
        setStartDate(new Date(initialData.dateStart));
      }
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { titre, montant, jours, personnes };

    try {
      if (isUpdate) {
        const updatedLigneMo = await axios.put(`/lignesMo/${initialData._id}`, {
          titleLigneMo: titre,
          montantLigneMo: montant,
          duration: jours,
          workersNeed: personnes,
          dateStart: startDate,
          workersId: selectedUserIds,
        });
        console.log(updatedLigneMo);
        onUpdate();
      } else {
        const newLigneMo = await axios.post(`/lignesMo/${idbloc}`, {
          titleLigneMo: titre,
          montantLigneMo: montant,
          duration: jours,
          workersNeed: personnes,
          dateStart: startDate,
          workersId: selectedUserIds,
        });
        console.log(newLigneMo);
        onUpdate();
      }
      await onSubmit(formData);
      setTitre("");
      setMontant(0);
      setJours(0);
      setPersonnes(0);
      setSelectedUserIds([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("/users/");
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (e) => {
    const selectedId = e.target.value;
    if (!selectedUserIds.includes(selectedId)) {
      setSelectedUserIds((prev) => [...prev, selectedId]);
    }
  };

  const handleUserDelete = (id) => {
    setSelectedUserIds((prev) => prev.filter((userId) => userId !== id));
  };

  return (
    <div className="moform">
      <form onSubmit={handleSubmit}>
        <label>Titre de la tache :</label>
        <input
          type="text"
          className="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
        <label>Nom des personnes en charge de cette tache :</label>
        {selectedUserIds.map((id) => {
          const user = users.find((user) => user._id === id);
          if (user) {
            return (
              <div key={id}>
                <span>
                  {user.pseudo} - {user.name}
                </span>
                <button type="button" onClick={() => handleUserDelete(id)}>
                  Delete
                </button>
              </div>
            );
          }
        })}
        <select className="user" onChange={handleUserSelect}>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.pseudo} - {user.name}
            </option>
          ))}
        </select>

        <label>Montant de la tache :</label>
        <input
          type="number"
          className="montantmo"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
        />
        <label>Nombre de jours pour réaliser cette tache : </label>
        <div className="date">
          <select
            className="number"
            value={jours}
            onChange={(e) => setJours(e.target.value)}
          >
            {[...Array(100).keys()].map((value) => (
              <option className="option" key={value + 1} value={value + 1}>
                {value + 1}
              </option>
            ))}
          </select>

          <span>Date de Départ :</span>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <label>Nombre de personnes : </label>
        <select
          className="numberusers"
          value={personnes}
          onChange={(e) => setPersonnes(e.target.value)}
        >
          {[...Array(100).keys()].map((value) => (
            <option key={value + 1} value={value + 1}>
              {value + 1}
            </option>
          ))}
        </select>
        <button className="btn" type="submit">
          {isUpdate ? "Update" : "Valider"}
        </button>
      </form>
    </div>
  );
};

export default MoForm;
