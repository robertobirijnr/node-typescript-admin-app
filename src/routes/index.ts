import { AuthMiddleware } from '../mddleware/authMiddleware';
import { AuthUser, Login,Register, logout, updatePassword, updateProfile } from './../controller/authContoller';
import { Router } from "express";


export const routes = (router:Router)=>{
   router
        .post('/api/register',Register)
        .post('/api/login',Login)
        .get('/api/user',AuthMiddleware,AuthUser)
        .post('/api/logout',AuthMiddleware, logout)
        .put('/api/user/profile',AuthMiddleware, updateProfile)
        .put('/api/user/change-password',AuthMiddleware, updatePassword)
}