import statusCode from "../utils/http-status-codes";
import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

export function validateData(schema: z.ZodObject<any, any> | z.ZodArray<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                let errorMessages = [
                    {
                        message: "Invalid data payload"
                    }
                ];

                if (process.env.ENV === "dev") {
                    errorMessages = error.errors.map((issue: any) => ({
                        message: `${issue.path.join('.')} is ${issue.message}`,
                    }));
                }

                res.status(statusCode.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
            } else {
                res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
            }
        }
    }
}