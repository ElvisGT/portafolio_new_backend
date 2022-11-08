"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectID = exports.getProjectID = exports.getProjects = exports.deleteProjectID = exports.createProject = void 0;
const MongoDB_1 = __importDefault(require("../classes/MongoDB"));
const getProjects = (req, res) => {
    const projects = MongoDB_1.default.all_projects;
    res.json(projects);
};
exports.getProjects = getProjects;
const getProjectID = (req, res) => {
    const { id } = req.params;
    const project = MongoDB_1.default.all_projects.filter(item => item.id === id);
    res.json({
        ok: true,
        results: project
    });
};
exports.getProjectID = getProjectID;
const createProject = (req, res) => {
    const body = req.body;
    MongoDB_1.default.saveDB(body);
    res.json({
        ok: true,
        msg: "Creado exitosamente",
        body
    });
};
exports.createProject = createProject;
const updateProjectID = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    MongoDB_1.default.updateDB(id, body);
    res.json({
        ok: true,
        msg: "Actualizado correctamente"
    });
};
exports.updateProjectID = updateProjectID;
const deleteProjectID = (req, res) => {
    const { id } = req.params;
    MongoDB_1.default.deleteDB(id);
    res.json({
        ok: true,
        msg: "Eliminado exitosamente"
    });
};
exports.deleteProjectID = deleteProjectID;
