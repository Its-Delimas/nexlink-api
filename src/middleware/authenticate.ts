import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { AppError } from "../errors/AppError";

const JWT_SECRET = 'nexlink_secret_dev'

export const authenticate = (req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization

    if(!authHeader||!authHeader.startsWith('Bearer ')){
        return next(new AppError('No token provided',401))
}
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token,JWT_SECRET)
        req.user = decoded
        next()
    }catch{
        next(new AppError('Invalid or expired token',401))
    }

}