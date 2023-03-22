import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddOrder({ userId, productId, quantity, price }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/orders/addOrder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            productId,
            quantity,
            price,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to checkout");
      }

      const data = await response.json();
      console.log(data); // Do something with the response data
      setLoading(false);
      navigate("/success"); // Navigate to success page
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <button onClick={handleCheckout} disabled={loading}>
        Checkout
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
}
