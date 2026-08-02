import React from "react";
import "./InfoCards.css";

const InfoCards = ({ title, icon, number, footerNum }) => {
  return (
    <div className="cards">
      <div className="info-card">
        <h1 className="info-title">{title}</h1>
        <button
          className={`icon-button ${
            title === "Total Sales"
              ? "green-btn"
              : title === "Recent Orders"
                ? "purple-btn"
                : "yellow-btn"
          }`}
        >
          {icon}
        </button>
      </div>
      <div>
        <h1 className="numbers">{title === "Total Sales" ? `₱${number}` : number}</h1>
        <h1 className="compare">
          <span className="percentage">{footerNum}%</span> than yesterday
        </h1>
      </div>
    </div>
  );
};

export default InfoCards;
