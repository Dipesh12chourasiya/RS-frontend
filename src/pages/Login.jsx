import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [Values, setValues] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    e.preventDefault(); // stop form reload

    try {
      if (Values.email === "" || Values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/sign-in",
          Values
        );

        if (response) {
          dispatch(authActions.login());
          dispatch(authActions.changeRole(response.data.role));
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);

          navigate("/"); // redirect after login
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <div className="w-full rounded-lg bg-white p-8 shadow-lg md:w-3/6 lg:w-2/6">
        <h2 className="mb-6 text-center text-3xl font-semibold text-slate-800">
          Log In
        </h2>
        <form>
          <div className="space-y-4">
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
                className="mt-1 block w-full rounded-md border border-slate-300 p-2 text-slate-800 shadow-sm focus:border-lime-500 focus:ring-lime-500"
                placeholder="Email"
                value={Values.email}
                onChange={change}
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
                  className="block w-full rounded-md border border-slate-300 p-2 pr-10 text-slate-800 shadow-sm focus:border-lime-500 focus:ring-lime-500"
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
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full rounded-md bg-lime-600 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
              onClick={submit}
            >
              Log In
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm">
          <span className="text-slate-500">Don't have an account? </span>
          <Link
            to="/SignUp"
            className="font-semibold text-lime-600 hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
