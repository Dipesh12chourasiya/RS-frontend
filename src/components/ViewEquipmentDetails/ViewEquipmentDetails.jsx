import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

// Custom components for alerts and modals
const MessageBox = ({ message, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="rounded-xl bg-white p-6 shadow-xl max-w-sm w-full">
      <p className="text-center text-lg font-semibold text-slate-700">{message}</p>
      <div className="mt-4 text-center">
        <button
          onClick={onClose}
          className="rounded-md bg-lime-600 px-6 py-2 text-white transition-colors duration-300 hover:bg-lime-700"
        >
          OK
        </button>
      </div>
    </div>
  </div>
);

const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="rounded-xl bg-white p-6 shadow-xl max-w-sm w-full">
      <p className="text-center text-lg font-semibold text-slate-700">{message}</p>
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={onCancel}
          className="rounded-md border border-slate-300 px-6 py-2 text-slate-700 transition-colors duration-300 hover:bg-slate-100"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="rounded-md bg-red-600 px-6 py-2 text-white transition-colors duration-300 hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const ViewEquipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Function to show a message in the custom box
  const displayMessage = (message) => {
    setMessageText(message);
    setShowMessage(true);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-equipment-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch equipment details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    equipment_id: id,
  };

  const handleFavorite = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-equipment-to-favorite",
        {},
        { headers }
      );
      displayMessage(response.data.message);
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      displayMessage("Failed to add to favorites.");
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-to-cart",
        {},
        { headers }
      );
      displayMessage(response.data.message);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      displayMessage("Failed to add to cart.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        "http://localhost:1000/api/v1/delete-equipment",
        { headers }
      );
      displayMessage("Equipment deleted successfully!");
      // Redirect after a short delay to allow the message to be seen
      setTimeout(() => {
        navigate("/AllEquipments");
      }, 1500);
    } catch (error) {
      console.error("Failed to delete equipment", error);
      displayMessage("Failed to delete equipment. Please try again.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <Loader />
      </div>
    );
  }

  if (!Data) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <p className="text-xl text-slate-500">Equipment not found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:px-12 lg:flex lg:space-x-8">
        {/* Left Section: Image and Action Icons */}
        <div className="relative mb-6 w-full lg:w-1/2">
          {/* Main Image Container */}
          <div className="flex h-full min-h-[50vh] items-center justify-center overflow-hidden rounded-xl bg-green-100 p-8 shadow-xl">
            <img
              src={Data.url}
              alt={Data.title}
              className="h-full w-full object-contain rounded-lg"
            />
          </div>
          
          {/* Action Buttons (Favorites/Cart or Admin Controls) */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {isLoggedIn && role === "user" && (
              <>
                <button
                  onClick={handleFavorite}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-red-500 shadow-md transition-transform duration-300 hover:scale-110"
                  aria-label="Add to Favorites"
                >
                  <FaHeart />
                </button>
                <button
                  onClick={handleCart}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-lime-600 shadow-md transition-transform duration-300 hover:scale-110"
                  aria-label="Add to Cart"
                >
                  <FaShoppingCart />
                </button>
              </>
            )}

            {isLoggedIn && role === "admin" && (
              <>
                {/* Note: The edit button logic is not implemented, but the button is here for future use
                <button
                  onClick={() => navigate(`/update-equipment/${id}`)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-blue-500 shadow-md transition-transform duration-300 hover:scale-110"
                  aria-label="Edit Equipment"
                >
                  <FaEdit />
                </button> */}

                <button
                  onClick={handleCart}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-lime-600 shadow-md transition-transform duration-300 hover:scale-110"
                  aria-label="Add to Cart"
                >
                  <FaShoppingCart />
                </button>
                
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-red-500 shadow-md transition-transform duration-300 hover:scale-110"
                  aria-label="Delete Equipment"
                >
                  <MdDeleteOutline />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right Section: Details */}
        <div className="w-full rounded-xl bg-white p-6 shadow-lg lg:w-1/2">
          <h1 className="text-4xl font-bold text-slate-800">
            {Data.title}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            {Data.desc}
          </p>
          <div className="mt-6 flex items-center text-lg text-slate-500">
            <GrLanguage className="mr-2" />
            <p className="font-medium">{Data.language}</p>
          </div>
          <p className="mt-4 text-4xl font-bold text-lime-600">
            ₹ {Data.price} <span className="text-xl text-slate-500">/ Per Hour</span>
          </p>
        </div>
      </div>

      {/* Conditional Rendering of custom components */}
      {showMessage && <MessageBox message={messageText} onClose={() => setShowMessage(false)} />}
      {showDeleteModal && (
        <ConfirmModal
          message="Are you sure you want to delete this equipment?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default ViewEquipmentDetails;