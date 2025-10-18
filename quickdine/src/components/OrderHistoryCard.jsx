import React from "react";
import "../componentStyles/OrderHistoryCard.css"
import { CheckCircle } from "lucide-react";

export default function OrderHistoryCard() {
  const orders = [
    {
      id: "WU88191111",
      date: "Jul 6, 2021",
      total: "$160.00",
      products: [
        {
          name: "CHANEL Moon - Clutch",
          description: "Half Moon Shoulder Bag",
          qty: 3,
          price: "$700.00",
          orderId: "#2778299902Chloe",
          delivered: "January 12, 2021",
          image:
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
        },
        {
          name: 'CHANEL "Ruffle Clutch"',
          description: "Chanel Ruffle Clutch with Wristlet",
          qty: 3,
          price: "$6530.00",
          orderId: "#2778299902Chloe",
          delivered: "January 12, 2021",
          image:
            "https://images.unsplash.com/photo-1606813902794-7d68a9ddf5a7?w=400",
        },
      ],
    },
  ];

  return (
    <div className="order-history">
      <div className="order-container">
        <h1>Order History</h1>
        <p className="subtitle">
          Check the status of recent orders, manage returns, and discover similar
          products.
        </p>

        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <p>
                  <span>Order Number:</span> {order.id}
                </p>
                <p>
                  <span>Date Placed:</span> {order.date}
                </p>
                <p>
                  <span>Total Amount:</span> {order.total}
                </p>
              </div>
              <div className="order-buttons">
                <button className="outline">View Order</button>
                <button className="outline">View Invoice</button>
              </div>
            </div>

            {order.products.map((product, i) => (
              <div key={i} className="product-row">
                <div className="product-info">
                  <img src={product.image} alt={product.name} />
                  <div>
                    <h2>{product.name}</h2>
                    <p className="desc">{product.description}</p>
                    <p>Qty × {product.qty}</p>
                    <p className="order-id">Order ID: {product.orderId}</p>
                    <p className="delivered">
                      <CheckCircle size={14} color="#22c55e" /> Delivered on{" "}
                      {product.delivered}
                    </p>
                  </div>
                </div>
                <div className="product-actions">
                  <p className="price">{product.price}</p>
                  <div>
                    <button className="link">View Product</button>
                    <button className="link">Buy Again</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
