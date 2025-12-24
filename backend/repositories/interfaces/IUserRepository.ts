import { User } from '@prisma/client';

export interface CreateUserData {
    email: string;
    password: string;
    name: string;
    role?: string;
}

export interface UpdateUserData {
    email?: string;
    password?: string;
    name?: string;
    role?: string;
}

export interface IUserRepository {
    create(data: CreateUserData): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    update(id: string, data: UpdateUserData): Promise<User>;
    delete(id: string): Promise<void>;
}
