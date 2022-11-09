import {validationResult} from 'express-validator';
import { Request,Response } from 'express';
import express from 'express';

export const validation = (req: Request, res: Response, next: express.NextFunction) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({
      errors
    })
  }

  next();
}