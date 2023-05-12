import { User } from './../entity/userEntity';
import { Request, Response } from "express";
import appDataSource from "../index";
import {  verify } from 'jsonwebtoken';

export const AuthMiddleware = async(req:Request,res:Response,next:Function)=>{
    try {
        const jwt = req.cookies['jwt'];
    
        const payload:any = verify(jwt,process.env.JWT_SECRETE_KEY)
    
        if(!payload)  return res.status(401).json({
            message:"Unauthorized",
            
        })
    
        const userData = appDataSource.getRepository(User);
    
         req["user"] = await userData.findOne({where:{id: payload.id}})

       
    
        next()
       } catch (error) {
        return res.status(401).json({
            message:"Unauthenticated",
            
        })
       }
}