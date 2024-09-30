import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EquipmentCard from '../EquipmentCard/EquipmentCard';
import Loader from '../Loader/Loader';

const RecentlyAdded = () => {
  const [Data, setData]=useState();
  useEffect(()=>{
    const fetch =async()=>{
      const response = await axios.get("http://localhost:1000/api/v1/get-recent-equipments");
                                            //  localhost:1000/api/v1/get-recent-equipments
      setData(response.data.data);
    };
    fetch();
  },[])
  
  return (
    <div className=' py-8 px-4 bg-white'> 
    <h4 className= 'text-[35px] md:text-[50px] font-semibold text-orange-500 py-4 '>Recently Availabe equipments</h4>
    {!Data && <div className='flex items-center justify-center my-12'><Loader /></div> }
    <div className=' my-4 sm:grid-cols-3 grid grid-cols-1 md:grid-cols-4   gap-8'>

      {Data && Data.map((items,i)=>(<div key={i}><EquipmentCard data={items}/>{" "}</div>))}
    </div>
    </div>
  )
}

export default RecentlyAdded