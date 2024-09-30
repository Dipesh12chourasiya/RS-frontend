import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Profile = () => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-user-information",
        { headers }
      );
      // console.log("Headers" , response)
      setProfile(response.data);
    };

    fetch()
  }, []);

  return (
    <div className="bg-zinc-300 px-2 md:px-12 flex md:flex-row py-8 gap-4 ">
      {!Profile && (<div className="w-full h-[100%] flex items-center justify-center"><Loader /></div>)}

      {Profile && (
        <>
          <div className="w-full md:w-1/6 h-screen">
            <Sidebar data={Profile} />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
