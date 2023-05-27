import "./sideBar.scss";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="top">
      <ul>
          <Link to="/affaires" style={{ textDecoration: "none" }}>
            <li>
              <span>Affaire</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="center">
       
      </div>
      <div className=".bottom"></div>
    </div>
  );
};

export default SideBar;
