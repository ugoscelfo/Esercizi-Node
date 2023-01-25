import multer from 'multer';
import mime from 'mime';
import { randomUUID } from 'crypto';

export const generatePhotoFilename = (mimeType) => {
  const randomFilename = `${randomUUID()}-${Date.now()}`;
  const fileExtension = mime.getExtension(mimeType);
  const filename = `${randomFilename}.${fileExtension}`;
  return filename;
};

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (request, file, callback) => {
    return callback(null, generatePhotoFilename(file.mimeType))
  }
})

export const multerOptions = {}

export const initMulterMiddleware = () => {
  return multer({ storage, ...multerOptions })
};