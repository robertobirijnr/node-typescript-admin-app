import { UploadImage } from '../controller/imageController';
import { Export, getOrders } from '../controller/orderController';
import { Permissions } from '../controller/permissionController';
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from '../controller/productController';
import { Roles, createRole, deleteRole, getRole, updateRole } from '../controller/roleController';
import { Users, createUsers, deleteUser, getUser, updateUser } from '../controller/userController';
import { AuthMiddleware } from '../mddleware/authMiddleware';
import { PermissionMiddleware } from '../mddleware/permssionMiddleware';
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

        
        .get('/api/users',AuthMiddleware,PermissionMiddleware('users'), Users)
        .post('/api/user/create',AuthMiddleware,PermissionMiddleware('users'), createUsers)
        .get('/api/users/:id',AuthMiddleware,PermissionMiddleware('users'), getUser)
        .put('/api/users/:id',AuthMiddleware,PermissionMiddleware('users'), updateUser)
        .delete('/api/users/:id',AuthMiddleware,PermissionMiddleware('users'), deleteUser)

        .get('/api/permissions',AuthMiddleware, Permissions)

        .get('/api/roles',AuthMiddleware,Roles )
        .post('/api/roles',AuthMiddleware,createRole )
        .get('/api/roles/:id', AuthMiddleware,getRole)
        .put('/api/roles/:id', AuthMiddleware,updateRole)
        .delete('/api/roles/:id', AuthMiddleware,deleteRole)

        .get('/api/products',AuthMiddleware,PermissionMiddleware('products'),getAllProducts )
        .post('/api/products',AuthMiddleware,PermissionMiddleware('products'),createProduct )
        .get('/api/products/:id',AuthMiddleware,PermissionMiddleware('products'),getSingleProduct )
        .put('/api/products/:id',AuthMiddleware,PermissionMiddleware('products'),updateProduct )
        .delete('/api/products/:id',AuthMiddleware,PermissionMiddleware('products'),deleteProduct )
        
        .post('/api/upload',AuthMiddleware,UploadImage )
        .use('/api/uploads',express.static('./uploads') )

        .get('/api/orders',AuthMiddleware,getOrders )
        .post('/api/export',AuthMiddleware,Export )

       

}