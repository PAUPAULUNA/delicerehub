import React from "react";
import "./OrderCard.css";
import preparing from "../../assets/wok.png";
import serving from "../../assets/accept.png";
import eat from "../../assets/eat.png";

const getTimeAgo = (date) => {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);

  return `${minutes} min ago`;
};

const OrderCard = ({ orders = [] }) => {
  return (
    <div className="OrderCard">
      <div className="Wait-list-summary">
        <ul className="serving-summary">
          {orders.map((order) => (
            <li key={order.id}>
              <span className="name-summary">
                {order.customerName}
                <p>Order #{order.orderNumber}</p>
                <hr></hr>
                <div className="OrderDetails">
                  <p className="DateandTime">
                    {new Date(order.createdAt).toLocaleDateString()} |
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                  <p className="Quantity">
                    <img src={eat} className="quantity-image" alt="eat" />
                    {order.itemCount} items
                  </p>
                </div>
              </span>
              <span className="status-summary">
                <img
                      src={order?.status === "Preparing" ? preparing : serving}
                      alt={order.status}
                    />
                <span className="status-info-summary">
                  <span className="status-text-summary">{order.status}</span>
                  <span className="update-summary">
                    {getTimeAgo(order.updatedAt)}
                  </span>
                </span>
              </span>
            </li>
          ))}
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
