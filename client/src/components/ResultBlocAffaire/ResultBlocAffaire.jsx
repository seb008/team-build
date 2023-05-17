import useFetch from "../../hooks/useFetch";
import "./resultBlocAffaire.scss";


const ResultBlocAffaire = ({id}) => {

  const { data, loading, error } = useFetch(`/affaires/bloc/${id}`);
  console.log(data);
  return (
    <div>ResultFormBlocAffaire </div>

  )
}

export default ResultBlocAffaire