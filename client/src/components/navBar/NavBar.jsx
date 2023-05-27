import "./navBar.scss";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Team-Build</span>
        </Link>
      </div>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Recherche..." />
        </div>
      </div>
      <div className="right">
        <span>Marc </span>
      </div>
    </div>
  );
};

export default NavBar;
