import { User } from './../entity/userEntity';
import appDataSource from "../index";
import bcrypt  from 'bcryptjs';
import { Request, Response } from "express";



export const Users = async (req:Request,res:Response)=>{

    const data = appDataSource.getRepository(User)

    const users = await data.find()

    res.send(users.map(user =>{
        const {password, ...data} = user

        return data
    }))

}


export const createUsers = async (req:Request,res:Response)=>{

    const { role_id, ...body} = req.body;

    const hashedPassword = await bcrypt.hash('123',10)

    const data = appDataSource.getRepository(User)

    const {password, ...user} = await data.save({
        ...body,
        password:hashedPassword
    })


    res.status(201).send(user)
}



export const getUser = async (req:Request,res:Response)=>{

    const userData = appDataSource.getRepository(User)

    const id: number = parseInt(req.params.id, 10);
    const {password, ...data} = await userData.findOne({where:{id:id}});

    res.send(data)


}

export const updateUser = async (req:Request,res:Response)=>{
    const { role_id, ...body} = req.body;

    const userData = appDataSource.getRepository(User)

    const id: number = parseInt(req.params.id, 10);
     await userData.update(id, body);

     const {password, ...data} = await userData.findOne({where:{id:id}});

    res.status(202).send(data)

}

export const deleteUser = async (req:Request,res:Response)=>{

    const userData = appDataSource.getRepository(User)

    const id: number = parseInt(req.params.id, 10);
     await userData.delete(id);

     res.status(204).send(null)

}