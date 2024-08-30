import React from 'react';

const Hero = () => {
  return <div className='h-[80vh]  flex items-center justify-center'  style={{
    backgroundImage: "url(./hero.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}>
    <div className='"w-full flex flex-col items-center  justify-center text-center'>
        <h1 className='lg:text-6xl text-4xl font-semibold text-yellow-100  text-center'>Agricultural Solution</h1>
        <p className='mt-4 text-xl  text-center text-zinc-300 px-6'>
            High-performing products that keep large turf areas beautiful and healthy-while saving you time, water and energy.
        </p>
        <div className='mt-8'>
        <button className='text-orange-100 text-xl lg:text-2xl font-semibold border hover:bg-orange-500 px-10 py-3 hover:bg-ornage-100 rounded-full'>Discover Equipment</button>
        </div>

    </div>
  
  </div>
  
};

export default Hero
