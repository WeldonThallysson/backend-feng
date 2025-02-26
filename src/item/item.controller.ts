import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt')) 
@Controller('itens')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() item: Item) {
    return this.itemService.create(item);
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.itemService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() itemData: Partial<Item>) {
    return this.itemService.update(id, itemData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.itemService.remove(id);
  }
}
