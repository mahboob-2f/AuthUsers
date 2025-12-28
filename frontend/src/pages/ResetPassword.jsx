import React, { useContext, useState } from 'react';
import { assests } from '../assets/assests';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';


const ResetPassword = () => {

    axios.defaults.withCredentials=true;

    const [email,setEmail] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const navigate = useNavigate();

    const inputRefs = useRef([]);

    const {backendUrl}= useContext(AppContext);

    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    }
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }
    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text');
        if (!paste || paste.size === 0) return;
        const pastedArray = paste.split('');

        pastedArray.forEach((char, index) => {
            inputRefs.current[index].value = char;
        })
    }

    const handleSubmit = async(e) =>{
        try{
            e.preventDefault();
            const otpArr = inputRefs.current.map(e => e.value);
            const otp = otpArr.join('');
            
            const {data}= await axios.post(backendUrl +'/api/auth/reset-password' ,{
                email,
                otp,
                newPassword
            })
            
            if(data.success){
                toast.success(data.message);
                navigate('/login')
            }else{
                toast.error(data.message);
            }


        }catch(error){
            toast.error(error.message);
        }
    }
    return (
        <div className='w-full min-h-screen bg-[linear-gradient(208deg,rgba(119,0,255,0.29)_10%,rgba(130,210,238,0.14)_60%)]' >
            <div className='w-32'>
                <Link to='/'>
                    <img src={assests.logo} alt="logo" loading='lazy' />
                </Link>
            </div>
            <div>
                <h1>Enter Your new Password</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">enter email</label>
                        <input type="email" placeholder='enter email' onChange={e => setEmail(e.target.value)} value={email}/>
                    </div>
                    <div>
                        <label htmlFor="">enter otp</label>
                        <div onPaste={handlePaste} className='space-x-1'>
                            {
                                Array(6).fill(0).map((_, index) => (
                                    <input key={index} type='text' maxLength='1' required
                                        className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md '
                                        ref={e => inputRefs.current[index] = e}
                                        onInput={(e) => handleInput(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">enter new password</label>
                        <input type="text" placeholder='enter new password'  onChange={e => setNewPassword(e.target.value)} value={newPassword} />
                    </div>

                    <button type='submit'>Reset Password</button>
                </form>
            </div>

        </div>
    );
};

export default ResetPassword;