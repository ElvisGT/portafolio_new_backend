import { FileArray, UploadedFile } from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';



export const fileUploadServer = (files: FileArray) => {
  return new Promise((resolve, reject) => {
    //Verificar si hay archivo en la peticion
    if (!files) {
      return reject("No hay archivo en la peticion");
    }
    const file: UploadedFile = files.file as UploadedFile;
    const whiteExtensions = ["jpg", "png", "gif", "jpeg"];

    //Separar nombre de la extension
    const nameArr = file.name.split(".");
    const ext = nameArr[nameArr.length - 1];

    //Verificar extension
    if (!whiteExtensions.includes(ext)) {
      return reject("Extension no permitida");
    }
    const fileName = uuidv4() + "." + ext;

    const savePath = path.join(
      __dirname,
      "../uploads/",
      fileName
    );

    file.mv(savePath,(err: Error) => {
      if (err) return reject(err);


      return resolve(savePath);
    });
  });
};
