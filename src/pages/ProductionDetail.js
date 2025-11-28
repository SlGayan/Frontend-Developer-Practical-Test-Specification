import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();  
  
  const productId = parseInt(id);

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const imageBase = "https://evaluate.ecommexserver.site/uploads/";

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `https://evaluate.ecommexserver.site/api/v2/products/all/variant?store_id=4`
      );
      const data = await response.json();

      const found = data.find((p) => p.id === productId);
      setProduct(found);

      if (found?.color) setSelectedColor(found.color.split(",")[0]);
      if (found?.size) setSelectedSize(found.size.split(",")[0]);
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <h2>Loading product...</h2>;

  const additionalImages = product.additional_images
    ? product.additional_images.split(",")
    : [];

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select color and size");
      return;
    }

    const cartItem = {
      id: Date.now(),
      productId: product.id,
      name: product.name,
      price: product.discounted_price || product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
      image: product.cover_image,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    existingCart.push(cartItem);

    localStorage.setItem("cart", JSON.stringify(existingCart));

    navigate("/cart");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1>Product Details</h1>
      <img
        src={imageBase + product.cover_image}
        style={{ width: "350px", borderRadius: "10px" }}
        alt={product.name}
      />

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {additionalImages.map((img, i) => (
          <img
            key={i}
            src={imageBase + img}
            style={{ width: "100px", borderRadius: "8px" }}
          />
        ))}
      </div>

      <h2 style={{ marginTop: "20px" }}>{product.name}</h2>
      <p>Rs {product.discounted_price || product.price}</p>

      <h4>Colors:</h4>
      {product.color.split(",").map((c) => (
        <button
          key={c}
          onClick={() => setSelectedColor(c)}
          style={{
            padding: "8px 12px",
            marginRight: "10px",
            background: selectedColor === c ? "black" : "#ddd",
            color: selectedColor === c ? "white" : "black",
            borderRadius: "8px",
          }}
        >
          {c}
        </button>
      ))}

      <h4 style={{ marginTop: "15px" }}>Sizes:</h4>
      {product.size.split(",").map((s) => (
        <button
          key={s}
          onClick={() => setSelectedSize(s)}
          style={{
            padding: "8px 12px",
            marginRight: "10px",
            background: selectedSize === s ? "black" : "#ddd",
            color: selectedSize === s ? "white" : "black",
            borderRadius: "8px",
          }}
        >
          {s}
        </button>
      ))}

      {/* ADD TO CART BUTTON */}
      <div style={{ display:"flex", justifyContent: "start",gap: "15px", marginTop: "25px"  }}>
        <button
          onClick={handleAddToCart}
          style={{
            padding: "12px 20px",
            background: "green",
            color: "white",
            fontSize: "16px",
            borderRadius: "8px",
            cursor: "pointer",
           
          }}
        >
          Add to Cart
        </button>

        <button
          onClick={() => navigate("/Home")}
          style={{
            padding: "12px 20px",
            background: "red",
            color: "white",
            fontSize: "16px",
            borderRadius: "8px",
            cursor: "pointer",
            
          }}
        >
          Back to Products
        </button>
      </div>
    </div>
  );
}
