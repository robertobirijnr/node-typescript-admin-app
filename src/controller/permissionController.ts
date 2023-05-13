import { Request, Response } from "express";
import appDataSource from "..";
import { Permission } from "../entity/permissionEntity";

export const Permissions = async (req:Request,res:Response) =>{

    const permissionData = appDataSource.getRepository(Permission);

    res.send(await permissionData.find())

}