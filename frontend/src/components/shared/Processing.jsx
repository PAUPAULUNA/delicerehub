import React, { useState } from "react";
import "./Processing.css";
import OrderCard from "../../components/shared/OrderCard";
import OrderModal from "../../components/shared/OrderModal";
import Add from "../../assets/add.png";
import { useNavigate } from "react-router-dom";

const Processing = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModal] = useState(false);
  const [status, setStatus] = useState("all");

  return (
    <section className="process-order">
      <div className="order-taking">
        <div className="order-header">
          <button onClick={() => setModal(true)} className="add-order">
            <img src={Add} className="add" alt="Add" />
          </button>

          <h1 className="header-Order">Orders</h1>

          <div className="order-tabs">
            <button onClick={() => setStatus("all")} className={`statusOrder ${status === "all" ? "active" : ""}`}>All</button>
            <button onClick={() => setStatus("order status")} className={`statusOrder ${status === "order status" ? "active" : ""}`}>Order Status</button>
            <button onClick={() => setStatus("pending payment")} className={`statusOrder ${status === "pending payment" ? "active" : ""}`}>Pending Payment</button>
          </div>
        </div>

        <div className="active-orders">
          <OrderCard />
        </div>
      </div>
    </section>
  );
};

export default Processing;
