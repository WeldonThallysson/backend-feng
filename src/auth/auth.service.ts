import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/cliente/cliente.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Cliente)
        private clienteRepository: Repository<Cliente>,
        private jwtService: JwtService
    ) {}

    async validadeUser(email: string, password: string): Promise<any> {
        const cliente = await this.clienteRepository.findOne({ where: { email}});
        console.log(cliente)
        if(cliente && await bcrypt.compare(password, cliente.senha)){
            const {senha, ...result} = cliente;
            return result
        } else{
            throw new UnauthorizedException("Email ou password inválidos")
        }
    }

    async login(email:string, password: string) {
        const user = await this.validadeUser(email, password);
        const payload = { sub: user.id, email: user.email};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
