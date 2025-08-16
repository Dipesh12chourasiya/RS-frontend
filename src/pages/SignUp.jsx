import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  // New state to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = async (e) => {
    e.preventDefault(); // stop form from reloading the page

    try {
      // Validation checks
      if (
        Values.username.trim() === "" ||
        Values.phoneNumber.trim() === "" ||
        Values.email.trim() === "" ||
        Values.password.trim() === "" ||
        Values.address.trim() === ""
      ) {
        alert("All fields are required");
        return;
      }

      // Email validation (simple regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(Values.email)) {
        alert("Invalid email format");
        return;
      }

      // Phone number validation
      if (Values.phoneNumber.length < 10) {
        alert("Phone number must be at least 10 digits");
        return;
      }

      // Password validation
      if (Values.password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }

      // API call
      const response = await axios.post(
        "http://localhost:1000/api/v1/sign-up",
        Values
      );

      alert(response.data.message);
      navigate("/Login");
    } catch (error) {
      console.log("There was an issue with sign-up. Please try again.");
    }
  };

  return (
    <div className="flex h-fit items-center justify-center bg-slate-100">
      <div className="w-full rounded-lg bg-white p-8 shadow-lg md:w-3/6 lg:w-2/6">
        <h2 className="mb-6 text-center text-3xl font-semibold text-slate-800">
          Sign Up
        </h2>
        <form>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full rounded-md border border-slate-300 p-2 text-slate-800 shadow-sm focus:border-lime-500 focus:ring-blue-500"
                value={Values.username}
                onChange={change}
                placeholder="Username"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-slate-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="mt-1 block w-full rounded-md border border-slate-300 p-2 text-slate-800 shadow-sm focus:border-lime-500 focus:ring-blue-500"
                value={Values.phoneNumber}
                onChange={change}
                placeholder="Phone Number"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border border-slate-300 p-2 text-slate-800 shadow-sm focus:border-lime-500 focus:ring-blue-500"
                value={Values.email}
                onChange={change}
                placeholder="Email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  // Use a conditional expression to change the input type
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="block w-full rounded-md border border-slate-300 p-2 pr-10 text-slate-800 shadow-sm focus:border-lime-500 focus:ring-blue-500"
                  value={Values.password}
                  placeholder="Password"
                  onChange={change}
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-slate-400 hover:text-slate-600"
                  onClick={togglePasswordVisibility}
                >
                  {/* Conditionally render the correct icon */}
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-slate-700"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                rows="4"
                className="mt-1 block w-full rounded-md border border-slate-300 p-2 text-slate-800 shadow-sm focus:border-lime-500 focus:ring-blue-500"
                value={Values.address}
                onChange={change}
                placeholder="Address"
                required
              />
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full rounded-md bg-lime-600 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
              onClick={submit}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm">
          <span className="text-slate-500">Already have an account? </span>
          <Link
            to="/Login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
