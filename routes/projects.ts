import { Router } from "express";
import {check} from 'express-validator';
import { validation } from '../middlewares/validation';
import { validateName } from '../middlewares/validate-name';
import { validateID } from '../middlewares/validate-id';
import { verifyJWT } from '../middlewares/verify-JWT';
import { createProject, 
          deleteProjectID, 
          getProjectID, 
          getProjectStack, 
          getProjects, 
          updateProjectID } from "../controllers/projects";

const router = Router();

//Obtener proyectos
router.get("/",getProjects);

//Obtener proyecto por id
router.get("/:id",[
  check("id","No es un id valido de MongoDB").isMongoId(),
  check("id").custom((value) => validateID(value,'Project')),
  validation
],getProjectID);

//Obtener proyecto por stack
router.get("/search/stack",getProjectStack);

//Crear proyecto
router.post("/",[
  check("name").custom((value) => validateName(value,"Project")),
  validation
],createProject);

//Actualizar proyecto por id
router.put("/:id",[
  check("id","No es un id valido de MongoDB").isMongoId(),
  check("name").custom((value) => validateName(value,"Project")),
  check("id").custom((value) => validateID(value,'Project')),
  validation
],updateProjectID);

//Eliminar proyecto por id
router.delete("/:id",[
  check("id","No es un id valido de MongoDB").isMongoId(),
  check("id").custom((value) => validateID(value,'Project')),
  validation
],deleteProjectID);


export default router;