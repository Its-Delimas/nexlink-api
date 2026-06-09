import { Request,Response,NextFunction } from "express";
import { AppError } from "../errors/AppError";

let links = [
    {id:'1',code:'abc123',url:'https://google.com'},
    {id:'2',code:'xyz789',url:'https://github.com'},
]

export const getAllLinks = (req:Request,res:Response)=>{
    res.status(200).json({data:links})
}

export const getLinkByCode = (req:Request,res:Response,next:NextFunction)=>{
    const link = links.find(l=>l.code===req.params.code)
    if(!link) return next(new AppError('No link with that code',404))
        res.status(200).json({data:link})
}

export const createLink = (req:Request,res:Response)=>{
    const {code,url} = req.body;
    const newLink = {
        id: String(links.length+1),
        code,
        url
    }
    links.push(newLink)
    res.status(201).json({data:newLink,message:'Link Created'})
}

export const updateLink = (req:Request,res:Response,next:NextFunction)=>{
    const link = links.findIndex(l=>l.code===req.params.code)
    if(!link) return next(new AppError('No link with that code',404))

    const {url} = req.body
    if(!url) return next(new AppError('url is required',400))

    link.url = url
    res.status(200).json({data:link, message:'Link updated'})

}

export const deleteLink = (req:Request,res:Response,next:NextFunction)=>{
    const index = links.findIndex(l=>l.code===req.params.code)
    if(index===-1)return next(new AppError('No link with that code',404))

    links.splice(index,1)
    res.status(204).send()
}