import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DomainIcon from "@mui/icons-material/Domain";
import ConstructionIcon from "@mui/icons-material/Construction";
import LogoutIcon from "@mui/icons-material/Logout";

import "./bottomBar.scss";

const BottomBar = () => {
  const location = useLocation();

  return (
    <div className="bottom-bar">
      <Link to="/">
        <div
          className={`icon-container ${
            location.pathname === "/" ? "active" : ""
          }`}
        >
          <i className="iconhome">
            <HomeIcon className="icon" />
          </i>
        </div>
      </Link>
      <Link to="/affaires">
        <div
          className={`icon-container ${
            location.pathname === "/affaires" ? "active" : ""
          }`}
        >
          <i className="iconaffaire">
            <DomainIcon className="icon" />
          </i>
        </div>
      </Link>
      <div className="icon-container">
        <i className="iconwork">
          <ConstructionIcon className="icon" />
        </i>
      </div>
      <div className="icon-container">
        <i className="iconlogout">
          <LogoutIcon className="icon" />
        </i>
      </div>
    </div>
  );
};

export default BottomBar;
