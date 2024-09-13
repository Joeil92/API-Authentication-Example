import { Router } from "express";
import { validateData } from "../middlewares/validationMiddleware";
import { accessTokenSchema, refreshTokenSchema } from "../schemas/authSchema";
import controller from "../controllers/authController";

const router = Router();

router.route('/access_token').post(validateData(accessTokenSchema), controller.accessToken);
router.route('/refresh_token').post(validateData(refreshTokenSchema), controller.refreshToken);

export default router;