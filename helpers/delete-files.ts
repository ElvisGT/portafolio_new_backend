import fs from "fs";
import path from "path";

export const deleteFiles = (): void => {
  const foldersPath: string = path.join(__dirname,'../uploads/');

  const folderContain: string[] = fs.readdirSync(foldersPath);

  //Vaciar la carpeta
  folderContain.forEach( (file: string) => {
    fs.unlinkSync(foldersPath + file);
  })

}

