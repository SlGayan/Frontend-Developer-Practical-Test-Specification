import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://evaluate.ecommexserver.site/api/v2/products/all/variant?store_id=4"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div 
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
      }}
    >

     
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            width: "260px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "15px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
            position: "relative",
            background: "#fff",
          }}
        >
          {/* Discount Badge */}
          {product.discounted_price && (
            
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "red",
                color: "white",
                padding: "4px 7px",
                borderRadius: "5px",
                fontSize: "13px",
              }}
            >
              {Math.round(
                ((product.price - product.discounted_price) / product.price) *
                  100
              )}
              % OFF
            </div>
          )}

          {/* Product Cover Image */}
          

          <h3
            style={{
              fontSize: "16px",
              marginTop: "10px",
              marginBottom: "5px",
            }}
          >
            {product.name}
          </h3>

          {/* Price Section */}
          <p style={{ margin: "5px 0" }}>
            {product.discounted_price ? (
              <>
                <span style={{ textDecoration: "line-through", color: "#777" }}>
                  Rs {product.price}
                </span>
                <br />
                <strong style={{ fontSize: "17px", color: "green" }}>
                  Rs {product.discounted_price}
                </strong>
              </>
            ) : (
              <strong>Rs {product.price}</strong>
            )}
          </p>

          <p style={{ margin: "5px 0" }}>
            <strong>Stock:</strong> {product.stock}
          </p>

          <p style={{ margin: "5px 0" }}>
            <strong>Size:</strong> {product.size}
          </p>

          <p style={{ margin: "5px 0" }}>
            <strong>Colors:</strong> {product.color}
          </p>

          {/* Tags */}
          <div
            style={{
              fontSize: "12px",
              color: "#666",
              marginTop: "10px",
            }}
          >
            <strong>Tags:</strong> {product.tags}
          </div>
           
          <button
            onClick={() => navigate(`/Product/${product.id}`)}
            style={{
              marginTop: "15px",
              padding: "10px 15px",
              width: "100%",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
