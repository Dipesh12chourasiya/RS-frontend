import React, { useEffect, useState } from 'react'
import axios from 'axios';

const RecentlyAdded = () => {
  const [Data, setData]=useState();
  useEffect(()=>{
    const fetch =async()=>{
      const response=await axios.get("http://localhost:/1000/api/v1/get-recent-books");
      console.log(response)
    };
  },[])
  return (
    <div className=' py-8 px-4 bg-white'> 
    <h4 className='text-3xl text-orange-500'>Recently Availabe equipments</h4>
    </div>
  )
}

export default RecentlyAdded