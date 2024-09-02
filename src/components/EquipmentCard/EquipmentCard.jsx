import React from 'react'
import { Link } from 'react-router-dom'

const EquipmentCard = ({data}) => {
  return (
    <>
    <Link to={`/view-equipment-details/${data._id}`}>
    <div className='bg-zinc-300 rounded p-4 flex flex-col'>
        <div className='bg-white rounded h-[250px] flex items-center justify-center'>
            <img src={data.url} alt='/' className='w-full object-cover h-full'/>
        </div>
        <h2 className='mt-4 text-zinc-800 text-xl font-semibold'>{data.title}</h2>
        <p className='mt-2 text-zinc-500 font-semibold'>by {data.owner}</p>
        <p className='mt-2 text-orange-600 font-semibold text-xl'>₹ {data.price}/-</p>
    </div>
    </Link>
    </>
  )
}

export default EquipmentCard