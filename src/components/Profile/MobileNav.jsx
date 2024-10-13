import React from 'react'
import { Link } from 'react-router-dom'

const MobileNav = () => {
  return (
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
  )
}

export default MobileNav