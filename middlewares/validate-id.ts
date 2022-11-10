import { Project } from "../models/project"
import { Technology } from '../models/technology';

export const validateID = async(id: string, model: string) => {
  switch (model) {
    case "Technology":
      const technology = await Technology.findById(id);
      if (!technology) {
        throw new Error("La tecnologia no existe");
      }
      break;

    case "Project":
      const project = await Project.findById(id);

      if (!project) {
        throw new Error("El proyecto no existe");
      }
      break;

  }
}