import React from "react";
import "../css/tracking.css"; // add custom styles

const order = {
  orderId: "ORD123456789",
  productName: "Wireless Headphones",
  productImage: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWFycGhvbmVzfGVufDB8fDB8fHww",
  deliveryDate: "18 May, 2025",
  stages: [
    { label: "Order Placed", time: "15 May, 10:00 AM", status: "done" },
    { label: "Packed", time: "15 May, 2:00 PM", status: "done" },
    { label: "Shipped", time: "16 May, 8:00 AM", status: "current" },
    { label: "Out for Delivery", time: "18 May, 9:00 AM", status: "pending" },
    { label: "Delivered", time: "", status: "pending" },
  ],
};

const DeliveryTracking = () => {
  return (
    <div className="container py-4">
      {/* Product Info */}
      <div className="d-flex align-items-center bg-light border p-3 rounded mb-4 flex-wrap border-0 shadow-sm">
        <img
          src={order.productImage}
          alt="Product"
          className="me-3 mb-2"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
        <div>
          <h5 className="mb-1">{order.productName}</h5>
          <div className="text-muted">Order ID: {order.orderId}</div>
          <div className="text-muted">Est. Delivery: {order.deliveryDate}</div>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="tracking-timeline">
        {order.stages.map((stage, index) => (
          <div className="tracking-step d-flex" key={index}>
            <div className="icon-container">
              <div
                className={`circle ${
                  stage.status === "done"
                    ? "bg-success"
                    : stage.status === "current"
                    ? "bg-primary"
                    : "bg-secondary"
                }`}
              ></div>
              {index < order.stages.length - 1 && <div className="line"></div>}
            </div>
            <div className="ms-3">
              <div className="fw-semibold">{stage.label}</div>
              <div className="text-muted small">
                {stage.time ? stage.time : "Pending"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryTracking;
