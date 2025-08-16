import axios from "axios";
import React, { useState } from "react";

const AddEquipments = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    location: "",
    price: "",
    desc: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.location === "" ||
        Data.price === "" ||
        Data.desc === ""
      ) {
        alert("All fields are required");
      } else {
        console.log(Data);
        const respose = await axios.post(
          "http://localhost:1000/api/v1/add-equipment",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          location: "",
          price: "",
          desc: "",
        });
      }
    } catch (e) {
      console.error("Error:", e.response?.data || e.message);
      alert("Failed to add equipment");
    }
  };

  return (
    <div className="h-full p-0 md:p-6">
      <h1 className="text-3xl md:text-5xl font-bold text-lime-600 mb-8">
        Add Equipment
      </h1>
      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <div>
          <label className="block text-lime-800 font-medium">Image</label>
          <input
            type="text"
            className="w-full mt-2 bg-white border border-lime-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            placeholder="URL of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label className="block text-lime-800 font-medium">Title</label>
          <input
            type="text"
            className="w-full mt-2 bg-white border border-lime-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            placeholder="Title"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label className="block text-lime-800 font-medium">Location</label>
          <input
            type="text"
            className="w-full mt-2 bg-white border border-lime-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            placeholder="Location"
            name="location"
            required
            value={Data.location}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label className="block text-lime-800 font-medium">Price</label>
          <input
            type="text"
            className="w-full mt-2 bg-white border border-lime-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            placeholder="Price"
            name="price"
            required
            value={Data.price}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label className="block text-lime-800 font-medium">Description</label>
          <textarea
            className="w-full mt-2 bg-white border border-lime-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            placeholder="Description"
            rows={5}
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>

        <button
          className="mt-6 px-4 bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
          onClick={submit}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddEquipments;
