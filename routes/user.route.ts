import { Request, Router } from "express";
import controller from "../controllers/userController";
import { validateData } from "../middlewares/validationMiddleware";
import { userCreateSchema, userUpdateSchema } from "../schemas/userSchema";
import authMiddleware from "../middlewares/authMiddleware";
import uploadMiddleware from "../middlewares/uploadMiddleware";
import { FileFilterCallback } from "multer";

const avatarFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const mimeType = [
        "image/png",
        "image/jpeg"
    ]

    if (mimeType.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const router = Router();

// METHOD: POST
router.route('/').post(validateData(userCreateSchema), controller.createUser);

// METHOD: PATCH
router.route('/:id/avatar').patch([authMiddleware, uploadMiddleware(avatarFilter).single("avatar")], controller.updateAvatar);
router.route('/:id').patch(authMiddleware, validateData(userUpdateSchema), controller.updateUser);

export default router;