import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-all-orders",
        { headers }
      );
      setOrders(res.data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      await axios.put(
        `http://localhost:1000/api/v1/update-status/${orderId}`,
        { status: newStatus },
        { headers }
      );
      fetchOrders();
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders =
    statusFilter === "All"
      ? orders
      : orders?.filter((o) => o.status === statusFilter);

  if (!orders) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-lime-800">
            Admin Orders 🌾
          </h1>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-lime-300 rounded-lg px-4 py-2"
          >
            <option value="All">All</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>

        {/* Desktop Table Header */}
        <div className="hidden md:grid grid-cols-12 bg-lime-600 text-white font-semibold rounded-lg py-3 px-4 mb-3">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-2">User</div>
          <div className="col-span-3">Equipment</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-center">Action</div>
        </div>

        {/* Orders */}
        {filteredOrders.map((order, index) => {
          const { user, equipment } = order;

          return (
            <div
              key={order._id}
              className="bg-white border border-lime-200 rounded-xl shadow-sm mb-4 p-4 md:p-0 md:grid md:grid-cols-12 md:items-center"
            >
              {/* Mobile Card */}
              <div className="md:hidden space-y-2">
                <p className="text-sm text-gray-500">Order #{index + 1}</p>

                <p className="font-semibold">
                  User:{" "}
                  {user ? (
                    <Link
                      to={`/profile/users/${user._id}`}
                      className="text-lime-700 underline"
                    >
                      {user.username}
                    </Link>
                  ) : (
                    "Unknown"
                  )}
                </p>

                <p>
                  Equipment:{" "}
                  {equipment ? (
                    <Link
                      to={`/view-equipment-details/${equipment._id}`}
                      className="text-lime-700 underline"
                    >
                      {equipment.title}
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </p>

                <p className="font-bold text-lime-700">
                  ₹{equipment?.price || "-"}
                </p>

                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        order.status === "Order Placed"
                          ? "bg-yellow-200 text-yellow-700"
                          : order.status === "Delivered"
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                  >
                    {order.status}
                  </span>

                  <select
                    disabled={updatingId === order._id}
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="border rounded-lg px-2 py-1 text-sm"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </div>
              </div>

              {/* Desktop Row */}
              <div className="hidden md:contents">
                <div className="col-span-1 text-center font-medium text-lime-700">
                  {index + 1}
                </div>

                <div className="col-span-2">
                  {user ? (
                    <Link
                      to={`/profile/users/${user._id}`}
                      className="text-lime-700 font-semibold hover:underline"
                    >
                      {user.username}
                    </Link>
                  ) : (
                    "Unknown"
                  )}
                </div>

                <div className="col-span-3">
                  {equipment ? (
                    <Link
                      to={`/view-equipment-details/${equipment._id}`}
                      className="text-lime-700 hover:underline"
                    >
                      {equipment.title}
                    </Link>
                  ) : (
                    "Not Found"
                  )}
                </div>

                <div className="col-span-2 text-center font-bold text-lime-700">
                  ₹{equipment?.price || "-"}
                </div>

                <div className="col-span-2 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        order.status === "Order Placed"
                          ? "bg-yellow-200 text-yellow-700"
                          : order.status === "Delivered"
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="col-span-2 text-center">
                  <select
                    disabled={updatingId === order._id}
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="border rounded-lg px-2 py-1 text-sm"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </div>
              </div>
            </div>
          );
        })}

        {filteredOrders.length === 0 && (
          <p className="text-center text-lime-700 text-xl mt-20">
            No orders found 🌱
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
