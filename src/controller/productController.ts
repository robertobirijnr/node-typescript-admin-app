import appDataSource from ".."
import { Product } from "../entity/productEntity"
import { Request, Response } from "express";


export const getAllProducts = async(req:Request,res:Response)=>{
    const productData = appDataSource.getRepository(Product);
   const products = await productData.find()

   res.send(products);
}


export const createProduct = async (req:Request,res:Response) =>{

   const productData = appDataSource.getRepository(Product);

   const products = await productData.save(req.body)

   res.status(201).send(products)
}

export const getSingleProduct = async(req:Request,res:Response)=>{

    const productData = appDataSource.getRepository(Product);

    const product = await productData.findOne({where:{id:parseInt(req.params.id)}})

    res.send(product)
}

export const updateProduct =  async(req:Request,res:Response)=>{
    const productData = appDataSource.getRepository(Product);

    await productData.update(req.params.id,req.body)

    const product = await productData.findOne({where:{id:parseInt(req.params.id)}})

    res.status(202).send(product)
}

export const deleteProduct = async(req:Request, res:Response) =>{

    const productData = appDataSource.getRepository(Product);

    await productData.delete(req.params.id)

    res.status(204).send(null)
}