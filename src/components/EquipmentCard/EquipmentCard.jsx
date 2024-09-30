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
      className="flex flex-col justify-center bg-orange-100 rounded p-4"
    >
      <Link to={`/view-equipment-details/${data._id}`}>
        <div className="bg-orange-100 rounded p-4 flex flex-col">
          <div className="bg-white rounded h-[250px] flex items-center justify-center">
            <img
              src={data.url}
              alt="/"
              className="w-full object-cover h-full"
            />
          </div>
          <h2 className="mt-4 text-zinc-800 text-xl font-semibold">
            {data.title}
          </h2>
          <p className="mt-2 text-zinc-500 font-semibold">
            {data.desc.substring(0, 100)}...
          </p>
          <p className="mt-2 text-orange-600 font-semibold text-xl">
            ₹ {data.price}/-
          </p>
        </div>
      </Link>

      {favourite && (
        <button
          onClick={handleRemoveFav}
          className="bg-yellow-100 text-sm font-bold px-4 py-2 rounded border border-yellow-500"
        >
          Remove from Favorites
        </button>
      )}
    </div>
  );
};

export default EquipmentCard;
