import React from 'react'
import { assests } from '../assets/assests.js'
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from 'react-router'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {

  const navigate = useNavigate()
  const { userData, setIsLoggedIn, backendUrl,setUserData } = useContext(AppContext);
  const logout = async()=>{
    try{
      const {data}= await axios.post(backendUrl+'/api/auth/logout')
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);

      navigate('/');
    }catch(error){
      toast.error(error.message);
    }
  }

  return (
    <div className='flex w-full justify-between items-center px-16 sticky top-0 bg-amber-200 '>
      <Link to='/'>
        <div>
          <img src={assests.logo} alt="logo" className='w-18' loading='lazy' />
        </div>
      </Link>

      <div className='relative '>
        {
          userData ?
            <div className='w-8 h-8 flex justify-center items-center bg-black text-white 
              rounded-full group relative'>
              {userData.name[0].toUpperCase()}
              <div className='hidden group-hover:block text-black absolute right--1 top-8   rounded-md'>
                <ul className='flex flex-col text-sm w-24   bg-gray-200 rounded-md '>
                  {
                    !userData.isAccountVerified &&
                    <li className='  px-1 py-1 text-center hover:text-blue-800 rounded-md hover:bg-gray-300'>verify email</li>
                  }
                  <li onClick={logout} className='cursor-pointer px-1 py-1 text-center hover:text-blue-800 rounded-md hover:bg-gray-300'>logout</li>
                </ul>
              </div>
            </div>
            :
            <Link to='/login   '>
              <div className='flex  justify-center items-center space-x-1 border px-5 py-2
          rounded-full bg-gray-200 hover:bg-gray-300 hover:cursor-pointer transition-all
          duration-200'>
                <button className='hover:cursor-pointer' >Login  </button>
                <FaArrowRight size={12} />

              </div>
            </Link>

        }

      </div>

    </div>
  )
}

export default Navbar