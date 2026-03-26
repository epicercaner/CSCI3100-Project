import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ id, name, price, condition, status, images }) {
  const thumbnailUrl =
    images && images.length > 0
      ? images[0]
      : "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "0",
        width: "200px",
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        display: "inline-block",
        margin: "10px",
      }}
    >
      <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
        <div
          style={{
            height: "180px",
            backgroundColor: "#fcfcfc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            // borderBottom: "1px solid #f0f0f0"
          }}
        >
          <img
            src={thumbnailUrl}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            // onError={(e) => {
            //   e.target.src = "https://via.placeholder.com/300x300?text=Error";
            // }}
          />
        </div>
      </Link>

      <div style={{ padding: "12px 12px 16px 12px" }}>
        <h3
          style={{
            fontSize: "1rem",
            margin: "0 0 0.5rem 0",
            color: "#333",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </h3>

        <p
          style={{
            color: "#e60000",
            fontWeight: "bold",
            fontSize: "1.2rem",
            margin: "0 0 0.5rem 0",
          }}
        >
          ${price} HKD
        </p>

        <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
          <span
            style={{
              fontSize: "0.8rem",
              color: "#666",
              backgroundColor: "#f0f0f0",
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            {status}
          </span>
          {condition ? (
            <span
              style={{
                fontSize: "0.8rem",
                color: "#666",
                backgroundColor: "#f0f0f0",
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              {condition}
            </span>
          ) : (
            <div style={{ height: "20px" }}></div>
          )}
        </div>
      </div>
    </div>
  );
}
