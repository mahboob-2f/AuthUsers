import React from 'react'
import {Routes,Route} from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import ResetPass from './pages/ResetPass'
import NotFound from './pages/NotFound'

const Routess = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='/reset-password' element={<ResetPass/>}/>

        <Route path='*' element={<NotFound/>}/>

    </Routes>
  )
}

export default Routess