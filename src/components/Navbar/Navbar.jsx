import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/editedLogo.png";
import { IoMenu } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";  // Assuming you have auth actions defined here

const Navbar = () => {
  const dispatch = useDispatch();

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

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Remove "Cart" and "Profile" links if user is not logged in
  if (!isLoggedIn) {
    links.splice(2, 2);
  }

  const LogoutFN = () => {
    dispatch(authActions.logout());
  };

  const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className="z-50 flex relative bg-white-800 text-black px-8 py-4 items-center justify-between">
        {/* Logo and Name */}
        <div className="flex items-center gap-6">
          <img className="h-10 border border-black" src={logo} alt="logo" />
          <h1 className="text-2xl font-semibold">KrishiSahay</h1>
        </div>

        {/* Links for desktop view */}
        <div className="nav-links-rental-ss block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <div className="flex items-center" key={i}>
                <Link
                  to={items.link}
                  className={`hover:text-orange-500 transition-all duration-300 cursor-pointer ${
                    items.title === "Profile"
                      ? "border border-orange-700 rounded-md px-2 py-[2px]"
                      : ""
                  }`}
                >
                  {items.title}
                </Link>
              </div>
            ))}
          </div>

          {/* Login and Signup buttons for desktop view */}
          <div className="hidden md:flex gap-4">
            {!isLoggedIn && (
              <>
                <Link to="/Login">
                  <button className="px-2 py-1 border border-orange-500 rounded hover:bg-orange-500 hover:text-white transition-all duration-300">
                    Log in
                  </button>
                </Link>
                <Link to="/SignUp">
                  <button className="px-2 py-1 bg-orange-500 border border-orange-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
                    Sign up
                  </button>
                </Link>
              </>
            )}
            
          </div>

          {/* Mobile menu button */}
          <button
            className="text-zinc-800 text-4xl hover:text-orange-500 md:hidden"
            onClick={() =>
              MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")
            }
          >
            <IoMenu />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={`${MobileNav} bg-white h-400 absolute top-100 right-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className={`hover:text-orange-500 font-semibold transition-all duration-300 cursor-pointer mb-3`}
            key={i}
            onClick={() => setMobileNav("hidden")}
          >
            {items.title}
          </Link>
        ))}

        {/* Login and Signup buttons for mobile view */}
        {!isLoggedIn && (
          <>
            <Link to="/Login">
              <button className="px-2 mb-3 py-1 border border-orange-500 rounded hover:bg-orange-500 hover:text-white transition-all duration-300">
                Log in
              </button>
            </Link>
            <Link to="/SignUp">
              <button className="px-2 mb-3 py-1 bg-orange-500 border border-orange-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
                Sign up
              </button>
            </Link>
          </>
        )}
        
      </div>
    </>
  );
};

export default Navbar;
