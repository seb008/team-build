import React, { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import ModifBlocAffaire from "../ModifBlocAffaire/ModifBlocAffaire";
import "./resultBlocAffaire.scss";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ResultBlocAffaire = ({ id }) => {
  const { data: bloc, loading, error } = useFetch(`/affaires/bloc/${id}`);
  const [activeBlocIndex, setActiveBlocIndex] = useState(null);
  const [lignes, setLignes] = useState([]);
  const [montantsLignes, setMontantsLignes] = useState([]);
  const [montantsTotals, setMontantsTotals] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showModifBloc, setShowModifBloc] = useState(false);
  const [totalDays, setTotalDays] = useState(0);
  const [putCompleted, setPutCompleted] = useState(false);

  const toggleSousParties = async (i) => {
    if (i === activeBlocIndex) {
      setActiveBlocIndex(null);
      setLignes([]);
      setMontantsLignes([]);
    } else {
      try {
        const res = await axios.get(`/blocAffaires/lignes/${bloc[i]._id}`);
        setLignes(res.data);
        setActiveBlocIndex(i);
        const montants = res.data.map(
          (ligne) => ligne.montantLigneMo || ligne.montantLigneAchat
        );
        setShowModifBloc(!showModifBloc);
        setMontantsLignes(montants);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const calculateTotals = async () => {
      const totals = await Promise.all(
        bloc?.map(async (blocItem) => {
          try {
            const res = await axios.get(`/blocAffaires/lignes/${blocItem._id}`);
            console.log(res.data);
            const montants = res.data.map(
              (ligne) => ligne.montantLigneMo || ligne.montantLigneAchat
            );
            const total = montants.reduce((acc, montant) => acc + montant, 0);
            return total || 0;
          } catch (err) {
            console.log(err);
            return 0;
          }
        })
      );
      setMontantsTotals(totals);
    };

    calculateTotals();
  }, [bloc]);

  useEffect(() => {
    const calculateTotalDays = async () => {
      const days = await Promise.all(
        bloc?.map(async (blocItem) => {
          try {
            const res = await axios.get(`/blocAffaires/lignes/${blocItem._id}`);
            const moLines = res.data.filter((ligne) => ligne.titleLigneMo);
            const total = moLines.reduce(
              (acc, ligne) => acc + ligne.duration,
              0
            );
            return total;
          } catch (err) {
            console.log(err);
            return 0;
          }
        })
      );
      const total = days.reduce((acc, day) => acc + day, 0);
      setTotalDays(total);
      setPutCompleted(false); 
    };

    calculateTotalDays();
  }, [bloc,putCompleted]);

  const montantTotalGlobal = montantsTotals.reduce(
    (acc, montant) => acc + montant,
    0
  );

  return (
    <div className="resultblocaffaire">
      <div className="result">
        <span>Montant Total des Blocs Affaire : = {montantTotalGlobal} €  </span>   
         <span> Nombre de jours total ={" "} {totalDays} {" "} Jrs </span> 
      </div>

      {bloc?.map(
        (blocItem, i) =>
          blocItem && (
            <div
              className={`blocaffaire ${i === activeBlocIndex ? "active" : ""}`}
              key={i}
            >
              <div className="table">
                <ul>
                  <li onClick={() => toggleSousParties(i)}>
                    <span className="titleli">{blocItem.titleBloc}</span>
                    <span className="spanli">
                      Somme des montants des lignes :
                    </span>
                    <span className="montantli">
                      {montantsTotals[i] || 0} €
                    </span>
                    <ArrowDropDownIcon className="icon" />
                  </li> 
                </ul>
              </div>
              {i === activeBlocIndex && (
                <div className="modal-content">
                   <ModifBlocAffaire idbloc={bloc[i]._id} onUpdate={setPutCompleted} />
                </div>
              )}
            </div>
          )
      )}
    </div>
  );
};

export default ResultBlocAffaire;
