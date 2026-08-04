import React from 'react'
import "./TableModal.css";

const TableModal = ({title, onClose, isOpen, children}) => {
    if(!isOpen) return null;
  return (
    <div className="TableModal">
      <div className="TableModal-content">
        <div className="TableModal-header">
          <h2 className="TableModal-title">{title}</h2>
          <button className="TableModal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="TableModal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default TableModal
