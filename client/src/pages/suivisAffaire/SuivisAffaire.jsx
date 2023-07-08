import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from 'date-fns';

import "./suivisAffaire.scss"

const SuivisAffaire = () => {
  const location = useLocation();
  const idAffaire = location.pathname.split("/")[2];
  const [lignesMo, setLignesMo] = useState([]);
    
  useEffect(() => {
    const fetchLigneMo = async () => {
      const response = await axios.get(`/affaires/${idAffaire}/lignesMo`);
      setLignesMo(response.data);
    };
    
    fetchLigneMo();
  }, []);

  console.log(lignesMo);
  
  return (
    <div>
      {lignesMo.map((ligne) => {
        const startDate = new Date(ligne.dateStart);
        startDate.setHours(0, 0, 0, 0); // Set start date to midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set today's date to midnight
        let dayDifference = Math.floor((startDate - today) / (1000 * 60 * 60 * 24));
        let status = '';
        let formattedDate = '';
        let color = '';

        if (dayDifference > 0) {
          status = `${dayDifference} jours restants`;
          color = dayDifference > 7 ? 'green' : 'orange';
        } else if (dayDifference < 0) {
          dayDifference = Math.abs(dayDifference);
          status = `${dayDifference} jours dépassés`;
          color = 'red';
        } else {
          status = "Date de fin aujourd'hui";
          color = 'red';
        }

        formattedDate = format(startDate, 'dd/MM/yyyy');

        return (
          <>
          <div className="bloc" key={ligne._id} style={{ color: color }}>
            <h3>{ligne.titleLigneMo}</h3>
            {ligne.dateStart && <span>{status}{" "}Date de fin prévue : {formattedDate}{" "}
            </span>}
            </div>
            <div className="progress">
            <span>réalisation de la tache acomplie a {ligne.progress}{" "}%</span>
            </div>
            </>
        );
      })}
    </div>
  );
}

export default SuivisAffaire;
