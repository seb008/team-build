import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import CreatBlocAffaireComponent from "../../components/creatBlocAffaireComponenet/CraetBlocAffaireComponent";
import ResultBlocAffaire from "../../components/ResultBlocAffaire/ResultBlocAffaire";
import NavBar from "../../components/navBar/NavBar.jsx";
import { Link } from "react-router-dom";

import LocationCityIcon from "@mui/icons-material/LocationCity";
import "./creatBlocAffaire.scss";
import ResultLignesMoAchats from "../../components/ResultLignesMoAchats/ResultLignesMoAchats.jsx";

const CreatBlocAffaire = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(`/affaires/${id}`);

  console.log(data)
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="left">
          <div className="toppage">
            <div className="info">
              <h1 className="affairetitle">{data.name}</h1>
            </div>
            <div className="infoaffaire">
              <div className="top">
                <span className="affaireimg">
                  <LocationCityIcon className="icon" />
                </span>
              </div>
              <div className="autreinfo">
                <span className="affairemonatant">
                  Montant Total de l'affaire :{data.montantTotal}€
                </span>
                <span className="affaireadress">Adress : {data.adress}</span>
                <span className="affaireref">
                  reference : {data.refAffaire}
                </span>
              </div>
            </div>
          </div>
          <div className="resultblocaffaire">
            <ResultBlocAffaire id={id} />
          </div>
          <div className="formcreatblocaffairecomponent">
            <CreatBlocAffaireComponent id={id} />
          </div>
          <div>
            <ResultLignesMoAchats id={id}/>
          </div>
        </div>
        <div className="right">
          <ul>
            <li>Modifier l'Affaire</li>
            <li>Assigner des colaborateurs</li>
            <li>Centre de notification</li>
            <li>Budget</li>
            <Link to={`/affaires/${id}/suivis`}>
            <li>Taches Restantes</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CreatBlocAffaire;
