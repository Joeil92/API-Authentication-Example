import { NextFunction, Request, Response } from "express";
import useCase from "../use-cases/userCase";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    useCase.createUser(body)
        .then(data => res.json({
            status: "Success",
            data: data,
            message: "User has been created."
        }))
        .catch(err => next(err));
}

const updateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const id = req.params.id;
    const body = req.body;

    if (!userId || userId !== Number(id)) {
        throw new Error('Unauthorized');
    }

    useCase.updateUser(id, body)
        .then(data => res.json({
            status: "Success",
            data: data,
            message: "User has been updated."
        }))
        .catch(err => next(err));
}

const updateAvatar = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const id = req.params.id;
    const file = req.file;

    if (!userId || userId !== Number(id)) {
        throw new Error('Unauthorized');
    }

    useCase.updateAvatar(id, file)
        .then(data => res.json({
            status: "Success",
            data: data,
            message: "Avatar has been updated."
        }))
        .catch(err => next(err));
}

export default {
    createUser,
    updateUser,
    updateAvatar
}