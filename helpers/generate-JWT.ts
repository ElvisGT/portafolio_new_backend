import jwt from 'jsonwebtoken';
import { ID } from '../types/login';
import { Types } from 'mongoose';

export const generateJWT = (uid:Types.ObjectId) => {
  return new Promise((resolve,reject) => {
    const secretKey = process.env.PRIVATE_KEY as string;
    const payload: ID = {
      uid
    };
  
    jwt.sign(payload,secretKey,(err,token) => {
      if(err){
        return reject(err);
      }

      resolve(token);
    })
  })
}