import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-order-history",
          { headers }
        );
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Loader */}
      {!OrderHistory && (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      )}

      {/* No Orders */}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] flex flex-col items-center justify-center text-lime-800">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            No Order History
          </h1>
          <img
            className="h-[20vh] mb-6"
            src="https://cdn-icons-png.flaticon.com/128/2909/2909767.png"
            alt="no-orders"
          />
          <p className="text-lg text-lime-700">Start renting farming equipment now!</p>
        </div>
      )}

      {/* Orders */}
      {OrderHistory?.length > 0 && (
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-lime-800 mb-8 text-center">
            Order History 🌱
          </h1>

          {/* Table Header */}
          <div className="grid grid-cols-12 bg-lime-600 text-white font-semibold rounded-lg shadow-md py-3 px-4 mb-2">
            <div className="col-span-1 text-center">Sr.</div>
            <div className="col-span-3">Equipment</div>
            <div className="col-span-4">Description</div>
            <div className="col-span-1 text-center">Price</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-1 hidden md:block text-center">Mode</div>
          </div>

          {/* Order Rows */}
          {OrderHistory.map((items, i) => {
            const equipment = items?.equipment;

            return (
              <div
                key={equipment?._id || i}
                className="grid grid-cols-12 bg-white rounded-lg shadow hover:shadow-lg transition-all py-3 px-4 mb-3 items-center border border-lime-200"
              >
                <div className="col-span-1 text-center font-medium text-lime-700">
                  {i + 1}
                </div>

                <div className="col-span-3">
                  {equipment ? (
                    <Link
                      to={`/view-equipment-details/${equipment._id}`}
                      className="text-lime-700 hover:text-lime-600 font-semibold"
                    >
                      {equipment.title}
                    </Link>
                  ) : (
                    <span className="text-red-500">Equipment not found</span>
                  )}
                </div>

                <div className="col-span-4 text-gray-700">
                  {equipment
                    ? equipment.desc?.slice(0, 50) + "..."
                    : "No description available"}
                </div>

                <div className="col-span-1 text-center font-bold text-lime-700">
                  {equipment ? `₹${equipment.price}` : "-"}
                </div>

                <div className="col-span-2 text-center">
                  {items.status === "Order Placed" ? (
                    <span className="px-3 py-1 bg-yellow-200 text-yellow-700 rounded-full text-sm font-medium">
                      {items.status}
                    </span>
                  ) : items.status === "Canceled" ? (
                    <span className="px-3 py-1 bg-red-200 text-red-700 rounded-full text-sm font-medium">
                      {items.status}
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-green-200 text-green-700 rounded-full text-sm font-medium">
                      {items.status}
                    </span>
                  )}
                </div>

                <div className="col-span-1 hidden md:block text-center text-sm text-green-600">
                  COD
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;
