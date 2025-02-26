import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() item: Cliente) {
    return this.clienteService.create(item);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.clienteService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clienteService.findOne(id);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: number, @Body() itemData: Partial<Cliente>) {
    return this.clienteService.update(id, itemData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clienteService.remove(id);
  }
}
