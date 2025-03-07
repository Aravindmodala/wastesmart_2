import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorLogin = () => {
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔥 Send login request to FastAPI backend
      const response = await fetch("http://127.0.0.1:8000/vendors/vendors/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vendorData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful!");
        localStorage.setItem("vendor_token", data.access_token); // ✅ Store JWT token
        navigate("/vendor-home"); // ✅ Redirect to vendor dashboard
      } else {
        setError(data.detail || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6 pt-24">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-green-400 text-center">
          Vendor Login
        </h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-400">Email</label>
          <input
            type="email"
            name="email"
            value={vendorData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400">Password</label>
          <input
            type="password"
            name="password"
            value={vendorData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all shadow-md text-lg font-semibold"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <span
            className="text-green-400 cursor-pointer hover:underline"
            onClick={() => navigate("/vendor-signup")}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

export default VendorLogin;
