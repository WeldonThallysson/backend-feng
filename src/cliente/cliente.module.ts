import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';  

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  providers: [ClienteService],
  controllers: [ClienteController],
})
export class ClienteModule {}
