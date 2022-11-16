import { Schema, model} from 'mongoose';

const adminSchema = new Schema({
  name:{
    type:String,
    required:true,
    
  },
  password:{
    type:String,
    required:true,
  }
});

adminSchema.methods.toJSON = function(){
  const {__v,...rest} = this.toObject();

  return rest;
}

export default model("Admin",adminSchema);