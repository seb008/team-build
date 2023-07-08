import BottomBar from "../../Components/BottomBar/BottomBar";
import DomainIcon from "@mui/icons-material/Domain";
import "./home.scss";

const Home = () => {
  return (
    <>
      <div className="homecontainer">
        <div className="card">
          <DomainIcon className="icon" />
          <span>Chantier</span>
        </div>
        <div className="card">
          <DomainIcon className="icon" />
          <span>Chantier</span>
        </div>
        <div className="card">
          <DomainIcon className="icon" />
          <span>Chantier</span>
        </div>
        <div className="card">
          <DomainIcon className="icon" />
          <span>Chantier</span>
        </div>
        <div className="card">
          <DomainIcon className="icon" />
          <span>Chantier</span>
        </div>
        <div className="card">
          <DomainIcon className="icon" />
          <span>Chantier</span>
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default Home;
