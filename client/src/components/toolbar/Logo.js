import React from "react";
import { Link } from "react-router-dom";

import cameraLogo from "../../assets/images/camera-logo.svg";

const logo = () => {
  return (
    <div className="Logo">
      <Link to="/gallery">
        <img src={cameraLogo} alt="Camera Logo" />
        <p className="title">Imglov</p>
      </Link>
    </div>
  );
};

export default logo;
