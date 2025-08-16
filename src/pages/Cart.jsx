import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import emptycart from "../assets/empty-cart.png";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // ✅ Fetch cart once
  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-user-cart",
        { headers }
      );
      setCart(response.data.data || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Delete item
  const deleteItem = async (equipment_id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/remove-from-cart/${equipment_id}`,
        {},
        { headers }
      );
      alert(response.data.message);
      fetchCart(); // refresh cart after removal
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // ✅ Calculate total
  useEffect(() => {
    if (Cart.length > 0) {
      let total = 0;
      Cart.forEach((item) => {
        total += item.price || 0;
      });
      setTotal(total);
    } else {
      setTotal(0);
    }
  }, [Cart]);

  // ✅ Place order
  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:1000/api/v1/place-order`,
        { order: Cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen py-8 px-4 md:px-12">
      {isLoading && (
        <div className="flex justify-center items-center h-[87vh]">
          <Loader />
        </div>
      )}

      {!isLoading && Cart.length === 0 && (
        <div className="h-[100%] flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-400">
            Your Cart is Empty
          </h1>
          <img
            src={emptycart}
            alt="empty cart"
            className="mt-8 h-40 md:h-64 lg:h-[50vh] object-contain"
          />
          <Link
            to="/all-equipments"
            className="mt-8 rounded-full bg-lime-600 px-8 py-3 text-white text-lg font-semibold shadow-md transition-colors duration-300 hover:bg-lime-700"
          >
            Discover Equipment
          </Link>
        </div>
      )}

      {!isLoading && Cart.length > 0 && (
        <>
          <h1 className="text-4xl font-bold text-slate-800 mb-6">Your Cart</h1>
          {Cart.map((item, i) => (
            <div
              className="w-full my-4 p-4 rounded-xl flex flex-col md:flex-row bg-white shadow-md transition-shadow duration-300 hover:shadow-lg items-center justify-between"
              key={i}
            >
              <img
                src={item.url}
                alt={item.title}
                className="h-24 w-24 object-cover rounded-lg mr-4"
              />

              <div className="flex-1 w-full md:w-auto text-center md:text-left mt-4 md:mt-0">
                <h1 className="text-xl md:text-2xl font-semibold text-slate-800">
                  {item.title}
                </h1>
                <p className="text-sm text-slate-500 mt-1 hidden md:block">
                  {item.desc.slice(0, 150)}...
                </p>
              </div>

              <div className="flex mt-4 md:mt-0 w-full md:w-auto items-center justify-between space-x-4">
                <h2 className="text-2xl font-bold text-lime-600">
                  ₹{item.price}
                </h2>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-6 py-2 font-semibold transition-colors"
                  onClick={() => deleteItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-8 w-full flex justify-end">
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <h1 className="text-3xl font-bold text-slate-800">
                Order Summary
              </h1>
              <div className="mt-4 flex items-center justify-between text-xl text-slate-600">
                <h2>({Cart.length}) Equipments</h2>
                <h2 className="font-bold text-lime-600 ml-6">₹{total}</h2>
              </div>
              <div className="w-full mt-6">
                <button
                  onClick={PlaceOrder}
                  className="bg-lime-600 text-white rounded-lg px-4 py-3 flex justify-center w-full font-bold shadow-md transition-colors duration-300 hover:bg-lime-700"
                >
                  Rent Now
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
