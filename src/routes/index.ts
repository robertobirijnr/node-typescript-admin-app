import { UploadImage } from '../controller/imageController';
import { Permissions } from '../controller/permissionController';
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from '../controller/productController';
import { Roles, createRole, deleteRole, getRole, updateRole } from '../controller/roleController';
import { Users, createUsers, deleteUser, getUser, updateUser } from '../controller/userController';
import { AuthMiddleware } from '../mddleware/authMiddleware';
import { AuthUser, Login,Register, logout, updatePassword, updateProfile } from './../controller/authContoller';
import {  Router} from "express";
import  express  from "express";



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

        .get('/api/permissions',AuthMiddleware, Permissions)

        .get('/api/roles',AuthMiddleware,Roles )
        .post('/api/roles',AuthMiddleware,createRole )
        .get('/api/roles/:id', AuthMiddleware,getRole)
        .put('/api/roles/:id', AuthMiddleware,updateRole)
        .delete('/api/roles/:id', AuthMiddleware,deleteRole)

        .get('/api/products',AuthMiddleware,getAllProducts )
        .post('/api/products',AuthMiddleware,createProduct )
        .get('/api/products/:id',AuthMiddleware,getSingleProduct )
        .put('/api/products/:id',AuthMiddleware,updateProduct )
        .delete('/api/products/:id',AuthMiddleware,deleteProduct )
        .post('/api/upload',AuthMiddleware,UploadImage )
        .use('/api/uploads',express.static('./uploads') )

       

}