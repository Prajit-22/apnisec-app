import { UserDTO, AuthResponseDTO } from '../../types/dtos';

export interface IAuthService {
    register(email: string, password: string, name: string): Promise<AuthResponseDTO>;
    login(email: string, password: string): Promise<AuthResponseDTO>;
    verifyToken(token: string): Promise<UserDTO>;
    getCurrentUser(userId: string): Promise<UserDTO>;
}
