import React from "react";

const banner = () => {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="screen">
        <h1>Imglov - Upload your favorite images</h1>
        <div className="search">
          <i className="fas fa-search"></i>
          <input />
        </div>
        <p className="lead">
          Search for beautiful, free photos&nbsp;&nbsp;
          <i className="fas fa-arrow-down"></i>
        </p>
      </div>
    </div>
  );
};
export default banner;
