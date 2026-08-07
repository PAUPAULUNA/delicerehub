import React, { useState, useEffect } from "react";
import "./Processing.css";
import OrderCard from "../../components/shared/OrderCard";
import OrderModal from "../../components/shared/OrderModal";
import Add from "../../assets/add.png";
import tables from "../../pages/https/constants/utils/tables";
import menu from "../../pages/https/constants/utils/menu";
import MenuCard from "./MenuCard";
import ActiveOrders from "./ActiveOrders";

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
    items: [],
  });

  const [selectedCategory, setSelectedCategory] = useState(
    menu.length ? menu[0].category : "",
  );

  const activeCategory = menu.find((cat) => cat.category === selectedCategory);

  const addToCart = (item, size) => {
    setOrderData((prev) => {
      const existing = prev.items.find(
        (i) => i.id === item.id && i.size === size.name,
      );

      if (existing) {
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.id === item.id && i.size === size.name
              ? {
                  ...i,
                  quantity: i.quantity + 1,
                  subtotal: (i.quantity + 1) * i.price,
                }
              : i,
          ),
        };
      }

      return {
        ...prev,
        items: [
          ...prev.items,
          {
            id: item.id,
            name: item.name,
            size: size.name,
            price: size.price,
            quantity: 1,
            subtotal: size.price,
          },
        ],
      };
    });
  };

  const increaseQuantity = (id, size) => {
    setOrderData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id && item.size === size
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.price,
            }
          : item,
      ),
    }));
  };

  const decreaseQuantity = (id, size) => {
    setOrderData((prev) => ({
      ...prev,
      items: prev.items
        .map((item) =>
          item.id === id && item.size === size
            ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: (item.quantity - 1) * item.price,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    }));
  };

  const removeItem = (id, size) => {
    setOrderData((prev) => ({
      ...prev,
      items: prev.items.filter(
        (item) => !(item.id === id && item.size === size),
      ),
    }));
  };

  const totalItems = orderData.items.length;

  const totalQuantity = orderData.items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const total = orderData.items.reduce((sum, item) => sum + item.subtotal, 0);

  const submitOrder = () => {
    const total = orderData.items.reduce((sum, item) => sum + item.subtotal, 0);

    const newOrder = {
      id: Date.now(),

      customerName: orderData.customerName,

      orderNumber: orderData.orderNumber,

      tableId: orderData.tableId,

      guests: orderData.guests,

      items: orderData.items,

      itemCount: orderData.items.reduce((sum, item) => sum + item.quantity, 0),

      total,

      status: "Preparing",

      createdAt: new Date(),

      updatedAt: new Date(),
    };

    setActiveOrders((prev) => [...prev, newOrder]);

    setOrderData({
      customerName: "",
      orderNumber: "",
      guests: 1,
      tableId: null,
      items: [],
    });

    setStep(1);

    closeModal();
  };

  const [activeOrders, setActiveOrders] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveOrders((prev) =>
        prev.map((order) => {
          if (
            order.status === "Preparing" &&
            Date.now() - new Date(order.createdAt).getTime() >= 30000
          ) {
            return {
              ...order,
              status: "Now Serving",
              updatedAt: new Date(),
            };
          }

          return order;
        }),
      );
       setActiveOrders(prev =>
            prev.filter(order => {

                if(order.status !== "Now Serving")
                    return true;

                return (
                    Date.now() -
                    new Date(order.updatedAt).getTime()
                ) < 10000;

            })
        );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeAgo = (date) => {

    const seconds = Math.floor(
        (Date.now() - new Date(date)) / 1000
    );

    if(seconds < 60)
        return "Just now";

    const minutes = Math.floor(seconds/60);

    return `${minutes} min ago`;
};
const newOrder = {
  customerName: orderData.customerName,
  orderNumber: orderData.orderNumber,
  tableId: orderData.tableId,
  items: orderData.items,
  itemCount: orderData.items.reduce((sum, item) => sum + item.quantity, 0),
  total,
  status: "Preparing",
  createdAt: new Date(),
  updatedAt: new Date(),
};
const [orders, setOrders] = useState([]);

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
                      placeholder="Enter customer name"
                      value={orderData.customerName}
                      onChange={(e) =>
                        setOrderData((prev) => ({
                          ...prev,
                          customerName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label className="order-number-label">Order Number:</label>
                    <div className="order-number-container">
                      <input
                        type="text"
                        placeholder="Enter Order Number"
                        value={orderData.orderNumber}
                        onChange={(e) =>
                          setOrderData((prev) => ({
                            ...prev,
                            orderNumber: e.target.value,
                          }))
                        }
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
                <button
                  className="submit-btn"
                  disabled={!orderData.customerName || !orderData.orderNumber}
                  onClick={() => setStep(2)}
                >
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
                        disabled={table.status === "Occupied"}
                        className={`table-card ${table.status} ${orderData.tableId === table.id ? "selected" : ""}`}
                        onClick={() =>
                          setOrderData((prev) => ({
                            ...prev,
                            tableId: table.id,
                          }))
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
                    {activeCategory?.items?.map((item) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        addToCart={addToCart}
                      />
                    ))}
                  </div>
                </div>

                <div className="modal-footer">
                  <button onClick={() => setStep(2)}>Back</button>

                  <div className="cart-summary">
                    <div>
                      <strong>Items</strong>
                      <p>{totalItems}</p>
                    </div>

                    <div>
                      <strong>Qty</strong>
                      <p>{totalQuantity}</p>
                    </div>

                    <div>
                      <strong>Total</strong>
                      <p>₱{total.toFixed(2)}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(4)}
                    disabled={orderData.items.length === 0}
                  >
                    Proceed to Cart
                  </button>
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <div className="cart-table">
                  <div className="cart-header">
                    <span>Item</span>
                    <span>Size</span>
                    <span>Qty</span>
                    <span>Price</span>
                    <span>Subtotal</span>
                    <span>Action</span>
                  </div>

                  <div className="cart-body">
                    {orderData.items.map((item) => (
                      <div className="cart-row" key={`${item.id}-${item.size}`}>
                        <span>{item.name}</span>

                        <span>{item.size}</span>

                        <div className="qty-controls">
                          <button
                            onClick={() => decreaseQuantity(item.id, item.size)}
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() => increaseQuantity(item.id, item.size)}
                          >
                            +
                          </button>
                        </div>

                        <span>₱{item.price.toFixed(2)}</span>

                        <span>₱{item.subtotal.toFixed(2)}</span>

                        <button
                          className="remove-btn"
                          onClick={() => removeItem(item.id, item.size)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cart-total">
                    <h3>Total: ₱{total.toFixed(2)}</h3>
                  </div>
                </div>

                <div className="modal-footer">
                  <button onClick={() => setStep(3)}>Back</button>

                  <button onClick={submitOrder}>Submit Order</button>
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
          <OrderCard orders={activeOrders} />
          <ActiveOrders
    orders={orders}
    setOrders={setOrders}
/>
        </div>
      </div>
    </section>
  );
};

export default Processing;
