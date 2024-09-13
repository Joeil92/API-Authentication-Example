import { NextFunction, Request, Response } from "express";
import authService from "../services/authService";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export default function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) throw new Error('Unauthorized');

    const token = authHeader.split(' ');

    if (token[0] !== "Bearer") throw new Error('Invalid access token format');

    try {
        const payload = authService.verifyToken(token[1]) as JwtPayload;
        req.user = payload;
        next();
    } catch (error) {
        throw new Error('Token is not valid, try to reconnect');
    }
}