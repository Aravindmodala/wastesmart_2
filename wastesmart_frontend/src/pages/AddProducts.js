import { useState } from "react";

function AddProduct() {
  const vendor = JSON.parse(localStorage.getItem("vendor")) || {};
  const [product, setProduct] = useState({ name: "", price: "", quantity: "", expiry_date: "" });
  const [message, setMessage] = useState(""); // For success/error feedback

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Input Validations
    if (!vendor.vendor_id) {
      setMessage("❌ Vendor information missing. Please log in again.");
      return;
    }
    if (product.price <= 0 || product.quantity <= 0) {
      setMessage("❌ Price and quantity must be greater than zero.");
      return;
    }
    if (new Date(product.expiry_date) < new Date()) {
      setMessage("❌ Expiry date cannot be in the past.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/products/products/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, vendor_id: vendor.vendor_id }),
      });

      if (response.ok) {
        setMessage("✅ Product added successfully!");
        setProduct({ name: "", price: "", quantity: "", expiry_date: "" });
      } else {
        setMessage("❌ Failed to add product.");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      setMessage("❌ Network error. Try again later.");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-green-400">➕ Add Product</h2>
      {message && <p className="text-white p-2 mt-2 bg-gray-800 rounded">{message}</p>}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input type="text" name="name" placeholder="Product Name" required value={product.name} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white" />
        <input type="number" name="price" placeholder="Price ($)" required value={product.price} min="0.01" step="0.01" onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white" />
        <input type="number" name="quantity" placeholder="Quantity" required value={product.quantity} min="1" onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white" />
        <input type="date" name="expiry_date" required value={product.expiry_date} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white" />
        <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg">✅ Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
