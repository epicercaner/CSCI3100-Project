import React, { useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import FiltersAndSearch from "../common/FiltersAndSearch";

export default function IndexPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const jsonResponse = await response.json();
        setProducts(jsonResponse.data);
      } catch (err) {
        console.error("Error connecting to server:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="Index-page-container" style={{ padding: "1rem" }}>
      <div
        style={{
          margin: "2rem 0",
          padding: "1rem",
          backgroundColor: "#f9f9f9",
          border: "1px dashed #ccc",
        }}
      >
        <h3>Market Trends (Selling Quantity Graph)</h3>
        <p style={{ color: "#888" }}>
          [ Bar Chart Component will render here: Textbooks | Furniture |
          Stationary | Snacks ]
        </p>
      </div>
      <FiltersAndSearch />
      <br />
      <br />
      <div
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        Products
      </div>
      {isLoading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!isLoading && !error && (
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                condition={product.condition}
                status={product.status || "Available"}
                images={product.images}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
