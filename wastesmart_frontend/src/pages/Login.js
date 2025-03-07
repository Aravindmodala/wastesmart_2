import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login & sign-up
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVendor, setIsVendor] = useState(false); // Vendor sign-up
  const [isVendorLogin, setIsVendorLogin] = useState(false); // Vendor login checkbox
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User Logged In!");

      if (isVendorLogin) {
        navigate("/vendor-dashboard"); // Redirect Vendor
      } else {
        navigate("/"); // Redirect Customer
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Sign-Up
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User Signed Up!", userCredential.user);
      
      if (isVendor) {
        navigate("/vendor-dashboard"); // Redirect Vendor
      } else {
        navigate("/"); // Redirect Customer
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Login Success!", result.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6">
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-green-400">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        <p className="text-gray-400 mt-2">
          {isSignUp ? "Create a new account" : "Access your account"}
        </p>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <form onSubmit={isSignUp ? handleSignup : handleLogin} className="mt-6">
          {isSignUp && (
            <>
              <div className="mb-4 text-left">
                <label className="block text-gray-400">First Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4 text-left">
                <label className="block text-gray-400">Last Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className="mb-4 text-left">
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 text-left">
            <label className="block text-gray-400">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isSignUp && (
            <div className="mb-4 text-left">
              <label className="block text-gray-400">Retype Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}


          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all shadow-md text-lg font-semibold"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 mt-3 rounded-lg hover:bg-red-600 transition-all shadow-md text-lg font-semibold"
        >
          Sign in with Google
        </button>

        <p className="text-center mt-4 text-gray-400">
          {isSignUp ? "Already have an account?" : "If you are not a user"}{" "}
          <span
            className="text-green-400 cursor-pointer hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>

        {!isSignUp && (
  <p className="text-center mt-4 text-gray-400">
    Not a customer?{" "}
    <span
      className="text-green-400 cursor-pointer hover:underline"
      onClick={() => navigate("/vendor-auth")} // Redirect to Vendor Authentication Page
    >
      Sign in as Vendor
    </span>
  </p>
)}
      </div>
    </div>
  );
}

export default Auth;
