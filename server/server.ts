import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import fUpload from 'express-fileupload';
import dotenv from 'dotenv';
dotenv.config();
import { Paths } from '../types';
import { connectionDB } from '../config/database';

//Routes
import {projects,technologies,login} from '../routes';



export default class Server {
  private app: express.Application;
  private port: (string | number);
  private paths: Paths;
  
  constructor(){
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.paths = {
      projects:'/api/v1/projects',
      technologies:'/api/v1/technologies',
      login:'/api/v1/login'
    }
    
    //Conectar a la base de datos
    this.connectDB();

    //Middlewares
    this.middlewares();

    //Routing
    this.routes();
  }

  private middlewares(){
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(fUpload());
    this.app.use(helmet());
  }

  private routes(){
    this.app.use(this.paths.projects,projects);
    this.app.use(this.paths.technologies,technologies);
    this.app.use(this.paths.login,login);
  }

  public listen(){
    this.app.listen(this.port,() => {
      console.log(`Servidor corriendo en el enlace http://localhost:${this.port}`);
    })
  }

  private async connectDB(){
    await connectionDB;
  }
}