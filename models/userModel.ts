type Role = "ROLE_USER" | "ROLE_ADMIN";

export interface IUser {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
    avatarUrl: string | null;
    role: Role[];
    isTrainer: boolean;
    birthday: Date;
    lastLogin: Date | null;
    updatedAt: Date | null;
    createdAt: Date;
}