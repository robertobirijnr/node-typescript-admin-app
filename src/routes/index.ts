import { Login } from './../controller/authContoller';
import { Router } from "express";
import { Register } from "../controller/authContoller";

export const routes = (router:Router)=>{
   router
        .post('/api/register',Register)
        .post('/api/login',Login)
}