import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <>
    {role === "user" && (
      <div className="w-full flex items-center justify-between my-8 ">
      <Link
        to="/profile"
        className="font-semibold w-full  text-center hover:bg-zinc-500 rounded transition-all"
      >
        Favourites
      </Link>
      <Link
        to="/profile/orderHistory"
        className="font-semibold w-full  text-center hover:bg-zinc-500 rounded transition-all"
      >
        Order History
      </Link>
      <Link
        to="/profile/settings"
        className="font-semibold w-full   text-center hover:bg-zinc-500 rounded transition-all"
      >
        Settings
      </Link>
    </div>
    )}

{role === "admin" && (
      <div className="w-full flex items-center justify-between my-8 ">
      <Link
        to="/profile"
        className="font-semibold w-full  text-center hover:bg-zinc-500 rounded transition-all"
      >
        All Orders
      </Link>
      <Link
        to="/profile/addEqp"
        className="font-semibold w-full  text-center hover:bg-zinc-500 rounded transition-all"
      >
        Add Equipment
      </Link>
    </div>
    )}

    </>
  )
}

export default MobileNav