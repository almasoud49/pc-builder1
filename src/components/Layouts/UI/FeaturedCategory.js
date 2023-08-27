import Link from 'next/link';
import React from 'react';
import { BsMotherboard, BsCpu, BsPower, BsMemory, BsDeviceHdd } from 'react-icons/bs';
import { CiMonitor } from 'react-icons/ci';

export default function FeaturedCategory({ categories }) {
  // Define an object mapping category names to their corresponding icons
  const categoryIcons = {
    Motherboard: <BsMotherboard />,
    CPU: <BsCpu />,
    "Power Supply Unit": <BsPower />,
    RAM: <BsMemory />,
    Storage: <BsDeviceHdd />,
    Monitor: <CiMonitor />,
    // Add more categories and icons as needed
  };

  return (
    <div className='w-full bg-blue-gray-50  mx-auto p-[50px] text-center'>
      <div className='max-w-[1300px]'>
        <p className='text-xl font-bold'>Featured Category</p>
        <p className='pt-[20px] pb-[50px] font-thin text-lg font-[calibri] '>Get Your Desired Product from Featured Category!</p>
        <div className='flex items-center justify-center'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2'>
            {categories?.map((category, idx) => (
              <Link href={`/products/${category}`} key={idx} className='h-[150px] w-[144px] rounded-lg bg-white p-4 flex flex-col items-center justify-between shadow-lg cursor-pointer hover:scale-[102%]'>
                <p className='text-5xl mt-2'> {categoryIcons[category] || category}</p>
                <p> {category}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}