import React from 'react'
import {assests} from '../assets/assests.js'
import { FaArrowRight } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className='flex w-full justify-between items-center px-16 sticky top-0 bg-amber-200 '>
        <div className=''>
            <img src={assests.logo} alt="logo" className='w-18' loading='lazy' />
        </div>
        <div className='flex  justify-center items-center space-x-1 border px-5 py-2
          rounded-full bg-gray-200 hover:bg-gray-300 hover:cursor-pointer transition-all
          duration-200'>
          <button className='hover:cursor-pointer' >Login  </button>
          <FaArrowRight size={12}/>
        </div>
    </div>
  )
}

export default Navbar