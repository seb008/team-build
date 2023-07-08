import BottomBar from "../../Components/BottomBar/BottomBar";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Link } from "react-router-dom";
import Slider from "@mui/material/Slider";
import axios from "axios";
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

  const handleSliderChange = async (id, newValue) => {
    console.log("handleSliderChange", id, newValue);
    try {
      await axios.put(`/lignesMo/${id}`, { progress: newValue });
      const updatedList = list.map((bloc) => {
        if (bloc.ligneMoData) {
          bloc.ligneMoData = bloc.ligneMoData.map((ligne) => {
            if (ligne._id === id) {
              ligne.progress = newValue;
            }
            return ligne;
          });
        }
        return bloc;
      });
      setList(updatedList); // Trigger re-render
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  useEffect(() => {
    if (data) {
      const filteredData = data.filter(
        (bloc) => bloc[`idLigne${type}`].length > 0
      );
      setList(filteredData);
    }
  }, [data, type]);

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
            Jeu. 6 juill 2023
            <NavigateNextIcon className="icon" />
          </h4>
        </div>
        <div className="contain">
          {list &&
            list.map((bloc) => (
              <div
                className={`bloc ${bloc.isOpen ? "open" : ""}`}
                key={bloc._id}
              >
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
                        {ligne.duration} Jours
                      </p>
                      <p>
                        nombre de personne : {""}
                        {ligne.workersNeed}
                      </p>
                      <Slider
                        value={ligne.progress}
                        onChange={(event, newValue) =>
                          handleSliderChange(ligne._id, newValue)
                        }
                        step={10}
                        marks
                        min={0}
                        max={100}
                      />
                      <p>{ligne.progress}%</p> 
                    </div>
                  ))}
              </div>
            ))}
        </div>
        </div>    
      <BottomBar />
    </>
  );
};

export default BlocAffaire;
