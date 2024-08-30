import React from "react";
import logo from "../../assets/editedLogo.png";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
   
    {
      title: "All Equipments",
      link: "/all-equipments",
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

  return (
    <div className="flex bg-white-800 text-black px-8 py-4 items-center justify-between">
      <div className="flex items-center gap-6">
        <img className="h-10 border border-black" src={logo} alt="logo" />
        <h1 className="text-2xl font-semibold">Rental System</h1>
      </div>
      <div className="nav-links-rental-ss flex items-center gap-4">
        <div className="flex gap-4">
          {links.map((items, i) => (
            <div className="hover:text-orange-500 transition-all duration-300 cursor-pointer" key={i}>{items.title} </div>
          ))}
        </div>
        <div className="flex gap-4">
          <button className="px-2 py-1 border border-orange-500 rounded hover:bg-orange-500 hover:text-white transition-all duration-300">Log in</button>
          <button className="px-2 py-1 bg-orange-500 border border-orange-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
