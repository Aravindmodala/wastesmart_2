import React from "react";
import { useNavigate } from "react-router-dom";


function VendorAuth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6">
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-green-400">Vendor Access</h2>
        <p className="text-gray-400 mt-2">Choose your action</p>

        {/* Sign in as Existing Vendor */}
        <button
          onClick={() => navigate("/vendor-login")}
          className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600 transition-all shadow-md text-lg font-semibold"
        >
          Sign in as Existing Vendor
        </button>

        {/* Sign up as New Vendor */}
        <button
          onClick={() => navigate("/vendor-signup")}
          className="w-full bg-green-500 text-white py-2 mt-4 rounded-lg hover:bg-green-600 transition-all shadow-md text-lg font-semibold"
        >
          Sign up as New Vendor
        </button>

        {/* Go back to Login Page */}
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-gray-700 text-white py-2 mt-4 rounded-lg hover:bg-gray-800 transition-all shadow-md text-lg font-semibold"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default VendorAuth;
