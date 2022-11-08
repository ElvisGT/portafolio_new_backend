import { Request, Response } from "express";
import MongoDB from "../classes/MongoDB";

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

const createProject = (req: Request,res: Response) => {
  const body = req.body;

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