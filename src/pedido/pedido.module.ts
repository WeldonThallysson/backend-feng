import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { Cliente } from 'src/cliente/cliente.entity';
import { Item } from 'src/item/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Cliente, Item]),  
  ],
  providers: [PedidoService],
  controllers: [PedidoController]
})
export class PedidoModule {}
