import { z } from "zod";
import { userCreateSchema, userUpdateSchema } from "../schemas/userSchema";
import repository from "../repositories/userRepository";
import authService from "../services/authService";
import statusCode from "../utils/http-status-codes";
import { ErrorHandling } from "../middlewares/errorHandlingMiddleware";

const createUser = async (data: z.infer<typeof userCreateSchema>) => {
    const userWithEmail = await repository.findUserByEmail(data.email);

    if (userWithEmail) {
        const error = new Error('User already exist') as ErrorHandling;
        error.statusCode = statusCode.RESOURCE_ALREADY_EXIST;

        throw error;
    }

    const passwordEncrypted = authService.encryptPassword(data.password);
    data.password = passwordEncrypted;

    const result = await repository.createUser(data);

    return await repository.findUserById(result.id);
}

const updateUser = async (id: string, data: z.infer<typeof userUpdateSchema>) => {
    const result = await repository.updateUser(Number(id), data);

    return await repository.findUserById(result.id);
}

const updateAvatar = async (id: string, file: Express.Multer.File | undefined) => {
    if (!file) throw new Error('File type is not supported. Please choose valid one');

    const result = await repository.updateAvatar(Number(id), file.filename);

    return await repository.findUserById(result.id);
}

export default {
    createUser,
    updateUser,
    updateAvatar
}