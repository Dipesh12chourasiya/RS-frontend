import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/editedLogo.png";
import { IoMenu } from "react-icons/io5";
import { useSelector } from "react-redux";
import auth from "../../store/auth";


const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Equipments",
      link: "/AllEquipments",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];
  const  isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  if(isLoggedIn===false){
    links.splice(2,2)
  }
  const [MobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav className=" z-50 flex relative bg-white-800 text-black px-8 py-4 items-center justify-between">
        <div className="flex items-center gap-6">
          <img className="h-10 border border-black" src={logo} alt="logo" />
          <h1 className="text-2xl font-semibold">KrishiSahay</h1>
        </div>
        <div className="nav-links-rental-ss block md:flex items-center gap-4">
          <div className=" hidden md:flex gap-4">
            {links.map((items, i) => (
              <Link
                 to={items.link}
                className="hover:text-orange-500 transition-all duration-300 cursor-pointer"
                key={i}
              >
                {items.title}{" "}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex  gap-4">
            <Link to="Login">
            <button className="px-2 py-1 border border-orange-500 rounded hover:bg-orange-500 hover:text-white transition-all duration-300">
              Log in
            </button>
            </Link>
            <Link to="/SignUp">
            <button className="px-2 py-1 bg-orange-500 border border-orange-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
              Sign up
            </button>
            </Link>
          </div>
          <button
            className="text-zinc-800 text-4xl hover:text-orange-500  md:hidden"
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <IoMenu />
          </button>
        </div>
      </nav>
      <div
        className={` ${MobileNav} bg-white h-400 absolute top-100 right-0 w-full z-40 flex flex-col items-center justify-center `}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className={` ${MobileNav} hover:text-orange-500  font-semibold transition-all duration-300 cursor-pointer mb-3`}
            key={i}
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {items.title}{" "}
          </Link>
        ))}
        <Link to="/Login">
        <button
          className={` ${MobileNav} px-2 mb-3 py-1 border border-orange-500 rounded hover:bg-orange-500 hover:text-white transition-all duration-300 `}
        >
          Log in
        </button>
        </Link>
        <Link to="/SignUp">
        <button
          className={` ${MobileNav} px-2  mb-3 py-1 bg-orange-500 border border-orange-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 `}
        >
          Sign up
        </button>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
