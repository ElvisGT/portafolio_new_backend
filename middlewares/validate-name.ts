import { Project } from "../models/project";
import { Technology } from "../models/technology";

export const validateName = async (name: string, model: string) => {

  switch (model) {
    case "Technology":
      const technology = await Technology.findOne({ name });
      if (technology) {
        throw new Error("El nombre de la tecnologia ya existe");
      }
      break;

    case "Project":
      const project = await Project.findOne({ name });

      if (project) {
        throw new Error("El nombre del proyecto ya existe");
      }
      break;

  }



}

