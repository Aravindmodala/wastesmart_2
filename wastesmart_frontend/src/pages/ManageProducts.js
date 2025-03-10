import React, { useEffect, useState } from "react";
import AddProduct from "./AddProducts";
import UpdateProduct from "./Updateproduct";
import DeleteProduct from "./DeleteProduct";

function ManageProducts() {
  const vendor = JSON.parse(localStorage.getItem("vendor")); // Get vendor details
  const [selectedTab, setSelectedTab] = useState("add"); // Default tab is "add"
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vendor?.vendor_id) {
      setError("Vendor ID is missing. Please log in again.");
      setLoading(false);
      return;
    }

    fetch(`http://127.0.0.1:8000/vendors/vendors/${vendor.vendor_id}/products`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
          setError("No products found for this vendor.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, [vendor?.vendor_id]);

  // ✅ Function to delete a product
  const handleDeleteProduct = (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    fetch(`http://127.0.0.1:8000/products/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setProducts(products.filter((p) => p.id !== productId));
          alert("Product deleted successfully!");
        } else {
          alert("Failed to delete product.");
        }
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* ✅ Left Sidebar - Options */}
      <div className="w-1/4 bg-gray-800 p-6 space-y-4">
        <h2 className="text-2xl font-bold text-green-400">Manage Products</h2>
        <button
          className={`w-full py-3 rounded-lg font-bold transition ${
            selectedTab === "add" ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setSelectedTab("add")}
        >
          ➕ Add Product
        </button>
        <button
          className={`w-full py-3 rounded-lg font-bold transition ${
            selectedTab === "update" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setSelectedTab("update")}
        >
          📝 Update Product
        </button>
        <button
          className={`w-full py-3 rounded-lg font-bold transition ${
            selectedTab === "delete" ? "bg-red-500 text-white" : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setSelectedTab("delete")}
        >
          ❌ Delete Product
        </button>
      </div>

      {/* ✅ Right Side - Dynamic Content */}
      <div className="w-3/4 p-6">
        {loading ? (
          <p className="text-center text-gray-400">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {selectedTab === "add" && <AddProduct />}
            {selectedTab === "update" && <UpdateProduct vendorId={vendor?.vendor_id} />}
            {selectedTab === "delete" && <DeleteProduct products={products} handleDelete={handleDeleteProduct} />}
          </>
        )}
      </div>
    </div>
  );
}

export default ManageProducts;
