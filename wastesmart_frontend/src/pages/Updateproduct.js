import React, { useEffect, useState } from "react";

function UpdateProduct({ vendorId }) {
  const [products, setProducts] = useState([]); // Store products
  const [selectedProduct, setSelectedProduct] = useState(null); // Store selected product
  const [updatedProduct, setUpdatedProduct] = useState({}); // Store form data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch all products from the vendor
  useEffect(() => {
    if (!vendorId) {
      setError("Vendor ID is missing. Please log in again.");
      return;
    }

    fetch(`http://127.0.0.1:8000/vendors/vendors/${vendorId}/products`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Products:", data);
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
          setError("No products found for this vendor.");
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      });
  }, [vendorId]);

  // ✅ Handle product selection
  const handleSelectChange = (event) => {
    const productId = event.target.value;
    const product = products.find((p) => p.id === parseInt(productId));
    setSelectedProduct(product);
    setUpdatedProduct({ ...product });
  };

  // ✅ Handle input changes in the form
  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  // ✅ Handle product update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedProduct?.id) {
      alert("❌ Error: No product selected!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/products/products/${selectedProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) throw new Error("Failed to update product");

      alert("✅ Product updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("❌ Error updating product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-400 pt-20">📝 Update Products</h2>

      {/* ✅ Show error if products failed to load */}
      {error && <p className="text-red-500">{error}</p>}

      {/* ✅ Product Selection Dropdown */}
      <select
        onChange={handleSelectChange}
        className="w-full p-2 bg-gray-700 text-white rounded mt-4"
      >
        <option value="">Select a product to update</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name} - ${product.price}
          </option>
        ))}
      </select>

      {/* ✅ Update Form (Only show when a product is selected) */}
      {selectedProduct && (
        <form onSubmit={handleUpdateSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="name"
            value={updatedProduct.name || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="number"
            name="price"
            value={updatedProduct.price || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="number"
            name="quantity"
            value={updatedProduct.quantity || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="date"
            name="expiry_date"
            value={updatedProduct.expiry_date ? updatedProduct.expiry_date.split("T")[0] : ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            className={`w-full bg-green-500 text-white py-3 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "⏳ Updating..." : "✅ Save Changes"}
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateProduct;
