"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_1 = require("../controllers/projects");
const router = (0, express_1.Router)();
//Obtener proyectos
router.get("/", projects_1.getProjects);
//Obtener proyecto por id
router.get("/:id", projects_1.getProjectID);
//Crear proyecto
router.post("/", projects_1.createProject);
//Actualizar proyecto por id
router.put("/:id", projects_1.updateProjectID);
//Eliminar proyecto por id
router.delete("/:id", projects_1.deleteProjectID);
exports.default = router;
