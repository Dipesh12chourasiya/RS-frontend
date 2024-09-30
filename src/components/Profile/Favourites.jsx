import axios from "axios";
import React, { useEffect, useState } from "react";
import EquipmentCard from "../EquipmentCard/EquipmentCard";

const Favourites = () => {
  const [favourite, setFavourite] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-favorite-equipments",
        { headers }
      );
      setFavourite(response.data.data);
    };
    fetch();
  }, [favourite]);

  return (
    <div>

      {favourite?.length === 0 && (
        <div className="text-5xl font-semibold text-zinc-500 flex items-center justify-center w-full h-[100%]">
          No Favorite Equipments
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {favourite &&
          favourite.map((items, i) => (
            <>
              {" "}
              <EquipmentCard key={i} data={items} favourite={true} />{" "}
            </>
          ))}
      </div>
    </div>
  );
};

export default Favourites;
