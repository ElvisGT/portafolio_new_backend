import { Project } from "../models/project"

export const validateID = async(id: string) => {
  const project = await Project.findById(id);

  if(!project){
     throw new Error("El proyecto no existe");
  }

}