import multer, { Options } from "multer";
import uploadService from "../services/uploadService";

export default function uploadMiddleware(fileFilter?: Options['fileFilter']) {
    return multer({
        storage: uploadService.storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    });
}