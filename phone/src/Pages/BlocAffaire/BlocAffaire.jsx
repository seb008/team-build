import BottomBar from "../../Components/BottomBar/BottomBar";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import {Link} from "react-router-dom";
import useFetch from "../../Hooks/useFetch";

import "./blocAffaire.scss";

const BlocAffaire = () => {
  const { id, type } = useParams();
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/affaires/bloc/${id}`);

  const handleBlocClick = async (bloc) => {
    if (bloc.ligneMoData) {
      bloc.isOpen = !bloc.isOpen;
    } else if (type === "Mo") {
      const ligneMoResponses = await Promise.all(
        bloc.idLigneMo.map((id) =>
          fetch(`/lignesMo/${id}`).then((response) => response.json())
        )
      );
      bloc.ligneMoData = ligneMoResponses; // Store ligneMoData in the bloc
      bloc.isOpen = true;
    }
    setList([...list]); // Trigger re-render
  };

  useEffect(() => {
    if (data) {
      const filteredData = data.filter(
        (bloc) => bloc[`idLigne${type}`].length > 0
      );
      setList(filteredData);
    }
  }, [data]);

  return (
    <>
      <div className="blocAffaire">
        <Link to={`/affaires/${id}`}>
        <span className="retour">
          <NavigateBeforeIcon className="icon" />
          Affaire
        </span>
        </Link>
        <div className="top">
          <h2>Taches à réaliser</h2>
          <h4>
            <NavigateBeforeIcon className="icon" />
            Jeu. 1 juin 2023
            <NavigateNextIcon className="icon" />
          </h4>
        </div>
        {list &&
          list.map((bloc) => (
            <div className={`bloc ${bloc.isOpen ? "open" : ""}`} key={bloc._id}>
              <p className="title" onClick={() => handleBlocClick(bloc)}>
                {bloc.titleBloc}
              </p>
              {bloc.isOpen &&
                bloc.ligneMoData &&
                bloc.ligneMoData.map((ligne) => (
                  <div className="card" key={ligne._id}>
                    <p className="titleligne">{ligne.titleLigneMo}</p>
                    <p>
                      nombre de jours : {""}
                      {ligne.duration}
                      {" "}Jours
                    </p>
                    <p>
                      nombre de personne : {""}
                      {ligne.workersNeed}
                    </p>
                  </div>
                ))}
            </div>
          ))}
      </div>
      <BottomBar />
    </>
  );
};

export default BlocAffaire;
