import { Request, Response } from "express";
import { FileArray, UploadedFile } from 'express-fileupload';
import {MongoDB} from "../classes/MongoDB";
import { fileUploadServer, 
          deleteFiles, 
          uploadCloudinary} from '../helpers';
import { ProjectType } from '../types/project';

//Instancia de Clase MongoDB
const mongodb = new MongoDB();

const getProjects = async(req: Request,res: Response) => {
  const projects = await mongodb.all_projects();
  res.json({
    results:projects
  })
}

const getProjectID = async(req: Request,res: Response) => {
  const {id} = req.params;

  const project = await mongodb.projectID(id);

  res.json({
    ok:true,
    project
  });
}

const createProject = async(req: Request,res: Response) => {
  const {name,
          description,
          repo,
          tag,
          hashTags,
          deploy}: ProjectType = req.body;  
  
          
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
  const data: ProjectType = {
    name,
    description,
    repo,
    deploy,
    tag,
    hashTags,
    imgUrl:savedImg as string
  }

  await mongodb.saveDB(data);
  
  res.status(201).json({
    ok:true,
    msg:"Creado exitosamente",
  })
}

const updateProjectID = async(req: Request,res: Response) => {
  const {id} = req.params;
  const { name,...rest}: ProjectType = req.body;

  //SaveData
  const data = {
    name,
    rest
  }

  await mongodb.updateDB(id,data);

  res.json({
    ok:true,
    msg:"Actualizado correctamente"
  })
  
}

const deleteProjectID = async(req: Request,res: Response) => {
  const {id} = req.params;

  await mongodb.deleteDB(id);

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