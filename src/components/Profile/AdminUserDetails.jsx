import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../Loader/Loader";

const AdminUserDetails = () => {
  const { id } = useParams();
  const role = useSelector((state) => state.auth.role);

  const [user, setUser] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1000/api/v1/admin/user/${id}`,
          { headers }
        );
        setUser(res.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  /* Loader */
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  /* Role Protection */
  if (role !== "admin") {
    return (
      <div className="h-screen flex items-center justify-center text-red-600 text-xl font-bold">
        Access Denied 🚫
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        {/* ================= USER CARD ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start mb-10">
          <img
            src={user.avatar}
            alt="avatar"
            className="h-32 w-32 rounded-full border-4 border-lime-500 object-cover"
          />

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">
              {user.username}
            </h1>

            <div className="mt-3 space-y-1 text-gray-600">
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {user.phoneNumber}
              </p>
              <p>
                <span className="font-semibold">Address:</span> {user.address}
              </p>
            </div>

            <span className="inline-block mt-4 px-4 py-1.5 bg-lime-100 text-lime-700 font-semibold rounded-full">
              Role: {user.role}
            </span>
          </div>
        </div>

        {/* ================= ORDERS ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Orders History
          </h2>

          {user.orders.length === 0 && (
            <p className="text-gray-500 text-center py-10">
              No orders placed by this user
            </p>
          )}

          <div className="grid gap-4">
            {user.orders.map((order, index) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-xl p-4 md:p-5 hover:shadow-md transition flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                {/* Left */}
                <div>
                  <p className="text-sm text-gray-500">
                    Order #{index + 1}
                  </p>
                  <p className="font-semibold text-gray-800">
                    Status:{" "}
                    <span
                      className={`ml-1 px-3 py-1 rounded-full text-sm
                        ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Canceled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {order.status}
                    </span>
                  </p>
                </div>

                {/* Right */}
                {order.equipment && (
                  <Link
                    to={`/view-equipment-details/${order.equipment._id}`}
                    className="text-lime-700 font-semibold hover:underline text-right"
                  >
                    {order.equipment.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminUserDetails;
