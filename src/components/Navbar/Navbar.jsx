import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/editedLogo.png";
import { IoMenu, IoClose } from "react-icons/io5"; // Import IoClose for a better mobile UX
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const LogoutFN = () => {
    dispatch(authActions.logout());
  };

  const [MobileNav, setMobileNav] = useState("hidden");

  // Links rendering based on state
  const getLinks = () => {
    let baseLinks = [
      { title: "Home", link: "/" },
      { title: "All Equipments", link: "/AllEquipments" },
    ];

    if (isLoggedIn) {
      baseLinks.push({ title: "Cart", link: "/cart" });

      if (role === "user") {
        baseLinks.push({ title: "Profile", link: "/profile" });
      } else if (role === "admin") {
        baseLinks.push({ title: "Admin Profile", link: "/profile" });
      }
    }

    return baseLinks;
  };

  const links = getLinks();

  return (
    <>
      <nav className="z-50 flex sticky top-0 bg-white/95 backdrop-blur-sm px-8 py-4 items-center justify-between shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img className="h-10 rounded-full" src={logo} alt="KrishiSahay Logo" />
          <h1 className="text-2xl font-bold text-lime-700">KrishiSahay</h1>
        </div>

        {/* Desktop Links */}
        <div className="nav-links-rental-ss hidden md:flex items-center gap-6">
          <div className="flex items-center gap-6">
            {links.map((items, i) => (
              <div className="flex items-center" key={i}>
                <Link
                  to={items.link}
                  className={`font-medium transition-all duration-300 hover:text-lime-700
                    ${(items.title === "Profile" || items.title === "Admin Profile")
                      ? "border-2 border-lime-600 rounded-full px-4 py-1 text-lime-600 hover:bg-lime-600 hover:text-white"
                      : "text-slate-800"
                    }`}
                >
                  {items.title}
                </Link>
              </div>
            ))}
          </div>

          {/* Login/Signup (only if logged out) */}
          <div className="flex gap-4">
            {!isLoggedIn ? (
              <>
                <Link to="/Login">
                  <button className="px-4 py-2 text-sm font-semibold border-2 border-lime-600 rounded-lg text-lime-600 transition-all duration-300 hover:bg-lime-600 hover:text-white">
                    Log in
                  </button>
                </Link>
                <Link to="/SignUp">
                  <button className="px-4 py-2 text-sm font-semibold bg-lime-600 border-2 border-lime-600 rounded-lg text-white transition-all duration-300 hover:bg-lime-700">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={LogoutFN}
                className="px-4 py-2 text-sm font-semibold border-2 border-red-500 text-red-500 rounded-lg transition-all duration-300 hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="text-3xl text-slate-700 hover:text-lime-600 md:hidden"
          onClick={() => setMobileNav(MobileNav === "hidden" ? "block" : "hidden")}
        >
          {MobileNav === "hidden" ? <IoMenu /> : <IoClose />}
        </button>
      </nav>

      {/* Mobile Nav */}
      <div
        className={`${MobileNav} fixed top-16 right-0 w-full z-40 bg-white/95 backdrop-blur-md shadow-lg py-8 flex flex-col items-center justify-center gap-6 md:hidden`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className="text-xl font-medium text-slate-800 hover:text-lime-700 transition-all duration-300 mb-3"
            key={i}
            onClick={() => setMobileNav("hidden")}
          >
            {items.title}
          </Link>
        ))}

        {!isLoggedIn ? (
          <>
            <Link to="/Login" onClick={() => setMobileNav("hidden")}>
              <button className="px-6 py-3 font-semibold border-2 border-lime-600 rounded-lg text-lime-600 transition-all duration-300 hover:bg-lime-600 hover:text-white">
                Log in
              </button>
            </Link>
            <Link to="/SignUp" onClick={() => setMobileNav("hidden")}>
              <button className="px-6 py-3 font-semibold bg-lime-600 border-2 border-lime-600 rounded-lg text-white transition-all duration-300 hover:bg-lime-700">
                Sign up
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={() => {
              LogoutFN();
              setMobileNav("hidden");
            }}
            className="px-6 py-3 font-semibold border-2 border-red-500 text-red-500 rounded-lg transition-all duration-300 hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;