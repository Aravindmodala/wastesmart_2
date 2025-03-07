import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"]; // Load Google Places API

const VendorSignup = () => {
  const navigate = useNavigate();
  const autocompleteRef = useRef(null); // Ref for Google Autocomplete input

  const [vendorData, setVendorData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    location: "", // ✅ New location field
    business_category: "",
    business_description: "",
    business_license: "",
    logo_url: "",
    discount_policy: "",
    accepts_donations: false,
    bank_account: "",
    upi_id: ""
  });

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // 🔹 Replace with your actual API key
    libraries,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVendorData({
      ...vendorData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle Google Places address selection
  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address) {
        setVendorData({
          ...vendorData,
          address: place.formatted_address,
          location: place.geometry.location
            ? `${place.geometry.location.lat()},${place.geometry.location.lng()}`
            : "", // ✅ Store lat,lng if available
        });
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...vendorData,
      accepts_donations: Boolean(vendorData.accepts_donations),
    };

    console.log("Submitting Vendor Data:", formattedData);

    try {
      const response = await fetch("http://127.0.0.1:8000/vendors/vendors/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        alert("Vendor registered successfully!");
        navigate("/vendor-login");
      } else {
        alert(`Error: ${JSON.stringify(data.detail)}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register vendor.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6 pt-24">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-green-400 text-center">Vendor Signup</h2>

        <div className="mb-4">
          <label className="block text-gray-400">Name</label>
          <input type="text" name="name" value={vendorData.name} onChange={handleChange} required 
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400">Email</label>
          <input type="email" name="email" value={vendorData.email} onChange={handleChange} required 
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400">Password</label>
          <input type="password" name="password" value={vendorData.password} onChange={handleChange} required 
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400">Contact</label>
          <input type="text" name="contact" value={vendorData.contact} onChange={handleChange} required 
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
        </div>

        {/* Business Address with Google Places Autocomplete */}
        <div className="mb-4">
          <label className="block text-gray-400">Business Address</label>
          {isLoaded && (
            <Autocomplete
              onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
              onPlaceChanged={handlePlaceSelect}
            >
              <input
                type="text"
                name="address"
                value={vendorData.address} // ✅ Use vendorData.address directly
                onChange={(e) => setVendorData({ ...vendorData, address: e.target.value })} // ✅ Allows manual typing & backspace
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Start typing your address..."
              />
            </Autocomplete>
          )}
        </div>

        {/* Location Field (User can enter manually if needed) */}
        <div className="mb-4">
          <label className="block text-gray-400">Location (Latitude,Longitude)</label>
          <input type="text" name="location" value={vendorData.location} onChange={handleChange} required 
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" 
            placeholder="Auto-filled or enter manually" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400">Business Category</label>
          <input type="text" name="business_category" value={vendorData.business_category} onChange={handleChange} required 
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400">Business License</label>
          <input type="text" name="business_license" value={vendorData.business_license} onChange={handleChange} required 
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" />
        </div>

        <div className="mb-4 flex items-center">
          <input type="checkbox" name="accepts_donations" checked={vendorData.accepts_donations} onChange={handleChange} 
            className="mr-2" />
          <label className="text-gray-400">Accepts Donations?</label>
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
          Register Vendor
        </button>
      </form>
    </div>
  );
};

export default VendorSignup;
