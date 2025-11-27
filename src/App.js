import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductionDetail";
import CartPage from "./pages/CartPage";
import './App.css'

function App() {
  return (
    <div className="app-container">
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
