import { User } from './../entity/userEntity';
import { Request, Response } from "express";
import appDataSource from "../index";
import { RegisterValidation } from "../validation/registerValidation";
import bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

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


//TO DO this throws error if password is not correct
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

   

    const token = sign({id: user.id}, process.env.JWT_SECRETE_KEY)

    res.cookie('jwt',token,{
        httpOnly:true,
        maxAge: 24*60*60*1000
    })

    res.json({
        message:"success",
    })
}

export const AuthUser = async(req:Request,res:Response)=>{
    const {password,...user} = req["user"];
  res.send(user);
}

export const logout = (req:Request,res:Response) =>{
    res.cookie('jwt','',{maxAge:0})

    res.send({
        message:"success"
    });

}

export const updateProfile = async(req:Request,res:Response) =>{

    const user = req["user"];

    const userData = appDataSource.getRepository(User);

    await userData.update(user.id, req.body);

    const {password, ...data} = await userData.findOne({where:{id: user.id}} )

    res.send(data)

}

export const updatePassword = async(req:Request,res:Response) =>{
    const user = req["user"];

    if(req.body.password != req.body.password_confirm) return res.status(400).send({
        message:"Passwords do  not match!"
    })

    const userData = appDataSource.getRepository(User);

    await userData.update(user.id, {
        password: await bcrypt.hash(req.body.password,10)
    });

    const {password, ...data} = user;

    res.send(data)
}