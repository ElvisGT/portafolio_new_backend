import { Router } from "express";
import { createProject, 
          deleteProjectID, 
          getProjectID, 
          getProjects, 
          updateProjectID } from "../controllers/projects";

const router = Router();

//Obtener proyectos
router.get("/",getProjects);
//Obtener proyecto por id
router.get("/:id",getProjectID);
//Crear proyecto
router.post("/",createProject);
//Actualizar proyecto por id
router.put("/:id",updateProjectID);
//Eliminar proyecto por id
router.delete("/:id",deleteProjectID);


export default router;