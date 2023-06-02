import useFetch from "../../Hooks/useFetch";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DomainIcon from "@mui/icons-material/Domain";
import "./singleItem.scss";

const SingleItem = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[2];
  const [list, setList] = useState();
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const { data, loading, error } = useFetch(`/${path}/${id}`);

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);
 console.log(data)
  const handleDescriptionClick = () => {
    setDescriptionOpen(!descriptionOpen);
  };

  return (
    <div className="singleItem">
      <div className="top">
        <span >
          <DomainIcon className="img"/> 
        </span>
        <h2>{data.name}</h2>
        </div>
        <div className="info">
        <label>Adresse :</label>
        <span className="adress">{data.adress}</span>
        <label>Réf :</label>
        <span className="refAffaire">{data.refAffaire}</span>
        <label
          className={`description ${descriptionOpen ? "open" : ""}`}
          onClick={handleDescriptionClick}
        >
          Description :
        </label>
        {descriptionOpen && (
          <span className="descriptionContent">{data.description}</span>
        )}
      </div>
    </div>
  );
};

export default SingleItem;
