import React from 'react'
import './ActiveOrders.css'

const ActiveOrders = ({ orders = [], setOrders }) => {

    const markAsServing = (orderNumber) => {

        setOrders(prev =>
            prev.map(order =>
                order.orderNumber === orderNumber
                    ? {
                        ...order,
                        status: "Now Serving",
                        updatedAt: new Date(),
                    }
                    : order
            )
        );

    };

    return (

        <div className="active-orders-container">

            {orders
                .filter(order => order.status === "Preparing")
                .map(order => (

                    <div
                        className="active-order-card"
                        key={order.orderNumber}
                    >

                        <div className="order-header">

                            <h3>{order.customerName}</h3>

                            <p>
                                Order #{order.orderNumber}
                            </p>

                        </div>

                        <div className="order-items">

                            {order.items.map(item => (

                                <div
                                    className="order-item"
                                    key={`${item.id}-${item.size}`}
                                >

                                    <span>
                                        {item.quantity} × {item.name}
                                    </span>

                                    <span>
                                        {item.size}
                                    </span>

                                </div>

                            ))}

                        </div>

                        <button
                            className="ready-btn"
                            onClick={() =>
                                markAsServing(order.orderNumber)
                            }
                        >
                            Ready to Serve
                        </button>

                    </div>

                ))}

        </div>

    );

};

export default ActiveOrders;
