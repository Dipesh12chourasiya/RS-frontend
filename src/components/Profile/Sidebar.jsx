import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ data }) => {
  return (
    <div className="bg-zinc-400 py-4 rounded flex flex-col items-center justify-between h-[100%]">
      <div className="flex items-center flex-col justify-center">
        <img src={data.avatar} className="h-[12vh]" alt="img" />
        <p className="mt-3 text-xl font-semibold">{data.username}</p>
        <p className="mt-1 text-sm">{data.email}</p>
        <p className="mt-1 text-sm">{data.phoneNumber}</p>
        <p className="mt-1 text-sm">{data.address}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>

      <div className="w-full flex-col items-center justify-center hidden lg:flex">
        <Link
          to="/profile"
          className="font-semibold w-full py-2 text-center hover:bg-zinc-500 rounded transition-all"
        >
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-500 rounded transition-all"
        >
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-500 rounded transition-all"
        >
          Settings
        </Link>
      </div>

      <button className=" p-2 w-3/6 lg:w-full mt-4 lg:mt-0 font-semibold flex items-center justify-center rounded bg-zinc-700 text-white hover:bg-zinc-900">
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
