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
  validation
],getTechID);

//Crear tecnologia
router.post("/",[
],createTech);

//Actualizar tecnologia por id
router.put("/:id",[
  check("id","No es un id valido de MongoDB").isMongoId(),
  check("id").custom(validateID),
  validation
],updateTechID);

//Eliminar tecnologia por id
router.delete("/:id",[
  check("id","No es un id valido de MongoDB").isMongoId(),
  check("id").custom(validateID),
  validation
],deleteTechID);


export default router;