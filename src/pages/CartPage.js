import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
   const navigate = useNavigate();
  const imageBase = "https://evaluate.ecommexserver.site/uploads/";

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart"));
    setCart(stored);
  }, []);

  // Save cart to localStorage
  const saveCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Remove  item
  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    saveCart(updated);
  };

  // Clear all items
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  // Increase quantity
  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    saveCart(updated);
  };

  // Decrease quantity (remove if qty = 1)
  const decreaseQty = (id) => {
    let updated = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updated);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2>Your Cart</h2>
      <hr />
    
             {/* back to home */} 
      <button
          onClick={() => navigate("/Home")}
          style={{
          marginBottom: "20px",
          padding: "10px 15px",
          background: "green",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",          
            
          }}
        >
          Back to Products
        </button>

       {/*clear cart button */}
        {cart.length > 0 && (
        <button
          onClick={clearCart}
          style={{
            marginBottom: "20px",
            padding: "10px 15px",
            background: " red",
            color: "white",
            borderRadius: "5px",
            marginLeft: "25px",
            paddingLeft: "25px",
            cursor: "pointer",

          }}
        >
          Clear Cart
        </button>
      )}
       

      {/* If Cart Empty */}
      {cart.length === 0 ? (
        <h3>Your cart is empty.</h3>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #ccc",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "15px" }}>
              <img
                src={imageBase + item.image}
                width="90"
                style={{ borderRadius: "5px" }}
                alt=""
              />

              <div>
                <h4>{item.name}</h4>
                <p>Color: {item.color}</p>
                <p>Size: {item.size}</p>
                <p>Price: Rs {item.price}</p>

                <div style={{ marginTop: "10px" }}>
                  <button style={{cursor:"pointer" }} onClick={() => decreaseQty(item.id)}>-</button>
                  <span style={{ padding: "0 10px" }}>{item.quantity}</span>
                  <button style={{cursor:"pointer" }} onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>
            </div>

            {/* REMOVE BUTTON */}
            <button
              onClick={() => removeItem(item.id)}
              style={{
                background: "#222",
                color: "white",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}

      {/* Total */}
      {cart.length > 0 && (
        <>
          <h3 style={{ marginTop: "20px" }}>Total: Rs {total}</h3>
        </>
      )}
    </div>
  );
}
