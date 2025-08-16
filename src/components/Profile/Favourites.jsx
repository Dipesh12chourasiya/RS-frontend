import axios from "axios";
import React, { useEffect, useState } from "react";
import EquipmentCard from "../EquipmentCard/EquipmentCard";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-favorite-equipments",
          { headers }
        );
        setFavourites(response.data.data || []);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
    // ✅ remove dependency on favourites to avoid infinite loop
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Favourite Equipments
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-xl text-gray-500 animate-pulse">Loading...</p>
        </div>
      ) : favourites.length === 0 ? (
        <div className="text-2xl font-semibold text-gray-400 flex items-center justify-center h-[60vh]">
          No Favourite Equipments Yet 💔
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favourites.map((item, index) => (
            <EquipmentCard key={index} data={item} favourite={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
