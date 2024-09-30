import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewEquipmentDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-equipment-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    equipment_id: id,
  };

  const handleFavorite = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-equipment-to-favorite",
      {},
      { headers }
    );
    alert(response.data.message)
  };

  const handleCart = async () =>{
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message)
  }

  return (
    <>
      {Data && (
        <div className=" px-4 md:px-12 py-8 bg-white flex flex-col md:flex-row">
          <div className="bg-orange-100 rounded px-4 py-12  h-[70vh] lg:h-[80vh]  w-full lg:w-3/6 flex  items-center justify-around">
            <img
              src={Data.url}
              alt="image"
              className="h-[50vh] lg:h-[60vh] rounded object-cover"
            />
          </div>

          {isLoggedIn === true && (
            <div className="flex md:flex-col">
              <button
                className="bg-white rounded-full text-3xl p-2 hover:scale-1 transition-all text-red-500"
                onClick={handleFavorite}
              >
                <FaHeart />
              </button>
              <button className="bg-white rounded-full text-3xl p-2 hover:scale-1 transition-all lg:mt-4 text-blue-500" onClick={handleCart}>
                <FaShoppingCart />
              </button>
            </div>
          )}

          {isLoggedIn === true && role == "admin" && (
            <div className="flex md:flex-col">
              <button className="bg-white rounded-full text-3xl p-2 flex items-center justify-center">
                <FaEdit />
              </button>
              <button className="bg-white text-red-500 rounded-full text-3xl p-2 flex items-center justify-center  lg:mt-4 ">
                <MdDeleteOutline />
              </button>
            </div>
          )}

          <div className="p-4  w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-800 font-semibold">
              {Data.title}
            </h1>
            <p className="text-zinc-600 mt-4 text-xl">{Data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-500">
              <GrLanguage className="me-3" />
              {Data.language}
            </p>
            <p className="mt-4 text-orange-500 text-3xl font-semibold">
              Price : ₹ {Data.price}{" "}
              <span className="text-black text-[22px]">Per Hour</span>
            </p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen bg-zinc 900 flex justify-center items-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewEquipmentDetails;
