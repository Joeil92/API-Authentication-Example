import { NextFunction, Request, Response } from "express";

export interface ErrorHandling extends Error {
    statusCode?: number;
    customMessage?: string;
}

export default function errorHandlingMiddleware(err: ErrorHandling, req: Request, res: Response, next: NextFunction) {
    err.statusCode = err.statusCode || 400;

    return err.customMessage || err.message
        ? res.status(err.statusCode).json({
            status: "Error",
            message: err.customMessage || err.message
        })
        : res.status(err.statusCode).json({ status: "Error", message: err });
}