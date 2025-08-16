import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = useSelector((state) => state.auth.role);

  const logout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));

    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center justify-between h-auto lg:h-full border border-lime-200">
      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <img
          src={data.avatar}
          className="h-24 w-24 rounded-full border-4 border-lime-500 shadow-md"
          alt="profile"
        />
        <p className="mt-3 text-xl font-bold text-gray-800">{data.username}</p>
        <p className="mt-1 text-sm text-gray-600">{data.email}</p>
        <p className="mt-1 text-sm text-gray-600">{data.phoneNumber}</p>
        <p className="mt-1 text-sm text-gray-600">{data.address}</p>

        <div className="w-full mt-4 h-[1px] bg-lime-200 hidden lg:block"></div>
      </div>

      {/* User Menu */}
      {role === "user" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex mt-6">
          <Link
            to="/profile"
            className="font-medium w-full py-2 text-center text-gray-700 rounded hover:bg-lime-100 hover:text-lime-700 transition-all"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="font-medium w-full py-2 mt-3 text-center text-gray-700 rounded hover:bg-lime-100 hover:text-lime-700 transition-all"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="font-medium w-full py-2 mt-3 text-center text-gray-700 rounded hover:bg-lime-100 hover:text-lime-700 transition-all"
          >
            Settings
          </Link>
        </div>
      )}

      {/* Admin Menu */}
      {role === "admin" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex mt-6">
          <Link
            to="/profile"
            className="font-medium w-full py-2 text-center text-gray-700 rounded hover:bg-lime-100 hover:text-lime-700 transition-all"
          >
            All Orders
          </Link>
          <Link
            to="/profile/addEqp"
            className="font-medium w-full py-2 mt-3 text-center text-gray-700 rounded hover:bg-lime-100 hover:text-lime-700 transition-all"
          >
            Add Equipment
          </Link>
        </div>
      )}

      {/* Logout Button */}
      <button
        onClick={logout}
        className="mt-6 w-3/6 lg:w-full py-2 font-semibold rounded-xl bg-lime-600 text-white shadow-md hover:bg-lime-700 transition-all"
      >
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
