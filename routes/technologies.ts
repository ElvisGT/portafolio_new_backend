import { Router } from "express";
import {check} from 'express-validator';
import { validation } from '../middlewares/validation';
import { validateName } from '../middlewares/validate-name';
import { validateID } from '../middlewares/validate-id';
import { createTech, 
          deleteTechID,
          updateTechID, 
          getTech, 
          getTechID, 
           } from "../controllers/technologies";

const router = Router();

//Obtener tecnologia 
router.get("/",getTech);

//Obtener tecnologia por id
router.get("/:id",[
  check("id","No es un id valido de MongoDB").isMongoId(),
  check("id").custom((value) => validateID(value,"Technology")),
  validation
],getTechID);

//Crear tecnologia
router.post("/",[
  check("name").custom((value) => validateName(value,"Technology")),
  validation
],createTech);

//Actualizar tecnologia por id
router.put("/:id",[
  check("id","No es un id valido de MongoDB").isMongoId(),
  check("id").custom((value) => validateID(value,"Technology")),
  check("name").custom((value) => validateName(value,"Technology")),
  validation
],updateTechID);

//Eliminar tecnologia por id
router.delete("/:id",[
  check("id","No es un id valido de MongoDB").isMongoId(),
  check("id").custom((value) => validateID(value,"Technology")),
  validation
],deleteTechID);


export default router;