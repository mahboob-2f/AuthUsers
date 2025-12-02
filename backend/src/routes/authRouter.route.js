import express from 'express';
import { logIn, logOut, register, sendVerifyOtp,verifyEmail } from '../controllers/auth.controller.js';
import { userAuth } from '../middleware/auth.middleware.js';

const authRouter =  express.Router();

authRouter.post('/register',register);
authRouter.post('/login',logIn);
authRouter.post('/logout',logOut);
authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp);
authRouter.post('/verify-account',userAuth,verifyEmail);


export {authRouter}