import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
  
  const submit = async () => {
    try {
      if (
        Values.username === "" ||
        Values.phoneNumber === "" ||
        Values.email === "" ||
        Values.password === "" ||
        Values.address === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/sign-up",
          Values
        );
        alert(response.data.message);
        navigate("/Login");
      }
    } catch (error) {
      console.log("There was an issue with sign-up. Please try again.");
    }
  };
  return (
    <div className="h-auto bg-white px-12 py-8 items-center justify-center flex">
      <div className="bg-zinc-300 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-800  flex items-center justify-center text-xl">
          Sign Up
        </p>
        <div className=" mt-4">
          <div>
            <label htmlFor="" className="text-zinc-700">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2  text-white bg-zinc-700 p-2 outline-none"
              value={Values.username}
              onChange={change}
              placeholder="username"
              name="username"
              required
            ></input>
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-700">
              PhoneNumber
            </label>
            <input
              type="text"
              className="w-full mt-2 text-white bg-zinc-700 p-2 outline-none"
              value={Values.phoneNumber}
              onChange={change}
              placeholder="23456-23456"
              name="phoneNumber"
              required
            ></input>
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-700">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-2  text-white bg-zinc-700 p-2 outline-none"
              value={Values.email}
              onChange={change}
              placeholder="abcd1234@gmail.com"
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
              className="w-full text-white mt-2 bg-zinc-700 p-2 outline-none"
              value={Values.password}
              onChange={change}
              name="password"
              required
            ></input>
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-700">
              Address
            </label>
            <textarea
              className="w-full mt-2 text-white bg-zinc-700 p-2 outline-none"
              value={Values.address}
              onChange={change}
              rows="5"
              placeholder="Address"
              name="address"
              required
            ></textarea>
          </div>
          <div className="mt-8">
            <button
              className="w-full bg-orange-500  text-white font-semibold py-2 hover:text-orange-500 hover:bg-white transition-all duration-300 cursor-pointer"
              onClick={submit}
            >
              SignUp
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Already have an account? &nbsp;
            <Link to="/Login" className="hover:text-orange-500">
              <u>LogIn</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
