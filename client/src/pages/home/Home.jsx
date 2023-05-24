import SideBar from "../../components/sideBar/SideBar.jsx"
import NavBar from "../../components/navBar/NavBar.jsx"
import { useEffect, useState } from "react";
import axios from "axios";
import "./home.scss";

const Home = () => {
  const [nombreAffaire, setNombreAffaire] = useState([]);

  useEffect(() => {
    const fetchAffaires = async () => {
      try {
        const res = await axios.get('/affaires/');
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
    <div className="home">
      <SideBar />
      <div className="homeContainer">
        <NavBar />
        <div className="widget">
          <ul>
            <li>Vous avez {nombreAffaire} Affaires en cours.</li>
            <li>wigget 2</li>
            <li>wigget 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
