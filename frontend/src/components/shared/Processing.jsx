import React, { useState } from "react";
import "./Processing.css";
import OrderCard from "../../components/shared/OrderCard";
import OrderModal from "../../components/shared/OrderModal";
import Add from "../../assets/add.png";
import { useNavigate } from "react-router-dom";

const Processing = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [status, setStatus] = useState("all");


  return (
    <section className="process-order">
      <div className="order-taking">
        <div className="order-header">
          <button onClick={openModal} className="add-order">
            <img src={Add} className="add" alt="Add" />
          </button>

          <OrderModal isOpen={isModalOpen} onClose={closeModal} title="Create Order">
            <div>
              <label className="customer-name-label">Customer Name:</label>
              <div className="input-container">
                <input type="text" className="customer-name-input" placeholder="Enter customer name" id="" className="customer-name" />
              </div>
            </div>
          </OrderModal>

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
