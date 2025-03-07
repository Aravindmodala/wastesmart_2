import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/products/products/";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(10);
  const [expiryDays, setExpiryDays] = useState(30);
  const [inStock, setInStock] = useState(false);
  const [expiringSoon, setExpiringSoon] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  // ✅ Function to Calculate Expiry Status
  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) return <span className="text-gray-500">No Expiry Date</span>;

    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return <span className="text-red-600 font-bold">❌ Expired</span>;
    } else if (diffDays <= 3) {
      return <span className="text-yellow-500 font-bold">⚠️ Expiring Soon</span>;
    } else {
      return <span className="text-green-500 font-bold">✅ Fresh</span>;
    }
  };

  // ✅ Apply Filters
  const applyFilters = () => {
    let filtered = products.filter((product) => product.price <= maxPrice);

    if (expiringSoon) {
      filtered = filtered.filter((product) => {
        const today = new Date();
        const expiry = new Date(product.expiry_date);
        const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
        return diffDays <= expiryDays;
      });
    }

    if (inStock) {
      filtered = filtered.filter((product) => product.quantity > 0);
    }

    setFilteredProducts(filtered);
  };

  if (loading)
    return <div className="text-center text-xl font-semibold mt-10">Loading products...</div>;

  if (error)
    return <div className="text-center text-red-600 text-xl mt-10">{error}</div>;

  return (
    <div className="relative py-16 bg-gray-900 min-h-screen flex">
      {/* ✅ Filter Panel */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 shadow-lg p-6 w-64 transition-transform ${
          filtersOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: 50 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Filters</h2>

        {/* ✅ Price Range Slider */}
        <label className="text-gray-300">Max Price: ${maxPrice}</label>
        <input
          type="range"
          min="1"
          max="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full"
        />

        {/* ✅ Expiry Date Filter */}
        <label className="text-gray-300 mt-4">Expiring Within: {expiryDays} days</label>
        <input
          type="range"
          min="1"
          max="90"
          value={expiryDays}
          onChange={(e) => setExpiryDays(e.target.value)}
          className="w-full"
        />

        {/* ✅ Checkboxes */}
        <div className="mt-4">
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              checked={inStock}
              onChange={() => setInStock(!inStock)}
              className="mr-2"
            />
            In Stock
          </label>

          <label className="flex items-center text-gray-300 mt-2">
            <input
              type="checkbox"
              checked={expiringSoon}
              onChange={() => setExpiringSoon(!expiringSoon)}
              className="mr-2"
            />
            Expiring Soon
          </label>
        </div>

        {/* ✅ Apply Filters Button */}
        <button
          onClick={applyFilters}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Apply Filters
        </button>

        {/* ✅ Close Button */}
        <button
          onClick={() => setFiltersOpen(false)}
          className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>

      {/* ✅ Filters Button (Fixed to Left) */}
      <button
        onClick={() => setFiltersOpen(true)}
        className="fixed left-0 top-1/3 bg-green-500 text-white py-2 px-4 rounded-r-lg shadow-md hover:bg-green-600 transition"
      >
        Filters
      </button>

      {/* ✅ Product Display */}
      <div className="flex-1 max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-8">Available Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 text-center"
              >
                {/* ✅ Product Image */}
                <img
                  src={product.image_url || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg"
                />

                {/* ✅ Product Name */}
                <h2 className="text-2xl font-bold mt-4 text-white">{product.name}</h2>

                {/* ✅ Price */}
                <p className="text-lg text-gray-300 font-semibold">${product.price}</p>

                {/* ✅ Expiry Date */}
                <p className="text-yellow-500 mt-2">{product.expiry_date}</p>

                {/* ✅ Expiry Status */}
                <p className="text-sm mt-2">{getExpiryStatus(product.expiry_date)}</p>

                {/* ✅ View Product Button */}
                <Link to={`/products/${product.id}`}>
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-600 transition">
                    View Product
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-400">No products match the filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
