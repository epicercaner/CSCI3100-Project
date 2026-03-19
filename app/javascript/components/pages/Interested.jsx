import React from "react";

export default function Interested() {
  const interests = ["here will be a list of Goods"];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Goods that interested to buy</h2>
      <ul style={{ lineHeight: "2" }}>
        {interests.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}