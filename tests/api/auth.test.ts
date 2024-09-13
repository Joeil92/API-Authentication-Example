import authService from "../../services/authService";
import useCase from "../../use-cases/authCase";
import jwt from "jsonwebtoken";
import { prismaMock } from "../singleton";

jest.mock("jsonwebtoken", () => ({
    sign: jest.fn().mockReturnValue('mocked_token'),
    verify: jest.fn().mockReturnValue({})
}));

jest.mock('bcrypt', () => ({
    compareSync: jest.fn()
}))

describe("API /auth", () => {
    test("Should return access token", async () => {
        const payload = {
            id: 1,
            email: "john.doe@example.com",
            firstname: "John",
            lastname: "Doe",
            avatarUrl: null
        }

        const result = authService.generateToken(payload);

        expect(jwt.sign).toHaveBeenCalledWith(payload, String(process.env.JWT_SECRET), { expiresIn: '24h' });
        expect(result).toBe('mocked_token');
    })

    test("Should refresh access token", async () => {
        const user = {
            id: 1,
            email: "John.doe@test.fr",
            password: "john1234",
            role: [],
            firstname: "John",
            lastname: "Doe",
            phone: "+33644273344",
            isTrainer: false,
            birthday: new Date("2000-01-01T00:00:00.000Z"),
            avatarUrl: null,
            lastLogin: null,
            updatedAt: null,
            createdAt: new Date()
        }

        prismaMock.user.findUnique.mockResolvedValue(user);

        await expect(useCase.refreshToken({ token: "fakeToken" })).resolves.toHaveProperty("accessToken");
    })

    test("Should return error when credentials are invalid", async () => {
        const credentials = {
            email: "john.doe@example.com",
            password: "john1234"
        }

        prismaMock.user.findUnique.mockResolvedValue(null);

        await expect(useCase.accessToken(credentials)).rejects.toThrow('Invalid email or password');
    })
})