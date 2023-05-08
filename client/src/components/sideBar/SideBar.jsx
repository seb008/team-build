import "./sideBar.scss";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">team-build</span>
        </Link>
      </div>
      <div className="center">
        <ul>
          <Link to="/affaire" style={{ textDecoration: "none" }}>
            <li>
              <span>Affaire</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className=".bottom"></div>
    </div>
  );
};

export default SideBar;
