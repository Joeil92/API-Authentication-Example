import { NextFunction, Request, Response } from "express";
import useCase from "../use-cases/authCase";

const accessToken = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    useCase.accessToken(body)
        .then(data => res.json(data))
        .catch(err => next(err));
}

const refreshToken = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    useCase.refreshToken(body)
        .then(data => res.json(data))
        .catch(err => next(err));
}

export default {
    accessToken,
    refreshToken
}