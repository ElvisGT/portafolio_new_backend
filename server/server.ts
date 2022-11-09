import express from 'express';
import cors from 'cors';
import fUpload from 'express-fileupload';
import dotenv from 'dotenv';
dotenv.config();
import {Paths} from '../types';
import connectionDB from '../config/database';

//Routes
import projects from '../routes/projects';



export default class Server {
  private app: express.Application;
  private port: (string | number);
  private paths: Paths;
  
  constructor(){
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.paths = {
      projects:'/projects'
    }
    
    //Conectar a la base de datos
    connectionDB;

    //Middlewares
    this.middlewares();

    //Routing
    this.routes();
  }

  private middlewares(){
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(fUpload());
  }

  private routes(){
    this.app.use(this.paths.projects,projects);
  }

  public listen(){
    this.app.listen(this.port,() => {
      console.log(`Servidor corriendo en el puerto http://localhost:${this.port}`);
    })
  }
}