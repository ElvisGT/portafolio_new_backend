import { Request, Response } from "express";
import { FileArray } from 'express-fileupload';
import { fileUploadServer, 
          deleteFiles, 
          uploadCloudinary} from '../helpers';
import { Project } from "../models/project";
import { ProjectType } from '../types/project';


const getProjects = async(req: Request,res: Response) => {

  const [total,projects] = await Promise.all([
    Project.find({}).countDocuments(),
    Project.find({})
  ])

  res.json({
    total,
    results:projects
  })
}

const getProjectID = async(req: Request,res: Response) => {
  const {id} = req.params;

  const project = await Project.findById(id);
  
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
    imgUrl: savedImg as string
  }

  const save_project = await new Project(data);
  save_project.save();
  
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


  await Project.findByIdAndUpdate(id,data);

  res.json({
    ok:true,
    msg:"Actualizado correctamente"
  })
  
}

const deleteProjectID = async(req: Request,res: Response) => {
  const {id} = req.params;

  await Project.findByIdAndDelete(id);
  

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