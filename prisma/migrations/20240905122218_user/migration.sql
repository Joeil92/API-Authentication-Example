-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ROLE_USER', 'ROLE_ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "avatarUrl" TEXT,
    "role" "Role"[] DEFAULT ARRAY['ROLE_USER']::"Role"[],
    "isTrainer" BOOLEAN NOT NULL DEFAULT false,
    "birthday" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
