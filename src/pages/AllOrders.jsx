import React, { useEffect, useState } from "react";
import axios from "axios";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-all-orders",
        { headers }
      );
      setOrders(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Failed to fetch orders");
    }
  };

  // Update order status
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/update-status/${id}`,
        { status: newStatus },
        { headers }
      );
      alert(response.data.message);
      fetchOrders(); // refresh after update
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading orders...</p>;
  }

  return (
    <div className="p-6">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">
          All Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Equipment</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr
                    key={order._id}
                    className={`hover:bg-gray-50 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-3 text-sm text-gray-700">{order._id}</td>
                    <td className="p-3 text-sm font-medium text-gray-800">
                      {order.user?.username || "Unknown"}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {order.equipment?.title || "Unknown"}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      ₹{order.equipment?.price}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order._id, e.target.value)
                        }
                        className="p-2 border rounded-lg text-sm focus:ring focus:ring-indigo-200"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
