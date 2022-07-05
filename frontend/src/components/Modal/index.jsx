import React, { useEffect, useRef, useState } from "react";
import Popup from "reactjs-popup";
import "./index.css";
import "reactjs-popup/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function Index({ title, children, trigger, modalRef, open, closeModal }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) modalRef = ref;
  }, [ref]);

  return (
    <Popup
      trigger={trigger}
      ref={ref}
      position="right center"
      modal
      closeOnDocumentClick
      closeOnEscape
      open={open}
      onClose={closeModal}
    >
      <div className="modal-container">
        <div className="modal-header">
          <div className="header-title">{title}</div>
          <FontAwesomeIcon
            size="2x"
            icon={faClose}
            onClick={() => {
              ref.current.close();
              closeModal();
            }}
          />
        </div>
        <div className="modal-body-container">{children}</div>
      </div>
    </Popup>
  );
}

export default Index;
