import React from "react";

export default function PurchaseHistory() {
  const history = [
    { id: "#1001", date: "2026-01-15", item: "Premium Subscription", price: "$99" },
    { id: "#1002", date: "2026-02-10", item: "React Course", price: "$49" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Purchase History</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={tdStyle}>Order ID</th>
            <th style={tdStyle}>Date</th>
            <th style={tdStyle}>Item</th>
            <th style={tdStyle}>Price</th>
          </tr>
        </thead>
        <tbody>
          {history.map((order) => (
            <tr key={order.id}>
              <td style={tdStyle}>{order.id}</td>
              <td style={tdStyle}>{order.date}</td>
              <td style={tdStyle}>{order.item}</td>
              <td style={tdStyle}>{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tdStyle = { padding: "12px", borderBottom: "1px solid #ddd" };