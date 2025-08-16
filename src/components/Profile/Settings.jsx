import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address });
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    fetch();
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  const submitAddress = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/update-address",
        Value,
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Failed to update address");
    }
  };

  return (
    <>
      {!ProfileData && (
        <div className="w-full flex items-center justify-center h-screen bg-gray-50">
          <Loader />
        </div>
      )}

      {ProfileData && (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6 md:p-10">
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10 border border-gray-200">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
              Settings
            </h1>

            {/* Profile Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Username
                </label>
                <p className="mt-2 p-3 rounded-lg bg-gray-100 text-gray-800 font-semibold shadow-sm">
                  {ProfileData.username}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <p className="mt-2 p-3 rounded-lg bg-gray-100 text-gray-800 font-semibold shadow-sm">
                  {ProfileData.email}
                </p>
              </div>
            </div>

            {/* Address Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">
                Address
              </label>
              <textarea
                onChange={change}
                className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
                rows="3"
                placeholder="Enter your address"
                name="address"
                value={Value.address}
              />
            </div>

            {/* Update Button */}
            <div className="flex justify-end">
              <button
                onClick={submitAddress}
                className="bg-green-600 hover:bg-green-700 transition-all duration-300 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
              >
                Update Address
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
