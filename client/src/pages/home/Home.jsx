import SideBar from "../../components/sideBar/SideBar.jsx";
import NavBar from "../../components/navBar/NavBar.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import "./home.scss";

const Home = () => {
  const [nombreAffaire, setNombreAffaire] = useState([]);

  useEffect(() => {
    const fetchAffaires = async () => {
      try {
        const res = await axios.get("/affaires/");
        const affaires = res.data;
        const count = affaires.length;
        setNombreAffaire(count);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAffaires();
  }, []);

  return (
    <>
      <NavBar />
      <div className="homeContainer">
        <div className="container">
        <ul>
          <li>Nombre d'Affaires en cours :{""} {nombreAffaire} </li>
          <li>wigget 2</li>
          <li>wigget 3</li>
        </ul>
        </div>
        <div className="sidebar">
          <SideBar />
        </div>
      </div>
    </>
  );
};

export default Home;
