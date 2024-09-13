import { z } from "zod";

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const userCreateSchema = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(1).max(255),
    firstname: z.string().min(1).max(255),
    lastname: z.string().min(1).max(255),
    phone: z.string().min(10).max(15).regex(phoneRegex),
    isTrainer: z.boolean(),
    birthday: z.string().date()
});

export const userUpdateSchema = z.object({
    email: z.string().email().min(1).max(255).optional(),
    firstname: z.string().min(1).max(255).optional(),
    lastname: z.string().min(1).max(255).optional(),
    phone: z.string().min(10).max(15).regex(phoneRegex).optional(),
    birthday: z.string().date().optional()
});