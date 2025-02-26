import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/cliente/cliente.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    PassportModule,
    JwtModule.register({
      secret: "MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQAdygNkrnOqyk58nYD2SYlGakyPgUa",
      signOptions: {expiresIn: '1h'},
    })
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
