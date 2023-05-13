import { Users, createUsers, deleteUser, getUser, updateUser } from '../controller/userController';
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

        
        .get('/api/users',AuthMiddleware, Users)
        .post('/api/user/create',AuthMiddleware, createUsers)
        .get('/api/users/:id',AuthMiddleware, getUser)
        .put('/api/users/:id',AuthMiddleware, updateUser)
        .delete('/api/users/:id',AuthMiddleware, deleteUser)
}