import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, Put, Request } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { Pedido } from './pedido.entity'; 
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt')) 
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Get()
  async findAll(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('value') value?: number,
    @Query('clienteName') clienteName?: string,
  ): Promise<Pedido[]> {

    const start = startDate ? startDate : undefined;
    const end = endDate ? endDate : undefined;
 
    return this.pedidoService.findAll(start, end, Number(value), clienteName);
  }

  @Post()
  async create(
    @Body() body: { client_id: number, itens_id: number[]},
  ): Promise<Pedido> {
    return this.pedidoService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Pedido> {
    return this.pedidoService.findOne(id);
  }
  @Put(':id')
  update(
    @Param('id') id: number, 
    @Body() pedidoData: Partial<{ client_id: number, itens_id: number[] }>, 
    @Request() req: any
  ) {
    return this.pedidoService.update(id, pedidoData, req.user); 
  }
  
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.pedidoService.remove(id);
  }
}
