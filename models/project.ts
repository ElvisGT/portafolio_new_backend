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
  imgUrl:{
    type:String,
  },
  repo:{
    type:String,
    required:true
  },
  deploy:{
    type:String,
  },
  tag:{
    type:String,
    required:true
  },
  hashTags:{
    type:String,
    default:['JavaScript']
  }
});

ProjectSchema.methods.toJSON = function(){
  const {__v, ...rest} = this.toObject();

  return rest;
}

export const Project = model("Project",ProjectSchema);