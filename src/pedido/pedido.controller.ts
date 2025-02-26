import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { Pedido } from './pedido.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt')) 
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  // Buscar todos os pedidos com filtros
  @Get()
  async findAll(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('value') value?: number,  // Agora apenas o valor
    @Query('clienteName') clienteName?: string,
  ): Promise<Pedido[]> {
    // Convertendo as strings de data para objetos Date
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    return this.pedidoService.findAll(start, end, value, clienteName);
  }

  // Criar um novo pedido
  @Post()
  async create(
    @Body() body: { client_id: number, itens_id: number[], data: Date },
  ): Promise<Pedido> {
    return this.pedidoService.create(body);
  }

  // Buscar um pedido por ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Pedido> {
    return this.pedidoService.findOne(id);
  }

  // Excluir um pedido
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.pedidoService.remove(id);
  }
}
