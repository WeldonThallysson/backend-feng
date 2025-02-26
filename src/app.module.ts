import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoModule } from './pedido/pedido.module';
import { ClienteModule } from './cliente/cliente.module';
import { ItemModule } from './item/item.module';
import { Cliente } from './cliente/cliente.entity';
import { Item } from './item/item.entity';
import { Pedido } from './pedido/pedido.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://neondb_owner:npg_a0b1jNvlMYuq@ep-flat-rain-a8lohvry.eastus2.azure.neon.tech/neondb?sslmode=require',
      entities: [Cliente, Pedido, Item],
      synchronize: true,
    }),
   PedidoModule,
   ClienteModule,
   ItemModule,
   AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
