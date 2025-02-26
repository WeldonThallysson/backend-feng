import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        senha: string;
    }): Promise<{
        access_token: string;
    }>;
}
