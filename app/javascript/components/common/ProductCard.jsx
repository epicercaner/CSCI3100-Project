import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlinePicture } from "react-icons/ai";

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "0",
    width: "200px",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    display: "inline-block",
    margin: "10px",
  },
  link: { textDecoration: "none" },
  imageWrapper: {
    height: "180px",
    backgroundColor: "#f9f9f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  placeholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#ccc",
  },
  placeholderText: {
    fontSize: "0.7rem",
    marginTop: "4px",
  },
  body: { padding: "12px 12px 16px 12px" },
  title: {
    fontSize: "1rem",
    margin: "0 0 0.5rem 0",
    color: "#333",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  price: {
    color: "#e60000",
    fontWeight: "bold",
    fontSize: "1.2rem",
    margin: "0 0 0.5rem 0",
  },
  metaRow: { display: "flex", justifyContent: "space-around", width: "100%" },
  badge: {
    fontSize: "0.8rem",
    color: "#666",
    backgroundColor: "#f0f0f0",
    padding: "2px 8px",
    borderRadius: "4px",
    textTransform: "capitalize",
  },
  conditionBadge: {
    fontSize: "0.8rem",
    color: "#666",
    backgroundColor: "#f0f0f0",
    padding: "2px 8px",
    borderRadius: "4px",
  },
  placeholderCondition: { height: "20px" },
};

function ProductCard({ id, name, price, condition, status, images }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = images && images.length > 0;

  return (
    <div style={styles.card}>
      <Link to={`/product/${id}`} style={styles.link}>
        <div style={styles.imageWrapper}>
          {hasImage && !imgError ? (
            <img
              src={images[0]}
              alt={name}
              style={styles.image}
              onError={() => setImgError(true)}
            />
            ) : (
            <div style={styles.placeholder}>
              <AiOutlinePicture size={48} />
              <span style={styles.placeholderText}>No Image</span>
            </div>
          )}

        </div>
      </Link>

      <div style={styles.body}>
        <h3 style={styles.title}>
          {name}
        </h3>

        <p style={styles.price}>
          ${price} HKD
        </p>

        <div style={styles.metaRow}>
          <span style={styles.badge}>
            {status}
          </span>
          {condition ? (
            <span style={styles.conditionBadge}>
              {condition}
            </span>
          ) : (
            <div style={styles.placeholderCondition}></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
