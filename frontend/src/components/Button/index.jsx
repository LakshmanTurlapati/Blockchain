import React from "react";
import "./index.css";
import { buttonStyle } from "../../util/constants";

function index({ title, type = buttonStyle.PRIMARY, callBack }) {
  const getStyle = {
    [buttonStyle.PRIMARY]: "primary-btn",
    [buttonStyle.OUTLINE]: "outline-btn",
  };

  return (
    <button onClick={callBack} className={getStyle[type]}>
      {title}
    </button>
  );
}

export default index;
