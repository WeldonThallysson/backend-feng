import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async create(item: Item): Promise<Item> {
    const data = {
      ...item,
      valor_unitario: Number(item.valor_unitario)
    }
    return this.itemRepository.save(data);
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({
        where: {
            id: id
        }
    });
    if (!item) {
      throw new NotFoundException(`Item com id ${id} não encontrado`);
    }

    return item;
  }

  async update(id: number, itemData: Partial<Item>): Promise<Item> {
    const item = await this.findOne(id); 

    const data = {
      ...itemData,
      valor_unitario: Number(itemData.valor_unitario)
    }
    Object.assign(item, data); 
    return this.itemRepository.save(item); 
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id); 
    await this.itemRepository.remove(item); 
  }
}
