import { useEffect, useState } from "react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import axios from "axios";

import "./usersForm.scss";

const UsersForm = ({ onSubmit, id, initialData, onUpdate ,closeModal}) => {
  const [pseudo, setPseudo] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState([0]);
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const isUpdate = !!initialData;
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    if (shouldRefresh) {
      window.location.reload();
    } 
  }, [shouldRefresh]);

  useEffect(() => {
    if (initialData) {
      setPseudo(initialData.pseudo);
      setName(initialData.name);
      setImg(initialData.img);
      setFirstname(initialData.firstname);
      setEmail(initialData.email);
      setPassword(initialData.password);
      setIsAdmin(initialData.isAdmin);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { pseudo, name, img, firstname, email, password, isAdmin };
console.log (formData);
    try {
      if (isUpdate) {
        const updatedUser = await axios.put(`/users/${initialData._id}`, formData);
        console.log(updatedUser);
        onUpdate();
        closeModal();
        setShouldRefresh(true);
      } else {
        const newUser = await axios.post("/auth/register/", formData);
        console.log(newUser);
        onUpdate();
        closeModal();
        setShouldRefresh(true);
      }
      await onSubmit(formData);
      setPseudo("");
      setName("");
      setImg([0]);
      setFirstname("");
      setEmail("");
      setPassword("");
      setIsAdmin(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="userForm">
      <div className="img">
        <PersonOutlineIcon className="icon" />
        <span>Ajouter une photo</span>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label>Nom :</label>
          <input
            type="text"
            name="name"
            className="name"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Pseudo :</label>
          <input
            type="text"
            name="pseudo"
            className="pseudo"
            placeholder="pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />

          <label>Firstname :</label>
          <input
            type="text"
            name="firstname"
            className="firstname"
            placeholder="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />

          <label>Email :</label>
          <input
            type="email"
            name="email"
            className="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password :</label>
          <input
            type="password"
            name="password"
            className="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Is Admin :</label>
          <input
            type="checkbox"
            name="isAdmin"
            className="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />

          <button type="submit">{isUpdate ? "Update" : "Créer une nouvelle recrue"}</button>
        </form>
      </div>
    </div>
  );
};

export default UsersForm;
