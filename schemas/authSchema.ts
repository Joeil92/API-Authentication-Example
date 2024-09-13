import { z } from "zod";

export const accessTokenSchema = z.object({
    email: z.string().min(1).email().max(255),
    password: z.string().min(1).max(255)
});

export const refreshTokenSchema = z.object({
    token: z.string().min(1)
});

