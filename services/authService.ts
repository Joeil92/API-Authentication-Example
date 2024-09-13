import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = String(process.env.JWT_SECRET);
const REFRESH_JWT_SECRET = String(process.env.REFRESH_JWT_SECRET);

const encryptPassword = (plaintextPassword: string) => {
    const saltRound = 10;

    return bcrypt.hashSync(plaintextPassword, saltRound);
}

const comparePassword = (plaintextPassword: string, hashedPassword: string) => {
    return bcrypt.compareSync(plaintextPassword, hashedPassword);
}

const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
}

const generateToken = (payload: any) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '24h'
    })
}

const generateRefreshToken = (payload: any) => {
    return jwt.sign(payload, REFRESH_JWT_SECRET, {
        expiresIn: '1y'
    });
}

export default {
    encryptPassword,
    comparePassword,
    verifyToken,
    generateToken,
    generateRefreshToken
}