import React, { useState } from "react";
import { createOrder } from "./api";

export default function App() {
  const [productName, setProductName] = useState("Sample product");
  const [price, setPrice] = useState(10000);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Creating order...");
    try {
      const payload = {
        productName,
        description: productName,
        price: Number(price),
        returnUrl: window.location.origin + "/success",
        cancelUrl: window.location.origin + "/cancel",
      };
      const res = await createOrder(payload);
      if (res && res.data && res.data.checkoutUrl) {
        setMessage("Redirecting to payment...");
        window.location.href = res.data.checkoutUrl;
      } else {
        setMessage(JSON.stringify(res));
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>PayOS Demo — Frontend</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div style={{ marginBottom: 8 }}>
          <label>Product name</label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Price (VND)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit">Create payment link</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
