import mongoose from "mongoose";

mongoose.set('strictQuery',true);

export const connectionDB = mongoose.connect(process.env.MONGODB_LOCAL as string)
                  .then(data => console.log("Conectado a la base de datos"))
                  .catch(err => console.log(err))


