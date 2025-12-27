import React, { use, useContext, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import { assests } from '../assets/assests'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';



function VerifyEmail() {

  axios.defaults.withCredentials = true;

  const {backendUrl,getUserData,isLoggedIn, userData} = useContext(AppContext);

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleInput =(e,index)=>{
    if(e.target.value.length > 0 && index < inputRefs.current.length -1){
      inputRefs.current[index+1].focus();
    }
  }
  const handleKeyDown = (e,index) =>{
    if(e.key === 'Backspace' && e.target.value === '' && index > 0){
      inputRefs.current[index-1].focus();
    }
  }

  const handlePaste = (e) =>{
    const paste = e.clipboardData.getData('text');
    if(!paste  || paste.size === 0) return;
    const pastedArray = paste.split('');

    pastedArray.forEach((char,index)=>{
      inputRefs.current[index].value = char;
    })
  }

  const submitHandler = async(e) =>{
    try{
      e.preventDefault();
      const otpArr = inputRefs.current.map(e => e.value);;
      const otp  = otpArr.join('');

      const {data}= await axios.post(backendUrl+ '/api/auth/verify-account',{otp} ,{withCredentials:true});
      if(data.success){
        toast.success(data.message);
        getUserData();
        navigate('/');
      }else{
        alert('invalid otp');
        toast.error(data.message);
      }

    }catch(error){
      toast.error(error.message);
    }
  }

  useEffect(()=>{

    isLoggedIn && userData && userData.isAccountVerified && navigate('/');

  },[isLoggedIn,userData])

  return (
    <div className='w-full min-h-screen bg-[linear-gradient(208deg,rgba(119,0,255,0.29)_10%,rgba(130,210,238,0.14)_60%)]' >
      <div className='w-32'>
        <Link to='/'>
          <img src={assests.logo} alt="logo" loading='lazy' />
        </Link>
      </div>
      
      <form action=""  onSubmit={submitHandler}>
        <h1>Email Verify Otp</h1>
        <p>Enter the Otp send to email </p>
        <div  className='flex justify-center space-x-1   ' onPaste={handlePaste}>
          {
            Array(6).fill(0).map((_,index)=>
              <input type='text' maxLength='1' required key={index} 
                className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
                ref= {e => inputRefs.current[index] = e }
                onInput={(e)=> handleInput(e,index)}
                onKeyDown={(e)=> handleKeyDown(e,index)}
              />
            )
          }
        </div>
        <button type='submit' className=''>Verify Email</button>
      </form>
      
    </div>
  )
}

export default VerifyEmail