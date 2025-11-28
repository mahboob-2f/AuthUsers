import express from 'express';
import { logIn, logOut, register } from '../controllers/auth.controller.js';

const authRouter =  express.Router();

authRouter.post('/register',register);
authRouter.post('/login',logIn);
authRouter.post('/logout',logOut);


export {authRouter}