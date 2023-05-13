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

    res.send(role);
}