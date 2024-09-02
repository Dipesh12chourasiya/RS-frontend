
// import './App.css'

import React from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllEquipments from "./pages/AllEquipments";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ViewEquipmentDetails from "./components/ViewEquipmentDetails/ViewEquipmentDetails"; 

function App() {
  return (
    <div>
      
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/AllEquipments" element={<AllEquipments />} />
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/view-equipment-details/:id" element={<ViewEquipmentDetails />} />
        </Routes>
        <Footer />
     
      {/* <h1 className='bg-blue-900 h-screen text-white flex items-center justify-center'>Hello World</h1> */}
    </div>
  );
}

export default App;
