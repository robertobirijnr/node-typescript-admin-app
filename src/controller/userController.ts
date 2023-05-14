import { User } from './../entity/userEntity';
import appDataSource from "../index";
import bcrypt  from 'bcryptjs';
import { Request, Response } from "express";



export const Users = async (req:Request,res:Response)=>{

    const take = 15;

    const page = parseInt(req.query.page as string|| '1')

    const data = appDataSource.getRepository(User)

    const [users, total] = await data.findAndCount({
        take,
        skip:(page - 1) * take,
        relations:['role']
    })

    //we want to remove the password
    users.map(user =>{
        const {password, ...data} = user

        return data
    })

    res.send({
        data:users,
        meta:{
            total,
            page,
            last_page: Math.ceil(total/take)
        }
    })

}


export const createUsers = async (req:Request,res:Response)=>{

    const { role_id, ...body} = req.body;

    const hashedPassword = await bcrypt.hash('123',10)

    const data = appDataSource.getRepository(User)

    const {password, ...user} = await data.save({
        ...body,
        password:hashedPassword,
        role: {
            id: role_id
        }
    })


    res.status(201).send(user)
}



export const getUser = async (req:Request,res:Response)=>{

    const userData = appDataSource.getRepository(User)

    const id: number = parseInt(req.params.id, 10);
    const {password, ...data} = await userData.findOne({where:{id:id}, relations:['role']});

    res.send(data)


}

export const updateUser = async (req:Request,res:Response)=>{
    const { role_id, ...body} = req.body;

    const userData = appDataSource.getRepository(User)

    const id: number = parseInt(req.params.id, 10);
     await userData.update(id, {
        ...body,
        id: role_id
     });

     const {password, ...data} = await userData.findOne({where:{id:id}, relations:['role']});

    res.status(202).send(data)

}

export const deleteUser = async (req:Request,res:Response)=>{

    const userData = appDataSource.getRepository(User)

    const id: number = parseInt(req.params.id, 10);
     await userData.delete(id);

     res.status(204).send(null)

}