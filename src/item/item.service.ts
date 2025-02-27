import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { IResponseMessage } from 'src/interfaces/interface.response';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async create(item: Item): Promise<IResponseMessage> {
    const data = {
      ...item,
      valor_unitario: Number(item.valor_unitario)
    }
    await this.itemRepository.save(data);
    return { message: 'Item cadastrado com sucesso!' } 
    
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

  async update(id: number, itemData: Partial<Item>): Promise<IResponseMessage> {
    const item = await this.findOne(id); 

    const data = {
      ...itemData,
      valor_unitario: Number(itemData.valor_unitario)
    }
    Object.assign(item, data); 
    await this.itemRepository.save(item); 
    return { message: 'Item atualizado com sucesso!' } 
  }

  async remove(id: number): Promise<IResponseMessage> {
    const item = await this.findOne(id); 
    await this.itemRepository.remove(item); 

    return { message: 'Item deletado com sucesso!' } 
  }
}
