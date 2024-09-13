import { z } from "zod";
import { userCreateSchema, userUpdateSchema } from "../schemas/userSchema";
import prisma from "../utils/client";
import { IUser } from "../models/userModel";

const createUser = async (data: z.infer<typeof userCreateSchema>): Promise<IUser> => {
    try {
        return await prisma.user.create({
            data: {
                ...data,
                birthday: new Date(data.birthday)
            }
        });
    } catch (error) {
        console.log('Error to querying table user, ', error)
        throw new Error(String(error));
    }
}

const findUserByEmail = async (email: string): Promise<IUser | null> => {
    try {
        return await prisma.user.findUnique({
            where: {
                email: email
            }
        });
    } catch (error) {
        console.log('Error to querying table user, ', error)
        throw new Error(String(error));
    }
}

const findUserById = async (id: number) => {
    try {
        return await prisma.user.findUnique({
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
                phone: true,
                birthday: true,
                isTrainer: true,
                avatarUrl: true,
                lastLogin: true,
                updatedAt: true,
                createdAt: true
            },
            where: {
                id: id
            }
        })
    } catch (error) {
        console.log('Error to querying table user, ', error)
        throw new Error(String(error));
    }
}

const updateUser = async (id: number, data: z.infer<typeof userUpdateSchema>): Promise<IUser> => {
    try {
        return await prisma.user.update({
            data: {
                ...data,
                birthday: data.birthday && new Date(data.birthday)
            },
            where: {
                id: id
            }
        });
    } catch (error) {
        console.log('Error to querying table user, ', error)
        throw new Error(String(error));
    }
}

const updateAvatar = async (id: number, avatarUrl: string) => {
    try {
        return await prisma.user.update({
            data: {
                avatarUrl: avatarUrl
            },
            where: {
                id: id
            }
        });
    } catch (error) {
        console.log('Error to querying table user, ', error)
        throw new Error(String(error));
    }
}

export default {
    createUser,
    findUserByEmail,
    findUserById,
    updateUser,
    updateAvatar
}