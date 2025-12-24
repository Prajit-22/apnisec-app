import { PrismaClient, User } from '@prisma/client';
import { IUserRepository, CreateUserData, UpdateUserData } from './interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async create(data: CreateUserData): Promise<User> {
        return this.prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.name,
                role: data.role || 'user',
            },
        });
    }

    public async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    public async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    public async update(id: string, data: UpdateUserData): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    public async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id },
        });
    }
}
