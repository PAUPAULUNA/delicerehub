import React from "react";
import "./OrderModal.css";

const OrderModal = ({ title, onClose, isOpen, children, step }) => {
  if (!isOpen) return null;

  return (
    <div className="OrderModal">
      <div
        className={`modal-content ${
          step === 2
            ? "modal-large"
            : step === 3 || step === 4
              ? "modal-menu"
              : ""
        }`}
      >
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default OrderModal;
