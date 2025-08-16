import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const EquipmentCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    equipment_id: data._id,
  };
  const handleRemoveFav = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/remove-equipment-from-favorite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <div
      key={data._id}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
    >
      <Link to={`/view-equipment-details/${data._id}`}>
        <div className="flex flex-col">
          <div className="relative h-[250px] overflow-hidden">
            <img
              src={data.url}
              alt={data.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h2 className="line-clamp-2 text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-lime-700">
              {data.title}
            </h2>
            <p className="line-clamp-3 mt-2 text-sm text-slate-500">
              {data.desc.substring(0, 100)}...
            </p>
            <p className="mt-4 text-xl font-bold text-lime-600">
              ₹ {data.price}/-
            </p>
          </div>
        </div>
      </Link>

      {favourite && (
        <button
          onClick={handleRemoveFav}
          className="mt-2 w-full rounded-md border border-red-500 py-2 text-sm font-semibold text-red-500 transition-colors duration-300 hover:bg-red-500 hover:text-white"
        >
          Remove from Favorites
        </button>
      )}
    </div>
  );
};

export default EquipmentCard;