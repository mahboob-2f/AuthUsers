import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import {AppContext} from '../context/AppContext.jsx'
import axios from 'axios';
import { toast } from 'react-toastify';

function ResetPass() {
  const [email,setEmail] = useState('');
  const {backendUrl}=useContext(AppContext);

  const submitHandler = async (e) =>{
    try{
      e.preventDefault();

      const {data}= await axios.post(backendUrl+ '/api/auth/send-reset-otp');
      if(data.success){
        toast.success(data.success);
      }else{
        toast.error(data.message);
      }

    }catch(error){
      toast.error(error.message);
    }
  }


  return (
    <div>
      <div>
        <h1>
          Reset Password
        </h1>
      </div>
      <form action="" onSubmit={submitHandler}>
        <input type="email" placeholder='enter email' onChange={e => setEmail(e.target.value)} value ={email}/>
        <button >Send Reset Otp</button>
      </form>
    </div>
  )
}

export default ResetPass