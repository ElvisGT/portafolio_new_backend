import { Project } from "../models/project";
import { Technology } from "../models/technology";

export const validateName = async(name: string,model:string) => {

  switch(model){
    case 'Technology':
      console.log("Elvis");
    break;
  }
  const project = await Project.findOne({name});

  if(project){
     throw new Error("El nombre del proyecto ya existe");
  }

}