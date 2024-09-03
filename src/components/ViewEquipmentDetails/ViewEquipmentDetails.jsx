import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";

const ViewEquipmentDetails = () => {
  const {id}=useParams();
  
  const [Data, setData]=useState();
        useEffect(()=>{
          const fetch =async()=>{
            const response=await axios.get(`http://localhost:1000/api/v1/get-equipment-by-id/${id}`);
            setData(response.data.data);
          };
          fetch();
        },[]); 
  return (
    <>
    {Data && (<div className=' px-4 md:px-12 py-8 bg-white flex flex-col md:flex-row gap-8'>
        <div className='bg-orange-100 rounded p-4  h-[70vh] lg:h-[80vh]  w-full lg:w-3/6 flex  items-center justify-center' ><img src={Data.url} alt="image" className='h-[70vh]' /></div>
        <div className='p-4  w-full lg:w-3/6'>
        <h1 className='text-4xl text-zinc-800 font-semibold'>{Data.title}</h1>
        <p className='text-zinc-600 mt-4 text-xl'>{Data.desc}</p>
        <p className='flex mt-4 items-center justify-start text-zinc-500'><GrLanguage className='me-3'/>{Data.language}</p>
        <p className='mt-4 text-orange-500 text-3xl font-semibold'>Price : ₹ {Data.price} <span className='text-black text-[22px]'>Per Hour</span></p>
        </div>
        </div>
        )}
        {!Data && (<div className='h-screen bg-zinc 900 flex justify-center items-center'><Loader /></div>)}
    </>
        
   
  )
}

export default ViewEquipmentDetails