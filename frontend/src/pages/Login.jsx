import React, { useState } from "react";
import { login } from "../api/login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setLoginState } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.username = username ? "" : "Username is required.";
    tempErrors.password = password ? "" : "Password is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    // Validate and call your login API
    const response = await login({ username, password }); // Assume this returns the token

    if (response.token) {
      setLoginState(response.token); // Use the login method from context
      navigate("/"); // Redirect to home page
    } else {
      console.error("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2 text-left"
              htmlFor="email"
            >
              Username
            </label>
            <input
              type="text"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1 block text-left">
                {errors.username}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 mb-2 text-left"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 block text-left">
                {errors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#162092] text-white py-2 rounded-md hover:bg-[#2b35a3] transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
