import { Request, Response } from "express";
import { FileArray, UploadedFile } from 'express-fileupload';
import MongoDB from "../classes/MongoDB";
import { fileUploadServer } from '../helpers/file_upload';
import {deleteFiles} from '../helpers/delete-files';
import { uploadCloudinary } from "../helpers/upload-cloudinary";


const getProjects = (req: Request,res: Response) => {
  const projects = MongoDB.all_projects;

  res.json(projects);
}

const getProjectID = (req: Request,res: Response) => {
  const {id} = req.params;

  const project = MongoDB.all_projects.filter(item => item.id === id);

  res.json({
    ok:true,
    results:project
  });
}

const createProject = async(req: Request,res: Response) => {
  const body = req.body;  
  const files: FileArray = req.files as FileArray; 

  //Tratamiento de imagenes
  const savedImg = await fileUploadServer(req.files as FileArray)
      .then((path: string) => console.log(path))
        //Subida a cloudinary
      //   return uploadCloudinary(path);
      // })
      // .then((img) => {
      //   return img;
      // })
      .catch((msg) => res.status(400).json({ msg }));

  //Limpiar server
  deleteFiles();
  
  MongoDB.saveDB(body);

  res.json({
    ok:true,
    msg:"Creado exitosamente",
    body
  })
}

const updateProjectID = (req: Request,res: Response) => {
  const {id} = req.params;
  const body = req.body;

  MongoDB.updateDB(id,body);

  res.json({
    ok:true,
    msg:"Actualizado correctamente"
  })
  
}

const deleteProjectID = (req: Request,res: Response) => {
  const {id} = req.params;

  MongoDB.deleteDB(id);

  res.json({
    ok:true,
    msg:"Eliminado exitosamente"
  })
}

export {
  createProject,
  deleteProjectID,
  getProjects,
  getProjectID,
  updateProjectID
}