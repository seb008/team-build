import React, { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import "./resultBlocAffaire.scss";

const ResultBlocAffaire = ({ id }) => {
  const { data: bloc, loading, error } = useFetch(`/affaires/bloc/${id}`);
  const [activeBlocIndex, setActiveBlocIndex] = useState(null);
  const [lignes, setLignes] = useState([]);
  const [montantsLignes, setMontantsLignes] = useState([]);
  const [montantsTotals, setMontantsTotals] = useState([]);

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
        const montants = res.data.map((ligne) => ligne.montantLigneMo || ligne.montantLigneAchat);
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
            const montants = res.data.map((ligne) => ligne.montantLigneMo || ligne.montantLigneAchat);
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

  const montantTotalGlobal = montantsTotals.reduce((acc, montant) => acc + montant, 0);


  return (
    <div>
      ResultFormBlocAffaire = {montantTotalGlobal} €
      {bloc?.map((blocItem, i) => (
        <div className="blocaffaire" key={i}>
          <ul>
            <li onClick={() => toggleSousParties(i)}>
              {blocItem.titleBloc} {blocItem._id} <span>Somme des montants de toutes les lignes : {montantsTotals[i] || 0} €</span>
            </li>
          </ul>
          {i === activeBlocIndex && (
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                {lignes.map((ligne) => (
                  <tr key={ligne._id}>
                    <td>{ligne.titleLigneMo || ligne.titleLigneAchat}</td>
                    <td>{ligne.montantLigneMo || ligne.montantLigneAchat} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultBlocAffaire;