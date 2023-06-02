import React, { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

import "./resultLignesMoAchats.scss"

const ResultLignesMoAchats = ({ id }) => {
  const { data: bloc, loading, error } = useFetch(`/affaires/bloc/${id}`);
  const [montantsTotals, setMontantsTotals] = useState([]);

  useEffect(() => {
    const calculateTotals = async () => {
      if (bloc && Array.isArray(bloc)) {
        const totals = await Promise.all(
          bloc.map(async (blocItem) => {
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
      }
    };
    calculateTotals();
  }, [bloc]);
  const montantTotalGlobal = montantsTotals.reduce(
    (acc, montant) => acc + montant,
    0
  );

  return (
    <div>ResultLignesMoAchats {montantTotalGlobal}</div>
  )
}

export default ResultLignesMoAchats;
