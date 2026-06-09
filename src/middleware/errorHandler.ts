import { Request,Response,NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const errorHandler = (err:Error,req:Request,res:Response,next:NextFunction)=>{
    console.error(`[ERROR] ${err.message}`)

        if(err instanceof AppError){
            res.status(err.statusCode).json({
                error:err.name,
                message:err.message
            })
            return
        }

    //unhandled ~ unexpected errors
    res.status(500).json({
        error:'InternalServerError',
        message:'Something went wrong'
    })
}
