import { IUser } from "../../models/userModel";
import repository from "../../repositories/userRepository";
import useCase from "../../use-cases/userCase";
import { prismaMock } from "../singleton";

const userResolved = {
    id: 1,
    email: "John.doe@test.fr",
    password: "John1234",
    firstname: "John",
    lastname: "Doe",
    phone: "+33644273344",
    isTrainer: false,
    birthday: new Date("2000-01-01"),
    role: [],
    avatarUrl: null,
    lastLogin: null,
    updatedAt: null,
    createdAt: new Date()
}

const user = {
    email: "John.doe@test.fr",
    password: "John1234",
    firstname: "John",
    lastname: "Doe",
    phone: "+33644273344",
    isTrainer: false,
    birthday: "2000-01-01",
}

describe("API /api/users", () => {
    test('should create new user', async () => {
        prismaMock.user.create.mockResolvedValue(userResolved);

        await expect(repository.createUser(user)).resolves.toMatchObject({
            id: 1,
            email: "John.doe@test.fr",
            firstname: "John",
            lastname: "Doe",
            phone: "+33644273344",
            isTrainer: false,
            birthday: new Date("2000-01-01T00:00:00.000Z"),
            avatarUrl: null,
            lastLogin: null,
            updatedAt: null,
        })
    });

    test("Should throw error if user already exist", async () => {
        prismaMock.user.findUnique.mockResolvedValue(userResolved);

        await expect(useCase.createUser(user)).rejects.toThrow('User already exist');
    })

    test("Should update user fields", async () => {
        prismaMock.user.update.mockResolvedValue(userResolved);
        prismaMock.user.findUnique.mockResolvedValue(userResolved);

        await expect(useCase.updateUser("1", user)).resolves.toEqual(userResolved);
    })

    test("Should update user avatar", async () => {
        const user: IUser = { ...userResolved };
        user.avatarUrl = "avatar-1243203.png";

        const mockFile = {
            fieldname: 'file',
            originalname: 'test.png',
            encoding: '7bit',
            mimetype: 'text/plain',
            size: 1024,
            destination: '/tmp',
            filename: 'test.txt',
            path: '/tmp/test.txt',
            buffer: Buffer.from('Hello World')
        };

        prismaMock.user.update.mockResolvedValue(user);
        prismaMock.user.findUnique.mockResolvedValue(user);

        await expect(useCase.updateAvatar("1", mockFile as Express.Multer.File)).resolves.toEqual(user);
    })

    test("Should throw error when avatar mimetype is unauthorized", async () => {
        const mockFile = undefined;

        await expect(useCase.updateAvatar("1", mockFile)).rejects.toThrow("File type is not supported. Please choose valid one")
    })
})