import multer from 'multer';
import { JsxEmit } from 'typescript';

jest.mock("./multer", () => {
  const originalModule = jest.requireActual("./multer");

  return {
    __esModule: true,
    ...originalModule,
    initMulterMiddleware: () => {
        return multer({
            storage: multer.memoryStorage(),
            ...originalModule.multerOptions,
        });
    },
  };
})