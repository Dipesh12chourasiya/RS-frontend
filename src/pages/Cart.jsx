import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import emptycart from "../assets/empty-cart.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-user-cart",
        { headers }
      );
      // console.log("Headers" , response)
      setCart(response.data.data);
    };

    fetch();
  }, [Cart]);

  const deleteItem = async (equipment_id) => {
    const response = await axios.put(
      `http://localhost:1000/api/v1/remove-from-cart/${equipment_id}`,
      {},
      { headers }
    );
    alert(response.data.message);
  };

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [Cart]);

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
      console.log(error);
    }
  };

  return (
    <div className="bg-orange-200 px-12 h-screen py-8">
      {!Cart && (
        <div className="flex justify-center items-center h-[87vh]">
          {" "}
          <Loader />
        </div>
      )}

      {Cart && Cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className=" text-5xl lg:text-6xl font-semibold text-zinc-400">
              Empty Cart
            </h1>
            <img src={emptycart} alt="empty cart" className="lg:h-[50vh]" />
          </div>
        </div>
      )}

      {Cart && Cart.length > 0 && (
        <>
          {/* <h1 className="text-5xl font-bold">Your Cart</h1> */}
          {Cart.map((items, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-orange-100 justify-between items-center"
              key={i}
            >
              <img
                src={items.url}
                alt="/"
                className="h-[20vh] md:h-[10vh] object-cover"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl font-semibold text-start mt-2 md:mt-0">
                  {items.title}
                </h1>
                <p className="text-normal mt-2 hidden lg:block">
                  {items.desc.slice(0, 100)}...
                </p>
                <p className="text-normal mt-2 hidden md:block lg:hidden">
                  {items.desc.slice(0, 65)}...
                </p>
                <p className="text-normal mt-2 block md:hidden">
                  {items.desc.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className=" text-3xl font-semibold flex">
                  {items.price} Rs
                </h2>
                <button
                  className="bg-red-500 hover:bg-red-600  text-white rounded p-2 ms-12"
                  onClick={() => deleteItem(items._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {Cart && Cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-4 bg-orange-100 rounded">
            <h1 className="text-3xl font-semibold">Total Amount</h1>
            <div className="mt-3 flex items-center justify-between text-xl">
              <h2>({Cart.length}) Equipments </h2>
              <h2 className="font-bold ml-3"> {total} Rs.</h2>
            </div>
            <div className="w-[100%] mt-3">
              <button
                onClick={PlaceOrder}
                className="bg-orange-500 text-white rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-orange-700"
              >
                Rent now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
