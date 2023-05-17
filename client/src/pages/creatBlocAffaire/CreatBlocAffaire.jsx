import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import CreatBlocAffaireComponent from "../../components/creatBlocAffaireComponenet/CraetBlocAffaireComponent";
import ResultBlocAffaire from "../../components/ResultBlocAffaire/ResultBlocAffaire";
import "./creatBlocAffaire.scss";

const CreatBlocAffaire = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(`/affaires/${id}`);

  console.log(id);
  return (
    <div className="container">
      <div>CreatBlocAffaire</div>
      <div className="infoaffaire">
        <h1 className="affairetitle">{data.name}</h1>
        <span className="affairemonatant">
          Montant Total de l'affaire :{data.montantTotal}€
        </span>
      </div>
      <div className="resultblocaffaire">
        <ResultBlocAffaire id={id}/>
      </div>
      <div className="formcreatblocaffairecomponent">
        <CreatBlocAffaireComponent id={id} />
      </div>
    </div>
  );
};

export default CreatBlocAffaire;
