import React from 'react'
import { assests } from '../assets/assests.js'
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from 'react-router'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

const Navbar = () => {

  const navigate = useNavigate()
  const { userData, setIsLoggedIn, backendUrl } = useContext(AppContext);

  return (
    <div className='flex w-full justify-between items-center px-16 sticky top-0 bg-amber-200 '>
      <Link to='/'>
        <div>
          <img src={assests.logo} alt="logo" className='w-18' loading='lazy' />
        </div>
      </Link>
      <Link to='/login'>
        <div className='relative bg-amber-300'>
          {
            userData ?
              <div className='w-8 h-8 flex justify-center items-center bg-black text-white 
              rounded-full group relative'>
                {userData.name[0].toUpperCase()}
                <div className='hidden group-hover:block text-black absolute right-20 '>
                  <ul className='flex flex-col text-sm  bg-blue-900'>
                    <li>verify email</li> 
                    <li>logout</li>
                  </ul>
                </div>
              </div>
              :
              <div className='flex  justify-center items-center space-x-1 border px-5 py-2
          rounded-full bg-gray-200 hover:bg-gray-300 hover:cursor-pointer transition-all
          duration-200'>
                <button className='hover:cursor-pointer' >Login  </button>
                <FaArrowRight size={12} />

              </div>
          }

        </div>
      </Link>
    </div>
  )
}

export default Navbar