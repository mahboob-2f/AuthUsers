import express from 'express';
import { isAuthenticated,sendResetOtp, logIn, logOut, register, sendVerifyOtp,verifyEmail, resetPassword } from '../controllers/auth.controller.js';
import { userAuth } from '../middleware/auth.middleware.js';

const authRouter =  express.Router();

authRouter.post('/register',register);
authRouter.post('/login',logIn);
authRouter.post('/logout',logOut);
authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp);
authRouter.post('/verify-account',userAuth,verifyEmail);
authRouter.post('/is-auth',userAuth,isAuthenticated);
authRouter.post('/send-reset-otp',sendResetOtp);
authRouter.post('/reset-password',resetPassword);


export {authRouter}