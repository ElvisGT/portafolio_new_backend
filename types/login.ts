import { JwtPayload } from 'jsonwebtoken';
import {Types} from 'mongoose';

export type Admin ={
  name:string,
  password:string
}

export type ID = {
  uid:string | JwtPayload | Types.ObjectId
}
