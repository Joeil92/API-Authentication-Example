import { z } from "zod"
import { accessTokenSchema, refreshTokenSchema } from "../schemas/authSchema"
import repository from "../repositories/userRepository"
import authService from "../services/authService"
import { JwtPayload } from "jsonwebtoken"

const accessToken = async (data: z.infer<typeof accessTokenSchema>) => {
    const user = await repository.findUserByEmail(data.email);

    if (!user) throw new Error('Invalid email or password');

    const isSamePassword = authService.comparePassword(data.password, user.password);

    if (!isSamePassword) throw new Error('Invalid email or password');

    const payload = {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        avatarUrl: user.avatarUrl
    }

    const accessToken = authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload)

    return { accessToken, refreshToken };
}

const refreshToken = async (data: z.infer<typeof refreshTokenSchema>) => {
    try {
        const payload = authService.verifyToken(data.token) as JwtPayload;
        const user = await repository.findUserByEmail(payload.email);

        if (!user) throw new Error('Invalid email or password');

        const accessToken = authService.generateToken({
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            avatarUrl: user.avatarUrl
        });

        return { accessToken };
    } catch (error) {
        console.log(error);
        throw new Error('Token is not valid, try to reconnect');
    }
}

export default {
    accessToken,
    refreshToken
}