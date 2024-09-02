import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import EquipmentCard from '../components/EquipmentCard/EquipmentCard'

const AllEquipments = () => {
   
        const [Data, setData]=useState();
        useEffect(()=>{
          const fetch =async()=>{
            const response=await axios.get("http://localhost:1000/api/v1/get-all-equipments");
            setData(response.data.data);
          };
          fetch();
        },[]);  
  return (
    <div className='bg-white px-4 py-8' >{" "}
         <h4 className='text-3xl text-orange-500'>All equipments</h4>
    {!Data && <div className='flex items-center justify-center my-8'><Loader /></div> }
    <div className=' my-4 sm:grid-cols-3 grid grid-cols-1 md:grid-cols-4   gap-9'>

      {Data && Data.map((items,i)=>(<div key={i}><EquipmentCard data={items}/>{" "}</div>))}
      {console.log(Data)}
    </div>
    </div>
  )
}

export default AllEquipments;