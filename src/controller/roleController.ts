import { Request, Response } from "express";
import appDataSource from "..";
import { Role } from "../entity/roleEntity";

export const Roles = async (req:Request,res:Response) =>{

    const roleData = appDataSource.getRepository(Role);

    res.send(await roleData.find())

}


export const createRole =  async (req:Request,res:Response) =>{
    const {name,permissions} = req.body;

    const roleData = appDataSource.getRepository(Role);

    const role = await roleData.save({name,permissions: permissions.map(id=>({id}))})

    res.status(201).send(role);
}


export const getRole = async (req:Request,res:Response) =>{

    const roleData = appDataSource.getRepository(Role);

    const id: number = parseInt(req.params.id, 10);
    res.send(await roleData.findOne({where:{id:id}, relations:['permissions']}))

}

export const updateRole = async (req:Request,res:Response) =>{
    const {name,permissions} = req.body;

    const roleData = appDataSource.getRepository(Role);

    const role  = await roleData.save({id:parseInt(req.params.id),name,permissions:permissions.map(id=>({id})) })

    res.status(202).send(role);
}

export const deleteRole = async (req:Request,res:Response) =>{

    const roleData = appDataSource.getRepository(Role);

    await roleData.delete(req.params.id)

    res.status(204).send(null)

}