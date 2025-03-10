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
      const response = await fetch("http://127.0.0.1:8000/vendors/vendors/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vendorData),
      });

      console.log("Raw Response:", response);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Login failed: ${errorText || response.statusText}`);
      }

      const text = await response.text();
      if (!text) {
        throw new Error("Empty response received from server");
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        throw new Error("Invalid JSON response from server.");
      }

      console.log("Parsed Data:", data);

      if (data.vendor_id && data.vendor_name && data.email) {  // ✅ Ensure email exists
        alert("Login Successful!");

        const vendorInfo = {
          vendor_id: data.vendor_id,
          vendor_name: data.vendor_name,
          email: data.email || "N/A",
          contact: data.contact || "N/A",
          business_category: data.business_category || "N/A",
        };

        localStorage.setItem("vendor", JSON.stringify(vendorInfo)); // ✅ Store updated data

        navigate("/vendor-dashboard"); // ✅ Redirect to vendor dashboard
      } else {
        throw new Error("Incomplete vendor data received. Please check API response.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Something went wrong. Please try again.");
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
