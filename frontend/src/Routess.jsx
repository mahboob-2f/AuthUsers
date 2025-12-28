import React from 'react'
import {Routes,Route} from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import SendResetOtp from './pages/SendResetOtp'
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPassword'

const Routess = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='/send-reset-otp' element={<SendResetOtp/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>

        <Route path='*' element={<NotFound/>}/>

    </Routes>
  )
}

export default Routess