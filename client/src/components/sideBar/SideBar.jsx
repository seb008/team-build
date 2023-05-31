import "./sideBar.scss";
import { Link, useLocation } from "react-router-dom";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NetworkPingIcon from '@mui/icons-material/NetworkPing';
import LogoutIcon from '@mui/icons-material/Logout';
const SideBar = () => {

  const location = useLocation();
  const isActive = location.pathname === "/affaires";

  return (
    <div className="sidebar">
      <div className="top">
      <span>Gestion Projet</span>
        <ul>
          <li><NotificationsNoneIcon className="icon"/>Notifications
          
          </li>
          <Link to="/affaires" style={{ textDecoration: "none" }}>
            <li className={`sidebar-item ${isActive ? "active" : ""}`}>
              <HomeWorkIcon className="icon"/>
              Affaire
            </li>
          </Link>
          <li><PersonOutlineIcon className="icon"/>Users</li>
        </ul>
      </div>
      <div className="center">
        <span>Construction Traking</span>
        <ul>
          <li><HomeWorkIcon className="icon"/>Chantier en cours</li>
          <li><NetworkPingIcon className="icon"/>Suivis Chantier</li>
        </ul>
      </div>
      <div className="bottom">
        <ul>
          <li><LogoutIcon className="icon"/>Déconnexion</li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
