import { Request,Response,NextFunction } from "express";

export const validateLink = (req:Request,res:Response,next:NextFunction)=>{
    const {code,url} = req.body
    if(!code||!url){
        res.status(400).json({error:'Bad Request',message:'code and url are required'})
        return
    }
    
    next()
}