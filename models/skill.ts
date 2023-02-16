import { Schema, model } from "mongoose";


const SkillSchema: Schema = new Schema({
  name:{
    type:String,
    required:true
  },
  imgUrl:{
    type:String,
  },
});

SkillSchema.methods.toJSON = function(){
  const {__v, ...rest} = this.toObject();

  return rest;
}

export const Technology = model("Technology",SkillSchema);