import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(dto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(dto: RefreshTokenDto): Promise<{
        message: string;
    }>;
    me(user: {
        id: string;
    }): Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
    } | null>;
}
