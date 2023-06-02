import BottomBar from "../../Components/BottomBar/BottomBar";
import SingleItem from "../../Components/SingleItem/SingleItem";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link, useLocation, useParams } from "react-router-dom";

import "./singleAffaire.scss";

const SingleAffaire = () => {
  const id = useParams().id; // Récupère l'ID de la page

  return (
    <>
      <div className="singleaffaire">
        <div className="singleitem">
          <SingleItem />
        </div>
        <div className="menu">
          <Link to={`/affaires/${id}/blocAffaires/remaining/Mo`} style={{ textDecoration: "none", color: "inherit" }}>
            <span>
              Tâches à réaliser <NavigateNextIcon className="icon" />
            </span>
          </Link>
          <Link to={`/affaires/${id}/blocAffaires/realize`} style={{ textDecoration: "none", color: "inherit" }}>
          <span>
            Tâches réalisées <NavigateNextIcon className="icon" />
          </span>
          </Link>
          <span>
            Documents <NavigateNextIcon className="icon" />
          </span>
          <span>
            Notifications <NavigateNextIcon className="icon" />
          </span>
          <span>
            Rapports <NavigateNextIcon className="icon" />
          </span>
          <span>
            Planning <NavigateNextIcon className="icon" />
          </span>
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default SingleAffaire;
