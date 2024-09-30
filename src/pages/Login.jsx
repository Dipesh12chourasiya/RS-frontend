import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const [Values, setValues] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (Values.email === "" || Values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/sign-in",
          Values
        );
        // console.log(response);
        if (response) {
          dispatch(authActions.login());
          dispatch(authActions.changeRole(response.data.role));
          localStorage.setItem("id", response.data.id);

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          navigate("/");
        } else {
          navigate("/login");
        }

        // Assuming the response contains a success message
        // console.log(response.data);

        // Navigate to another page, e.g., Home page after successful login
        // navigate("/profile");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-[84vh] bg-white px-12 py-8 items-center justify-center flex">
      <div className="bg-zinc-300 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-800 flex items-center justify-center text-xl">
          LogIn
        </p>
        <div className=" mt-4">
          <div>
            <label htmlFor="" className="text-zinc-700">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-2  text-white  bg-zinc-700 p-2 outline-none"
              placeholder="Email"
              value={Values.email}
              onChange={change}
              name="email"
              required
            ></input>
          </div>

          <div className="mt-4">
            <label htmlFor="" className="text-zinc-700">
              Password
            </label>
            <input
              type="password"
              className="w-full   text-white mt-2 bg-zinc-700 p-2 outline-none"
              value={Values.password}
              onChange={change}
              name="password"
              required
            ></input>
          </div>

          <div className="mt-8">
            <button
              className="w-full  text-white bg-orange-500 font-semibold py-2 hover:text-orange-500 hover:bg-white transition-all duration-300 cursor-pointer"
              onClick={submit}
            >
              LogIn
            </button>
          </div>
          <p className="flex mt-4  items-center justify-center text-zinc-500 font-semibold">
            or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Don't have an account? &nbsp;
            <Link to="/SignUp" className="hover:text-orange-500">
              <u>SignUp</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
