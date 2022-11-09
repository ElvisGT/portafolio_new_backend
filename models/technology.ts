import { Schema, model } from "mongoose";


const TechnologySchema: Schema = new Schema({
  name:{
    type:String,
    required:true
  },
  imgUrl:{
    type:String,
  },
});

TechnologySchema.methods.toJSON = function(){
  const {__v, ...rest} = this.toObject();

  return rest;
}

export const Technology = model("Technology",TechnologySchema);