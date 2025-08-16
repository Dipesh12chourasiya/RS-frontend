import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-lime-50 to-emerald-100 flex flex-col md:flex-row">
      {/* Loader while fetching */}
      {!Profile && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* Once Profile is available */}
      {Profile && (
        <>
          {/* Sidebar (Desktop) */}
          <div className="hidden md:flex md:w-1/5 lg:w-1/6 bg-white shadow-xl rounded-xl p-4 flex-col">
            <Sidebar data={Profile} />
          </div>

          {/* Mobile Nav */}
          <div className="block md:hidden sticky top-0 z-50 shadow-md bg-white">
            <MobileNav />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-4/5 lg:w-5/6 bg-white/60 backdrop-blur-md shadow-inner rounded-xl p-6 overflow-y-auto">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
