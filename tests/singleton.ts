import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import prisma from "../utils/client";
import dotenv from "dotenv";

dotenv.config();

jest.mock("../utils/client", () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>()
}));

beforeEach(() => {
    mockReset(prismaMock);
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;