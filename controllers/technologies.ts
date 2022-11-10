import { Request, Response } from "express";
import { FileArray } from 'express-fileupload';
import { fileUploadServer, 
          deleteFiles, 
          uploadCloudinary} from '../helpers';
import { Technology } from "../models/technology";
import { TechnologyType } from '../types';


const getTech = async(req: Request,res: Response) => {

  const [total,technologies] = await Promise.all([
    Technology.find({}).countDocuments(),
    Technology.find({})
  ])

  res.json({
    total,
    results:technologies
  })
}

const getTechID = async(req: Request,res: Response) => {
  const {id} = req.params;

  const technology = await Technology.findById(id);
  
  res.json({
    ok:true,
    technology
  });
}

const createTech = async(req: Request,res: Response) => {
  const {name}: TechnologyType = req.body;  
    
  //Tratamiento de imagenes
  const files: FileArray = req.files as FileArray; 
  const savedImg = await fileUploadServer(files)
      .then((path: string) =>{
        //Subida a cloudinary
        return uploadCloudinary(path);
      })
      .then((img) => {
        return img;
      })
      .catch((msg) => res.status(400).json({ msg }));

  //Limpiar server
  deleteFiles();


  //SaveData
  const data: TechnologyType = {
    name,
    imgUrl:savedImg as string
  }

  const save_tech = await new Technology(data);
  save_tech.save();
  
  res.status(201).json({
    ok:true,
    msg:"Creado exitosamente",
  })
}

const updateTechID = async(req: Request,res: Response) => {
  const {id} = req.params;
  const { name }: TechnologyType = req.body;


  await Technology.findByIdAndUpdate(id,{name});

  res.json({
    ok:true,
    msg:"Actualizado correctamente"
  })
  
}

const deleteTechID = async(req: Request,res: Response) => {
  const {id} = req.params;

  await Technology.findByIdAndDelete(id);
  

  res.json({
    ok:true,
    msg:"Eliminado exitosamente"
  })
}

export {
 createTech,
 deleteTechID,
 getTech,
 getTechID,
 updateTechID,
}