import React from "react";
import "./Processing.css";
import OrderCard from "../../components/shared/OrderCard";

const Processing = () => {
  return (
    <section className="process-order">
      <div className="order-taking">
        <h1 className="header-Order">Orders</h1>
        <button className="statusOrder active">All</button>
        <button className="statusOrder">Recent Orders</button>
        <button className="statusOrder">Order Status</button>
        <button className="statusOrder">Pending Payment</button>
        <div className="active-orders">
            <OrderCard />
        </div>
      </div>
    </section>
  );
};

export default Processing;
