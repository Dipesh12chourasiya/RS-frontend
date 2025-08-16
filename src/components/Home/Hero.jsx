import React from "react";
import { Link } from "react-router-dom";
import back from "../../assets/bacck.jpg";

const Hero = () => {
  const heroImage = back;

  return (
    <div
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-5xl font-extrabold leading-tight text-white drop-shadow-2xl md:text-6xl lg:text-7xl">
          Affordable Equipment, Smarter Farming
        </h1>
        <p className="mt-4 text-lg text-slate-200 md:text-xl drop-shadow-lg">
          Rent modern farming tools with ease—reduce costs, boost productivity,
          and make your fields thrive sustainably.
        </p>
        <div className="mt-10">
          <Link
            to="/AllEquipments"
            className="inline-block rounded-full bg-lime-600 px-10 py-4 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:bg-lime-700 hover:scale-105"
          >
            Discover Equipment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
