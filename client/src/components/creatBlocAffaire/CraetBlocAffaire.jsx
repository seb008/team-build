import "./creatBlocAffaire.scss";
import React, { useState } from "react";
import MoForm from "../MoForm/MoForm.jsx";
import AchatForm from "../AchatForm/AchatForm.jsx";


const CreatBlocAffaire = () => {
  const [formType, setFormType] = useState("");
  const [results, setResults] = useState([]);

  const handleSelectChange = (e) => {
    setFormType(e.target.value);
  };

  const handleSubmit = (result) => {
    setResults([...results, { ...result, formType }]);
  };

  return (
    <div>
      <select onChange={handleSelectChange}>
        <option value="">--Choisissez une option--</option>
        <option value="MO">MO</option>
        <option value="Achat">Achat</option>
      </select>
      {formType === "MO" && <MoForm onSubmit={handleSubmit} />}
      {formType === "Achat" && <AchatForm onSubmit={handleSubmit} />}
      <div className="container-affaire">
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              {result.formType}: {JSON.stringify(result)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreatBlocAffaire;
