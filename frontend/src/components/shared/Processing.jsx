import React, { useState, useEffect } from "react";
import "./Processing.css";
import OrderCard from "../../components/shared/OrderCard";
import OrderModal from "../../components/shared/OrderModal";
import Add from "../../assets/add.png";
import { useNavigate } from "react-router-dom";
import tables from "../../pages/https/constants/utils/tables";
import menu from "../../pages/https/constants/utils/menu";
import MenuCard from "./MenuCard";

const Processing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("all");
  const openModal = () => {
    setStep(1);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [orderData, setOrderData] = useState({
    customerName: "",
    orderNumber: "",
    guests: 1,
    tableId: null,
  });

  const [selectedCategory, setSelectedCategory] = useState(
    menu.length ? menu[0].category : "",
  );
  const [cart, setCart] = useState([]);

  const activeCategory = menu.find((cat) => cat.category === selectedCategory);

  
  return (
    <section className="process-order">
      <div className="order-taking">
        <div className="order-header">
          <button onClick={openModal} className="add-order">
            <img src={Add} className="add" alt="Add" />
          </button>
          <h1 className="header-Order">Orders</h1>

          <OrderModal
            isOpen={isModalOpen}
            onClose={closeModal}
            title="Create Order"
            step={step}
          >
            {step === 1 && (
              <>
                <div>
                  <label className="customer-name-label">Customer Name:</label>
                  <div className="input-container">
                    <input
                      type="text"
                      className="customer-name-input"
                      placeholder="Enter customer name"
                      id=""
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label className="order-number-label">Order Number:</label>
                    <div className="order-number-container">
                      <input
                        type="text"
                        className="order-number-input"
                        placeholder="Enter order number"
                        id=""
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="number-of-guests">Guests:</label>
                  <div className="guests-count">
                    <button
                      className="decrement"
                      onClick={() =>
                        setOrderData((prev) => ({
                          ...prev,
                          guests: Math.max(1, prev.guests - 1),
                        }))
                      }
                    >
                      &minus;
                    </button>
                    <span className="guest-count">{orderData.guests}</span>
                    <button
                      className="increment"
                      onClick={() =>
                        setOrderData((prev) => ({
                          ...prev,
                          guests: prev.guests + 1,
                        }))
                      }
                    >
                      &#43;
                    </button>
                  </div>
                </div>
                <button className="submit-btn" onClick={() => setStep(2)}>
                  Next
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <div className="table-grid">
                  <>
                    {tables.map((table) => (
                      <button
                        key={table.id}
                        disabled={table.status === "occupied"}
                        className={`table-card ${table.status} ${orderData.tableId === table.id ? "selected" : ""}`}
                        onClick={() =>
                          setOrderData({
                            ...orderData,
                            tableId: table.id,
                          })
                        }
                      >
                        <h3>{table.name}</h3>

                        <p>{table.seats} Seats</p>
                        <p>Order: {table.Order || "None"}</p>

                        <span>
                          {table.icon} {table.status}
                        </span>
                      </button>
                    ))}
                  </>
                </div>
                <div className="modal-footer">
                  <button onClick={() => setStep(step - 1)}>Back</button>

                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={!orderData.tableId}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="category-list">
                  {menu.map((category) => (
                    <button
                      key={category.category}
                      onClick={() => setSelectedCategory(category.category)}
                      className={
                        selectedCategory === category.category
                          ? "active-category"
                          : ""
                      }
                    >
                      {category.category}
                    </button>
                  ))}
                </div>

                <div className="menu-table">
                  <div className="table-header">
                    <span>Item</span>
                    <span>Size</span>
                    <span>Price</span>
                    <span></span>
                  </div>

                  <div className="menu-items">
                    {activeCategory &&
                      activeCategory.items.map((item) => (
                        <MenuCard key={item.id} item={item} />
                      ))}
                  </div>
                </div>

                <div className="modal-footer">
                  <button onClick={() => setStep(2)}>Back</button>

                  <button onClick={() => setStep(4)}>Proceed to Cart</button>
                </div>
              </>
            )}
          </OrderModal>

          <div className="order-tabs">
            <button
              onClick={() => setStatus("all")}
              className={`statusOrder ${status === "all" ? "active" : ""}`}
            >
              All
            </button>
            <button
              onClick={() => setStatus("order status")}
              className={`statusOrder ${status === "order status" ? "active" : ""}`}
            >
              Order Status
            </button>
            <button
              onClick={() => setStatus("pending payment")}
              className={`statusOrder ${status === "pending payment" ? "active" : ""}`}
            >
              Pending Payment
            </button>
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
