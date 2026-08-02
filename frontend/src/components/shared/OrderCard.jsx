import React from "react";
import "./OrderCard.css";
import preparing from "../../assets/wok.png";
import serving from "../../assets/accept.png";
import eat from "../../assets/eat.png";

const OrderCard = () => {
  return (
    <div className="OrderCard">
      <div className="Wait-list-summary">
        <ul className="serving-summary">
          <li>
            <span className="name-summary">
              John Doe<p>Order #012 :</p>
              <hr></hr>
              <div className="OrderDetails">
                <p className="DateandTime">July 30, 2026 | 3:30 PM</p>
                <p className="Quantity">
                  <img src={eat} className="quantity-image" alt="eat" />5 items
                </p>
              </div>
            </span>
            <span className="status-summary">
              <img src={serving} className="serve-up-summary" alt="Now Serving" />
              <span className="status-info-summary">
                <span className="status-text-summary">Now Serving!</span>
                <span className="update-summary">🟢Just now</span>
              </span>
            </span>
          </li>

          <li>
            <span className="name-summary">
              Jane Doe<p>Order #678 :</p>
              <hr></hr>
              <div className="OrderDetails">
                <p className="DateandTime">July 30, 2026 | 4:00 PM</p>
                <p className="Quantity">
                  <img src={eat} className="quantity-image" alt="eat" />8 items
                </p>
              </div>
            </span>
            <span className="status-summary">
              <img
                src={preparing}
                className="prepare-summary"
                alt="Preparing"
              />
              <span className="status-info-summary">
                <span className="status-text-summary">Preparing...</span>
                <span className="update-summary">🟡5 mins ago</span>
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div className="payment-list-summary">
        <div className="payment-summary">
          <ul className="item-invoice-summary">
            <li>
              <span className="name-summary">
                Steve Rogers<p>Order #900</p>
                <hr></hr>
                <div className="amount">
                  <h1>Total : </h1>
                  <h1 className="total">₱ 1, 000</h1>
                </div>
              </span>
              <button className="pay-btn-summary">Payment</button>
            </li>
            <li>
              <span className="name-summary">
                Tony Stark<p>Order #112</p>
                <hr></hr>
                <div className="amount">
                  <h1>Total : </h1>
                  <h1 className="total">₱ 1, 000</h1>
                </div>
              </span>
              <button className="pay-btn-summary">Payment</button>
            </li>
            <li>
              <span className="name-summary">
                Bruce Banner<p>Order #223</p>
                <hr></hr>
                <div className="amount">
                  <h1>Total : </h1>
                  <h1 className="total">₱ 1, 000</h1>
                </div>
              </span>
              <button className="pay-btn-summary">Payment</button>
            </li>
            <li>
              <span className="name-summary">
                Stan Lee<p>Order #344</p>
                <hr></hr>
                <div className="amount">
                  <h1>Total : </h1>
                  <h1 className="total">₱ 1, 000</h1>
                </div>
              </span>
              <button className="pay-btn-summary">Payment</button>
            </li>
            <li>
              <span className="name-summary">
                Sam Wilson<p>Order #456</p>
                <hr></hr>
                <div className="amount">
                  <h1>Total : </h1>
                  <h1 className="total">₱ 1, 000</h1>
                </div>
              </span>
              <button className="pay-btn-summary">Payment</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
