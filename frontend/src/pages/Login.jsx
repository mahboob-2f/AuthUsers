import React, { useContext, useState } from 'react';
import { assests } from '../assets/assests';
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate,Link } from 'react-router';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import {toast} from  'react-toastify'



const Login = () => {

  const [state, setState] = useState('signUp');
  const [showPassword, setShowPassword] = useState(false);


  const [name,setName]= useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const navigate = useNavigate();

  const {backendUrl,setIsLoggedIn,getUserData} = useContext(AppContext);
  
  const submitHandler =async(e)=>{
    try {
      e.preventDefault();
      axios.defaults.withCredentials= true;  
      //     this line will send cookies to backend server otherwise
      //          cookies will remain in browser only

      if(state ==='signUp'){
        // console.log(backendUrl);
        const {data} = await axios.post(backendUrl+'/api/auth/register',{
          name,
          email,
          password
        }, { withCredentials: true })
        if(data.success){
          // TODO:   might be error in next line 
          setIsLoggedIn(true);  
          getUserData()  ;
          navigate('/');
        }else{
          // alert(data.message)
          toast.error(data.message);
        }
      }else{
        const {data}=await axios.post(backendUrl+'/api/auth/login',{
          email,
          password
        }, { withCredentials: true })
        if(data.success){
          setIsLoggedIn(true);
          getUserData()  ;
          navigate('/');
        }else{
          toast.error("hello");
        }

      }

    } catch (error) {
      toast.error("Error : "+error.message)
    }
  }


  return (
    <div className='w-full min-h-screen bg-[linear-gradient(208deg,rgba(119,0,255,0.29)_10%,rgba(130,210,238,0.14)_60%)]'>
      <div className='w-32'>
        <Link to='/'>
          <img src={assests.logo} alt="logo" loading='lazy' />
        </Link>
      </div>
      <div className='max-w-[480px] mx-auto flex justify-center items-center  flex-col bg-slate-800
        p-12 pb-8 rounded-lg space-y-4 max-sm:w-[70%]'>
        <div className='flex flex-col space-y-4 text-white justify-between items-center'>
          <h1 className='text-3xl font-semibold'>{state === 'signUp' ? "Create Account" : "Login"}</h1>
          <p className='text-md font-light text-blue-300'>{state === 'signUp' ? 'Create Your Account' : 'Login to Your Account'}</p>
        </div>

        <form onSubmit={submitHandler} className='flex flex-col   space-y-3'>

          {
            state === 'signUp' && (
              <div className='flex justify-between items-center bg-[#333A5C]  px-4
            rounded-full text-white'>
                <div><IoPersonOutline size={18} /></div>
                <input type="text" placeholder='Full Name' required className='bg-transparent px-1 py-2 outline-0'
                  onChange={(e)=>setName(e.target.value)} value={name}
                />
              </div>
            )
          }

          <div className='flex justify-between items-center bg-[#333A5C]  px-4
            rounded-full text-white'>
            <div><MdOutlineEmail size={18} /></div>
            <input type="email" placeholder='Email Id' required className='bg-transparent px-1 py-2 outline-0'
              onChange={(e)=>setEmail(e.target.value)} value={email}
            />
          </div>

          <div className='relative flex justify-center items-center bg-[#333A5C]  px-4
            rounded-full text-white   '>
            <div><RiLockPasswordFill size={18} /></div>

            <input type={showPassword ? "text" : "password"}
              placeholder='Password' required className=' bg-transparent px-1 py-2 outline-0'
                onChange={(e)=>setPassword(e.target.value)} value={password}
              />

            <div className='absolute right-3 z-20  cursor-pointer' onClick={() => (setShowPassword(!showPassword))}>
              {
                showPassword ? <IoIosEyeOff /> : <IoIosEye />
              }
            </div>
          </div>
          <p onClick={()=>(navigate('/reset-password'))} className='px-1 justify-self-start text-[15px] text-indigo-500 font-medium cursor-pointer'>Forgot Password ?</p>

          <div className='flex justify-center items-center text-white mt-3     
            
            rounded-full hover:
            transition-all duration-200 cursor-pointer'>
            <button type='submit' className='bg-[linear-gradient(308deg,rgba(6,0,255,0.72)_21%,rgba(130,144,238,0.8)_100%)] 
              hover:bg-[linear-gradient(308deg,rgba(6,0,255,0.92)_21%,rgba(130,144,238,1)_100%)]
              w-full text-xl cursor-pointer py-2 rounded-full '>{state === 'signUp' ? "Sign Up" : 'Login'}</button>
          </div>

        </form>
        <div className='flex justify-center itesm flex-col space-y-1'>
          {
            state !== 'signUp' ? 
            (<p onClick={()=>setState('signUp')} className='text-white  text-sm font-medium text-center'>Don't have account? <span className='
            text-blue-400 underline cursor-pointer'>Sign Up</span></p>) 
          :
           (<p onClick={()=>(setState('Login'))} className='text-white  text-sm font-medium'>Already have account? <span className='
            text-blue-400 underline cursor-pointer'>Login here</span></p>)
          }
        </div>
      </div>

    </div>
  );
};

export default Login;