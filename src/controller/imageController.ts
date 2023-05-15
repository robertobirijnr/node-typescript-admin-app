import multer from 'multer';
import { Request, Response } from "express";
import { extname } from 'path';




export const UploadImage =async (req:Request,res:Response) =>{
    const storage = multer.diskStorage({
        destination:'./uploads',
       filename(_:Request, file, callback) {
               const randomName = Math.random().toString(20).substring(1,12);
               return callback(null,`${randomName}${extname(file.originalname)}`)
       }
});

const upload = multer({storage}).single('image')

upload(req,res,(err)=>{
    if(err){
        return res.status(400).send(err)
    }
    res.send({
        url:`http://localhost:8000/api/uploads/${req.file.filename}`
    })
})


   
}