import React from "react";
import "./index.css";
import LoaderIcon from "../../assets/loader.gif";
import Popup from "reactjs-popup";

function Index({ children }) {
  return (
    <div className="loader">
      <div className="loader-container">{children}</div>
    </div>
  );
}

export default Index;
