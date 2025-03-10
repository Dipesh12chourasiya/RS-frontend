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
            console.log(Data)
            const respose = await axios.post("http://localhost:1000/api/v1/add-equipment", Data, {headers});
            setData({
                url:"",
                title:"",
                location:"",
                price:"",
                desc:""
            })
        }

    } catch (e) {
        console.error("Error:", e.response?.data || e.message);
        alert("Failed to add equipment");
    }
};


  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Add Equipment
      </h1>
      <div className="p-4 bg-zinc-500 rounded">
        <div>
          <label className="p-4 text-zinc-100">Image</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-300 p-2 outline-none"
            placeholder="url of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label className="p-4 text-zinc-100">Title</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-300 p-2 outline-none"
            placeholder="Title"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label className="p-4 text-zinc-100">Location</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-300 p-2 outline-none"
            placeholder="Location"
            name="location"
            required
            value={Data.location}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label className="p-4 text-zinc-100">Price</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-300 p-2 outline-none"
            placeholder="Price"
            name="price"
            required
            value={Data.price}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label className="p-4 text-zinc-100">Description</label>
          <textarea
            className="w-full mt-2 bg-zinc-300 p-2 outline-none"
            placeholder="Description"
            rows={5}
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>

        <button
        className="mt-4 px-3 bg-black text-white font-semibold py-2 rounded" onClick={submit}>Add</button>
      </div>
    </div>
  );
};

export default AddEquipments;
