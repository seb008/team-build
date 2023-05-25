import useFetch from "../../hooks/useFetch";

import "./modifBlocAffaire.scss"

const ModifBlocAffaire = (props) => {

  const idBloc = props.idbloc;
  const { data , loading, error } = useFetch(`/blocAffaires/lignes/${idBloc}`);
  //const [lignes, setLignes] = useState([]);
console.log (data)





  return (
    <div>ModifBlocAffaire
      <table className="table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((ligne) => (
                    <tr key={ligne._id}>
                      <td>{ligne.titleLigneMo || ligne.titleLigneAchat}</td>
                      <td>
                        {ligne.montantLigneMo || ligne.montantLigneAchat} €
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
    </div>

  )
}

export default ModifBlocAffaire