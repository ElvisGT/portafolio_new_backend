"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Routes
const projects_1 = __importDefault(require("../routes/projects"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 8080;
        this.paths = {
            projects: '/projects'
        };
        //Middlewares
        this.middlewares();
        //Routing
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.paths.projects, projects_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto http://localhost:${this.port}`);
        });
    }
}
exports.default = Server;
