import axios from 'axios';
import React from 'react'
import { useEffect , useState } from 'react';
import Loader from '../Loader/Loader';

const Settings = () => {
  const [Value, setValue] = useState({address: ""});
  const [ProfileData, setProfileData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-user-information",
        { headers }
      );
      // console.log(response.data);
      setProfileData(response.data);
      setValue({address: response.data.address});
    };
    fetch();
  }, []);

  const change = (e) =>{
    const { name, value} = e.target;
    setValue({...Value, [name]: value});
  }

  const submitAddress = async () =>{
    const response = await axios.put("http://localhost:1000/api/v1/update-address", Value, {headers});
    alert(response.data.message);
  }

  return (
    
    <>
    {/* {console.log(ProfileData)} */}
      {!ProfileData && (
        <div className="w-full flex items-center justify-center h-screen">
          <Loader />
        </div>
      )}
      {ProfileData && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Settings</h1>
          <div className='flex gap-12'>
              <div>
                <label className='text-black' htmlFor="">Username</label>
                <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{ProfileData.username}</p>
              </div>
              <div>
                <label className='text-black' htmlFor="">Email</label>
                <p className='p-2 rounded-none bg-zinc-800 mt-2 font-semibold'>{ProfileData.email}</p>
              </div>
              {/* <div>
                <label className='text-black' htmlFor="">Phone Number</label>
                <p className='p-2 rounded-none bg-zinc-800 mt-2 font-semibold'>{ProfileData.phoneNumber}</p>
              </div> */}
          </div>
          <div className='mt-4 flex flex-col'>
            <label className='text-black' htmlFor="">Address</label>
            <textarea onChange={change} className='p-2 rounded bg-zinc-800 mt-2 font-semibold' rows="3" placeholder='Address' name='address' value={Value.address} />
          </div>
          <div className='mt-4 flex justify-start '>
            <button onClick={submitAddress} className='bg-blue-900 font-semibold px-3 py-2 rounded hover:bg-blue-800 text-white'>Update</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Settings