import { JwtService } from '@nestjs/jwt';
import { Cliente } from 'src/cliente/cliente.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private clienteRepository;
    private jwtService;
    constructor(clienteRepository: Repository<Cliente>, jwtService: JwtService);
    validadeUser(email: string, senha: string): Promise<any>;
    login(email: string, senha: string): Promise<{
        access_token: string;
    }>;
}
