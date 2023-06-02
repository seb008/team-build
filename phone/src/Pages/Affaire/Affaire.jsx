import BottomBar from "../../Components/BottomBar/BottomBar";
import SearchIcon from "@mui/icons-material/Search";
import List from "../../Components/List/List";
import { affairesList } from "../../listsource.js";
import "./affaire.scss";

const Affaire = () => {
  return (
    <>
      <div className="affaire">
        <h2>Affaires</h2>
        <div className="search-container">
          <SearchIcon className="search-icon" />
          <input type="text" placeholder="Rechercher..." />
        </div>
        <div className="list">
          <List info={affairesList} />
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default Affaire;
