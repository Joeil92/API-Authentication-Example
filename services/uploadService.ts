import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pathDestination = path.join(__dirname, '/..', process.env.UPLOAD_PATH as string);

        if (!fs.existsSync(pathDestination)) {
            fs.mkdirSync(pathDestination, { recursive: true });
        }

        cb(null, pathDestination);
    },
    filename: function (req, file, cb) {
        const format = file.originalname.split('.')[1];
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + format);
    }
});

export default {
    storage
};