import React, { useState } from 'react';
import { assests } from '../assets/assests';
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoIosEye ,IoIosEyeOff } from "react-icons/io";


const Login = () => {

  const [state, setState] = useState('signup');
  const [showPassword,setShowPassword] = useState(false);


  return (
    <div className='w-full min-h-screen bg-[linear-gradient(208deg,rgba(119,0,255,0.29)_10%,rgba(130,210,238,0.14)_60%)]'>
      <div className='w-32'>
        <img src={assests.logo} alt="logo" loading='lazy' />
      </div>
      <div className='w-[30%] mx-auto flex justify-center items-center  flex-col bg-slate-800
        p-12 pb-8 rounded-lg space-y-4'>
        <div className='flex flex-col space-y-4 text-white justify-between items-center'>
          <h1 className='text-3xl font-semibold'>{state === 'signup' ? "Create Account" : "Login"}</h1>
          <p className='text-md font-light text-blue-300'>{state === 'signup' ? 'Create Your Account' : 'Login to Your Account'}</p>
        </div>

        <form action="" className='flex flex-col   space-y-3'>

          <div className='flex justify-between items-center bg-[#333A5C] space-x-1  px-4
            rounded-full text-white'>
            <div><IoPersonOutline size={18} /></div>
            <input  type="text" placeholder='Full Name' required className='bg-transparent px-3 py-2 outline-0' />
          </div>

          <div className='flex justify-between items-center bg-[#333A5C] space-x-1  px-4
            rounded-full text-white'>
            <div><MdOutlineEmail size={18} /></div>
            <input  type="email" placeholder='Email Id' required className='bg-transparent px-3 py-2 outline-0' />
          </div>
          
          <div className='flex justify-between items-center bg-[#333A5C] space-x-1  px-4
            rounded-full text-white'>
            <div><RiLockPasswordFill size={18} /></div>

            <input type={showPassword ? "text":"password"}
               placeholder='Password' required className='bg-transparent px-3 py-2 outline-0' />

            <div onClick={()=>(setShowPassword(!showPassword))}>
              {
                showPassword ? <IoIosEyeOff/> : <IoIosEye/>
              }

            </div>
          </div>
          <p className='px-1 justify-self-start text-[15px] text-indigo-500 font-medium cursor-pointer'>Forgot Password ?</p>
          
          <div className='flex justify-center items-center text-white mt-3   py-2  
            bg-[linear-gradient(308deg,rgba(6,0,255,0.72)_21%,rgba(130,144,238,0.8)_100%)]
            rounded-full hover:bg-[linear-gradient(308deg,rgba(6,0,255,0.92)_21%,rgba(130,144,238,1)_100%)]
            transition-all duration-200 cursor-pointer'>
            <button className='text-xl cursor-pointer'>{state === 'signup' ? "Sign Up" :'Login'}</button>
          </div>

        </form>
        <div className='flex justify-center itesm flex-col space-y-1'>
        <p className='text-white  text-sm font-medium'>Already have account? <span className='
          text-blue-400 underline cursor-pointer'>Login here</span></p>
           <p className='text-white  text-sm font-medium text-center'>Don't have account? <span className='
          text-blue-400 underline cursor-pointer'>Sign Up</span></p>
          </div>
      </div>

    </div>
  );
};

export default Login;