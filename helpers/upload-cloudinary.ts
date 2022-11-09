import cloudinary from "cloudinary";
cloudinary.v2.config(process.env.CLOUDINARY_URL as string);

export const uploadCloudinary = (filePath: string): Promise<string>=> {
  return new Promise(async (resolve, reject) => {
    //Crear carpeta con el nombre de la fecha
    const dateCreated = new Date().toLocaleDateString();
    const dateCreatedFormated = dateCreated.split("/").join("-");

    try {
      const resp = await cloudinary.v2.uploader.upload(filePath, {
        folder: dateCreatedFormated,
      });

      resolve(resp.secure_url)
    } catch (err) {
      reject(err);
    }
  });
};
