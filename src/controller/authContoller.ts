import { User } from './../entity/userEntity';
import { Request, Response } from "express";
import appDataSource from "../index";
import { RegisterValidation } from "../validation/registerValidation";
import bcrypt from 'bcryptjs';

export const Register = async(req:Request,res:Response)=>{
    const data = req.body;

    const {error} = RegisterValidation.validate(data)

    if(error){
        return res.status(400).send(error.details)
    }

    if(data.password != data.password_confirm) return res.status(400).send({
        message:"Passwords do  not match!"
    })

    const user = appDataSource.getRepository(User);
    const {password,...respones} = await user.save({
        first_name:data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: await bcrypt.hash(data.password,10)
    })
    res.json({
        message:"user created",
        data:respones
    })
}

export const Login = async(req:Request,res:Response)=>{
    const userData = appDataSource.getRepository(User);

    const user = await userData.findOne({where:{email: req.body.email}})
    if(!user){
        res.status(404).json({
            message:"nvalid Credentials",
            
        })
    }

    if(!await bcrypt.compare(req.body.password, user.password)){
        res.status(404).json({
            message:"Invalid Credentials",
            
        })
    }

    res.json({
        message:"user login",
        data:user
    })
}