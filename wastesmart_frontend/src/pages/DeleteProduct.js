import React, { useState } from "react";

function DeleteProduct({ products, handleDelete }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const confirmDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setDeleting(true);
    setError(null);

    try {
      await handleDelete(productId);
    } catch (err) {
      setError("❌ Failed to delete product. Try again.");
      console.error("Delete error:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-red-400">❌ Delete Product</h2>

      {error && <p className="text-red-500">{error}</p>}

      {products.length === 0 ? (
        <p className="text-gray-400 mt-4">No products available to delete.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {products.map((product) => (
            <li key={product.id} className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
              <span className="text-white">{product.name} - ${product.price}</span>
              <button
                onClick={() => confirmDelete(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "❌ Delete"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DeleteProduct;
