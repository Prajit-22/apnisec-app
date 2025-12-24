import { IAuthService } from './interfaces/IAuthService';
import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { IEmailService } from './interfaces/IEmailService';
import { HashUtil } from '../utils/HashUtil';
import { JWTUtil } from '../utils/JWTUtil';
import { UserDTO, AuthResponseDTO } from '../types/dtos';
import { AuthenticationError, ValidationError, NotFoundError } from '../errors';

export class AuthService implements IAuthService {
    private readonly userRepository: IUserRepository;
    private readonly hashUtil: HashUtil;
    private readonly jwtUtil: JWTUtil;
    private readonly emailService: IEmailService;

    constructor(
        userRepository: IUserRepository,
        hashUtil: HashUtil,
        jwtUtil: JWTUtil,
        emailService: IEmailService
    ) {
        this.userRepository = userRepository;
        this.hashUtil = hashUtil;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
    }

    /**
     * Register a new user
     */
    public async register(email: string, password: string, name: string): Promise<AuthResponseDTO> {
        // Check if user already exists
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new ValidationError('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await this.hashUtil.hash(password);

        // Create user
        const user = await this.userRepository.create({
            email,
            password: hashedPassword,
            name,
        });

        // Generate JWT token
        const token = this.jwtUtil.sign({
            userId: user.id,
            email: user.email,
        });

        // Send welcome email (async, don't wait)
        this.emailService.sendWelcomeEmail(user.email, user.name).catch((error) => {
            console.error('Failed to send welcome email:', error);
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token,
        };
    }

    /**
     * Login user
     */
    public async login(email: string, password: string): Promise<AuthResponseDTO> {
        // Find user
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AuthenticationError('Invalid email or password');
        }

        // Verify password
        const isPasswordValid = await this.hashUtil.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AuthenticationError('Invalid email or password');
        }

        // Generate JWT token
        const token = this.jwtUtil.sign({
            userId: user.id,
            email: user.email,
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token,
        };
    }

    /**
     * Verify JWT token
     */
    public async verifyToken(token: string): Promise<UserDTO> {
        const payload = this.jwtUtil.verify(token);
        const user = await this.userRepository.findById(payload.userId);

        if (!user) {
            throw new AuthenticationError('Invalid token');
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
     * Get current user by ID
     */
    public async getCurrentUser(userId: string): Promise<UserDTO> {
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
}
