import SideBar from "../../components/sideBar/SideBar.jsx";
import NavBar from "../../components/navBar/NavBar.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import graphImage from "../../asset/files/photos/graph.svg";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./home.scss";

const Home = () => {
  const [nombreAffaire, setNombreAffaire] = useState([]);
  const [affaires, setAffaires] = useState([]);

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

  useEffect(() => {
 
    axios
      .get("/affaires/")
      .then((response) => {
        const affaires = response.data;
        const requests = affaires.map((affaire) =>
          axios
            .get(`/affaires/progress/${affaire._id}`)
            .then((response) => ({
              ...affaire,
              remainingProgress: response.data.remainingProgress,
            }))
        );

        return Promise.all(requests);
      })
      .then((affairesWithProgress) => {
        setAffaires(affairesWithProgress);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des affaires:", error);
      });
  }, []);

  return (
    <>
      <NavBar />
      <div className="homeContainer">
        <div className="container">
          <div className="left">
            <div className="liste">
              <span className="title">widget 1</span>
              <ul>
                <li>Chantier en cours de realisation : {nombreAffaire}</li>
                <li>Traquer chantier en cours</li>
                <li>Justificatif achat en cours </li>
                <li>Justificatif achat a relancer</li>
              </ul>
            </div>
            <div className="graph">
              <span className="title">évolution</span>
              <img className="imggraph" src={graphImage} alt="Graph" />
            </div>
          </div>
          <div className="right">
            <div className="stat">
              <span className="title">stat</span>
              <div className="cardcontainer">
                <div
                  className="card"
                  style={{ backgroundColor: "rgb(253, 238, 0)" }}
                >
                  <div className="icon">
                    <AutorenewIcon className="icon2" />
                  </div>
                  <div className="infocard">
                    <span className="chiffre">98</span>
                    <span>Reste a realiser</span>
                  </div>
                </div>
                <div
                  className="card"
                  style={{ backgroundColor: "rgb(247, 35, 12)" }}
                >
                  <div className="icon">
                    <FormatListBulletedIcon className="icon2" />
                  </div>
                  <div className="infocard">
                    <span className="chiffre">3</span>
                    <span>Retard de réalisation</span>
                  </div>
                </div>
                <div
                  className="card"
                  style={{ backgroundColor: "rgb(1, 215, 88)" }}
                >
                  <div className="icon">
                    <DesignServicesIcon className="icon2" />
                  </div>
                  <div className="infocard">
                    <span className="chiffre">123%</span>
                    <span>Réaliser ce mois</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pourcentage">
              <span className="title">pourcentage</span>
              <div className="toppourcent">
                <div className="bloc">
                  <span>Chantier en cours</span>
                  <span className="result">
                    <ArrowUpwardIcon className="result" />
                    97 %
                  </span>
                </div>
                <div className="bloc">
                  <span>Probleme Chantier</span>
                  <span className="result">
                    <ArrowDownwardIcon className="result" />
                    22 %
                  </span>
                </div>
                <div className="bloc">
                  <span>10 derniers pourcent</span>
                  <span className="result">
                    <ArrowUpwardIcon className="result" />
                    68 %
                  </span>
                </div>
              </div>
              <div className="bottompourcent">
                <table className="tablepourcentage">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Adresse</th>
                      <th>Référence</th>
                      <th>Reste a réaliser</th>
                    </tr>
                  </thead>
                  <tbody>
                    {affaires.map((affaire) => (
                      <tr key={affaire._id}>
                        <td>{affaire.name}</td>
                        <td>{affaire.adress}</td>
                        <td>{affaire.refAffaire}</td>
                        <td>{affaire.remainingProgress}{" "}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="notification">
              <span className="title">Notification</span>
              <div className="topnotification">
                <div className="right">
                  <KeyboardArrowLeftIcon className="icon" />
                  <KeyboardArrowRightIcon className="icon" />
                  <input
                    type="text"
                    placeholder="Dernieres Notifications"
                    className="input"
                  />
                </div>
                <div className="left">
                  <label for="select">Filtrer par :</label>
                  <select className="seletleft" name="select" id="select">
                    <option value="">--Choisissez une Option--</option>
                    <option value="Taches à réaliser aujourd'hui">
                      Taches à réaliser aujourd'hui
                    </option>
                    <option value="Retour Chantier ce jour">
                      Retour Chantier ce jour
                    </option>
                    <option value="Taches en retard">Taches en retard</option>
                  </select>
                </div>
              </div>
              <div className="bottomnotification">
                <table className="tablenotification">
                  <thead>
                    <tr>
                      <th>Chantier</th>
                      <th>client</th>
                      <th>adresse</th>
                      <th>A faire</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <div className="tbodyContainer">
                    <tbody>
                      <tr>
                        <td>Dépose Couverture</td>
                        <td>Adisseo</td>
                        <td>Bourgoin Jallieu</td>
                        <td>Commander Vis</td>
                        <td style={{ backgroundColor: "rgb(1, 215, 88)" }}>
                          Prochainement
                        </td>
                      </tr>
                      <tr>
                        <td>Remplacement DEP</td>
                        <td>CIM</td>
                        <td>Lyon</td>
                        <td>Arreter Nacelle</td>
                        <td style={{ backgroundColor: "rgb(253, 238, 0)" }}>
                          Urgent
                        </td>
                      </tr>
                      <tr>
                        <td>Remplacement DEP</td>
                        <td>CIM</td>
                        <td>Lyon</td>
                        <td>Arreter Nacelle</td>
                        <td style={{ backgroundColor: "rgb(253, 238, 0)" }}>
                          Urgent
                        </td>
                      </tr>
                      <tr>
                        <td>Remplacement DEP</td>
                        <td>CIM</td>
                        <td>Lyon</td>
                        <td>Arreter Nacelle</td>
                        <td style={{ backgroundColor: "rgb(253, 238, 0)" }}>
                          Urgent
                        </td>
                      </tr>
                    </tbody>
                  </div>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar">
          <SideBar />
        </div>
      </div>
    </>
  );
};

export default Home;
