import jwt from 'jsonwebtoken';
import { NextFunction, Request,Response } from 'express';
import AdminServer from '../models/login';
import type { ID } from '../types/login';
import { JwtPayload } from 'jsonwebtoken';

export const verifyJWT = async(req: Request, res:Response, next:NextFunction) => {
  const token = req.header("x-token") as string;
  if(!token){
    return res.status(400).json({
      msg:"No hay token en la peticion"
    })
  }
  
  try{

    const {uid}: ID = jwt.verify(token,process.env.PRIVATE_KEY as string) as ID;

    //Buscar en la base de datos
    const admin = await AdminServer.findOne({uid});

    //@ts-ignore
    req.admin = admin;

    next();


  }catch(err){
    res.status(400).json({
      msg:"Token no valido"
    })
  }
}