import { Request,Response } from "express"
import { Admin } from '../types/login';
import AdminServer from '../models/login';
import { generateJWT } from '../helpers/generate-JWT';


export const adminLogin = async(req:Request, res:Response) => {
  const {name,password}: Admin = req.body;

  //Buscar si existe el nombre
  const admin = await AdminServer.findOne({
    $and:[{name:name},{password:password}]
  });

  if(!admin){
    return res.status(400).json({
      msg:"No eres el usuario autorizado"
    })
  }

  //Guardar en base de datos
  const admServer = new AdminServer({name,password});

  //Generar JWT
  const token = await generateJWT(admServer._id);

  res.status(201).json({
    ok:true,
    name,
    password,
    token
  })
}