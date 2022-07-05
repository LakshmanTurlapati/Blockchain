import React from "react";
import "./index.css";

function Index({
  name,
  placeholder,
  callBack = null,
  type = "INPUT",
  inputType,
  onTyping,
  label,
  value,
}) {
  return type === "INPUT" ? (
    <div className="input-container">
      <div>{name} : </div>
      <input
        placeholder={placeholder}
        type={inputType}
        onClick={callBack}
        onChange={onTyping}
        className="input"
        name={label}
        defaultValue={value}
      />
    </div>
  ) : (
    <div className="input-container">
      <div>{name} : </div>
      <textarea
        placeholder={placeholder}
        type={inputType}
        onClick={callBack}
        onChange={onTyping}
        name={label}
        defaultValue={value}
        className="input"
      />
    </div>
  );
}

export default Index;
