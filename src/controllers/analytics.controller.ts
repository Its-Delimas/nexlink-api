import { Request,Response,NextFunction } from "express";
import { AppError } from "../errors/AppError";

let clicks : {id:string; code:string;clickedAt:string}[]=[]

export const getAllClicks = (req:Request,res:Response)=>{
    res.status(200).json({data:clicks})
}

export const getClickByCodes = (req:Request,res:Response,next:NextFunction)=>{
    const records = clicks.filter(l=>l.code===req.params.code)
    if(!records.length) return next(new AppError('No analytics for that code',404))
        
    res.status(200).json({data:records,total:records.length})
}

export const recordClick = (req:Request,res:Response)=>{
    const record = {
        id: String(clicks.length+1),
        code:req.params.code,
        clickedAt: new Date().toISOString()
    }
    clicks.push(record)
    res.status(201).json({data:record})

}