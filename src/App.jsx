
// import './App.css'

import React from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import AllEquipments from "./pages/AllEquipments";

function App() {

  return (
    <div>
      <Router>  
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/AllEquipments" element={<AllEquipments />}> </Route>
      </Routes>
      <Footer />
      </Router>
      {/* <h1 className='bg-blue-900 h-screen text-white flex items-center justify-center'>Hello World</h1> */}
    </div>
  )
}
export default App;
