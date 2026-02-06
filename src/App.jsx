// import './App.css'

import React, { useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllEquipments from "./pages/AllEquipments";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ViewEquipmentDetails from "./components/ViewEquipmentDetails/ViewEquipmentDetails";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import Cart from "./pages/Cart";
import AllOrders from "./pages/AllOrders";
import AddEquipments from "./pages/AddEquipments";
import AdminOrders from "./components/Profile/AdminOrders";
import AdminUserDetails from "./components/Profile/AdminUserDetails";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  });

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/AllEquipments" element={<AllEquipments />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/profile" element={<Profile />}>
          {/* Default page */}
          <Route
            index
            element={role === "admin" ? <AdminOrders /> : <Favourites />}
          />

          {/* USER ROUTES */}
          <Route path="orderHistory" element={<UserOrderHistory />} />
          <Route path="settings" element={<Settings />} />

          {/* ADMIN ROUTES */}
          <Route path="addEqp" element={<AddEquipments />} />
          <Route path="users/:id" element={<AdminUserDetails />} />
        </Route>

        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route
          path="/view-equipment-details/:id"
          element={<ViewEquipmentDetails />}
        />
      </Routes>
      <Footer />

      {/* <h1 className='bg-blue-900 h-screen text-white flex items-center justify-center'>Hello World</h1> */}
    </div>
  );
}

export default App;
