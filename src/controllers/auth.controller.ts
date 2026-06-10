import { Request,Response,NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

const JWT_SECRET = 'nexlink_secret_dev'

let users:{id:string;email:string;password:string}[]=[]

export const register = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {email, password} = req.body

        if(!email||!password) return next(new AppError('Email and password are required',400))

        const exists = users.find(u=>u.email===email)
        if(exists) return next(new AppError('Email already Registered',409))

        const hashed = await bcrypt.hash(password,10)
        const newUser = {id: String(users.length+1),email,password:hashed}
        users.push(newUser)

        res.status(201).json({message:'Registered successfully'})
    }catch(err){
        next(err)
    }
}

export const login = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {email,password} = req.body

        if (!email||!password) return next(new AppError('email and password are required',400))
        
        const user = users.find(u=>u.email===email)
        if(!user) return next(new AppError('Invalid credentials',401))
        
        const match = await bcrypt.compare(password,user.password)
        if(!match) return next(new AppError('Invalid credentials',401))

        const token = jwt.sign({id:user.id,email:user.email},JWT_SECRET,{expiresIn:'7d'})

        res.status(200).json({token})

} catch (err){
    next(err)
}
}