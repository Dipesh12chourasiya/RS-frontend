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

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const uploadToCloudinary = async () => {
    if (!file) return "";

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ungigned_preset");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dmhgzv1ix/image/upload",
        data,
      );
      return res.data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      return "";
    }
  };

  const submit = async () => {
    try {
      if (
        !file ||
        Data.title === "" ||
        Data.location === "" ||
        Data.price === "" ||
        Data.desc === ""
      ) {
        alert("All fields are required");
        return;
      }

      setLoading(true);

      // 1️⃣ Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary();

      if (!imageUrl) {
        alert("Image upload failed");
        setLoading(false);
        return;
      }

      // 2️⃣ Send data to backend
      const payload = {
        ...Data,
        url: imageUrl,
      };

      await axios.post("http://localhost:1000/api/v1/add-equipment", payload, {
        headers,
      });

      alert("Equipment added successfully");

      // Reset
      setData({
        url: "",
        title: "",
        location: "",
        price: "",
        desc: "",
      });
      setFile(null);
      setPreview("");
    } catch (e) {
      console.error("Error:", e.response?.data || e.message);
      alert("Failed to add equipment");
    } finally {
      setLoading(false);
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

          {preview && (
            <div className="mt-4 w-full flex justify-center">
              <div className="w-full max-w-sm aspect-square border rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full mt-2"
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
          className={`mt-6 px-4 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300
  ${loading ? "bg-lime-400 cursor-not-allowed" : "bg-lime-600 hover:bg-lime-700"}`}
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AddEquipments;
