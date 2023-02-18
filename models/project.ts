import { Schema, model } from "mongoose";


const ProjectSchema: Schema = new Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  imgUri:{
    type:String,
  },
  link:{
    type:String,
    required:true
  },
  stack:{
    type:String,
    required:true
  },
  technologies:{
    type:Array<String>,
    default:['JavaScript'],
    required:true
  }
});

ProjectSchema.methods.toJSON = function(){
  const {__v, ...rest} = this.toObject();

  return rest;
}

export const Project = model("Project",ProjectSchema);