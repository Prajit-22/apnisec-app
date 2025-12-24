import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { UserDTO, UpdateProfileDTO } from '../types/dtos';
import { NotFoundError, ValidationError } from '../errors';

export class ProfileService {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Get user profile
     */
    public async getProfile(userId: string): Promise<UserDTO> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
        };
    }

    /**
     * Update user profile
     */
    public async updateProfile(userId: string, data: UpdateProfileDTO): Promise<UserDTO> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        // Check if email is being changed and if it's already taken
        if (data.email && data.email !== user.email) {
            const existingUser = await this.userRepository.findByEmail(data.email);
            if (existingUser) {
                throw new ValidationError('Email is already in use');
            }
        }

        const updatedUser = await this.userRepository.update(userId, data);

        return {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            role: updatedUser.role,
            createdAt: updatedUser.createdAt,
        };
    }
}
