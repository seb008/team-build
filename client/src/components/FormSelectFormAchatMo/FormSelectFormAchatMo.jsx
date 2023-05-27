import React, { useState } from "react";
import MoForm from "../MoForm/MoForm";
import AchatForm from "../AchatForm/AchatForm";

const FormSelectFormAchatMo = ({ idbloc, onSubmit }) => {
  const [formType, setFormType] = useState("");

  const handleSubmit = async (data) => {
    const updatedData = { ...data, formType };
    await onSubmit(updatedData);
    setFormType("");
    return Promise.resolve();
  };

  const handleSelectChange = (event) => {
    setFormType(event.target.value);
  };

  return (
    <div>
      <div className="formligne">
        <select value={formType} onChange={handleSelectChange}>
          <option value="">--Choisissez une option--</option>
          <option value="MO">MO</option>
          <option value="Achat">Achat</option>
        </select>
        {formType === "MO" && <MoForm onSubmit={handleSubmit} idbloc={idbloc} />}
        {formType === "Achat" && (
          <AchatForm onSubmit={handleSubmit} idbloc={idbloc} />
        )}
      </div>
    </div>
  );
};

export default FormSelectFormAchatMo;
