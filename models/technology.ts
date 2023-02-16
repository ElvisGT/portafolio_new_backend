import { Schema, model } from "mongoose";


const TechnologySchema: Schema = new Schema({
  name:{
    type:String,
    required:true
  },
  imgUri:{
    type:String,
    required:true
  },
});

TechnologySchema.methods.toJSON = function(){
  const {__v, ...rest} = this.toObject();

  return rest;
}

export const Technology = model("Technology",TechnologySchema);