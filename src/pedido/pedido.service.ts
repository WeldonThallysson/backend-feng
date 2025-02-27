import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Cliente } from 'src/cliente/cliente.entity';
import { Item } from 'src/item/item.entity';
import { parse, format } from 'date-fns';
import {  toZonedTime } from 'date-fns-tz';
import { IResponseMessage } from 'src/interfaces/interface.response';

const fusoHorarioBrasilia = 'America/Sao_Paulo'; 
interface PedidoResponse extends Omit<Pedido, 'data'> {
  data: string;
}
@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async findAll(
    startDate?: string,
    endDate?: string,
    value?: number,
    clienteName?: string,
  ): Promise<Pedido[]> {
    const queryBuilder = this.pedidoRepository
      .createQueryBuilder('pedido')
      .leftJoinAndSelect('pedido.cliente', 'cliente')
      .leftJoinAndSelect('pedido.itens', 'item');
  
    if (startDate) {
      const start = toZonedTime(new Date(startDate), fusoHorarioBrasilia);
      if (isNaN(start.getTime())) {
        throw new BadRequestException(`Data de início não é válida: ${startDate}`);
      }
      queryBuilder.andWhere('pedido.data >= :startDate', {
        startDate: format(start, 'yyyy-MM-dd HH:mm:ss'),
      });
    }
  
    if (endDate) {
      const end = toZonedTime(new Date(endDate), fusoHorarioBrasilia);
      if (isNaN(end.getTime())) {
        throw new BadRequestException(`Data final não é válida: ${endDate}`);
      }
      queryBuilder.andWhere('pedido.data <= :endDate', {
        endDate: format(end, 'yyyy-MM-dd HH:mm:ss'),
      });
    }
  
    if (value) {
      queryBuilder.andWhere('item.valor_unitario = :value', { value });
    }
  
    if (clienteName) {
      queryBuilder.andWhere('cliente.nome LIKE :clienteName', {
        clienteName: `%${clienteName}%`,
      });
    }
  
    const response = await queryBuilder.getMany();
  
    return response.map((item) => ({
      ...item,
      data: format(toZonedTime(item.data, fusoHorarioBrasilia), 'yyyy-MM-dd HH:mm'),
    })) as Pedido[];
  }
  
  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['cliente', 'itens'],
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido com id ${id} não encontrado`);
    }

    return pedido;
  }

  async create(data: { client_id: number, itens_id: number[]}): Promise<IResponseMessage> {
    const { client_id, itens_id } = data;
    const dataCurrent = format(toZonedTime(new Date(), fusoHorarioBrasilia), 'yyyy-MM-dd HH:mm');

    const cliente = await this.clienteRepository.findOne({
      where: { id: client_id }, 
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente com id ${client_id} não encontrado`);
    }

    const itens = await this.itemRepository.findBy({
      id: In(itens_id),
    });

 
    const pedido = this.pedidoRepository.create({
      data: dataCurrent,
      cliente,
      itens,
    });
    
     await this.pedidoRepository.save(pedido);
     return { message: 'Pedido cadastrado com sucesso!' } 
  }


async update(id: number, pedidoData: Partial<{
    client_id: number,
    itens_id: number[]
  
  }>,  userLogged: Cliente): Promise<IResponseMessage> {
    const pedido = await this.findOne(id);
  
    const dataCurrent = format(toZonedTime(new Date(), fusoHorarioBrasilia), 'yyyy-MM-dd HH:mm');
    
    if (pedidoData.client_id && pedidoData.client_id !== pedido.cliente.id) {
      if (!userLogged.isAdmin) {
        throw new ForbiddenException('Você não tem permissão para alterar o cliente desde pedido.');
      }
    }
  
    if (pedidoData.client_id) {
      const cliente = await this.clienteRepository.findOne({
        where:{
          id: pedidoData.client_id
        }
      });
      if (!cliente) {
        throw new NotFoundException(`Cliente com id ${pedidoData.client_id} não encontrado`);
      }
      pedido.cliente = cliente;
    }
  
    if (pedidoData.itens_id && pedidoData.itens_id.length > 0) {
      const itens = await this.itemRepository.findBy({ id: In(pedidoData.itens_id) });
      if (!itens || itens.length === 0) {
        throw new NotFoundException(`Itens não encontrados`);
      }
      pedido.itens = itens;
    }
  
    const dataUpdated = {
        ...pedido,
        data: dataCurrent
    }
 
    Object.assign(pedido, pedidoData);
  
    await this.pedidoRepository.save(dataUpdated);
    return { message: 'Pedido atualizado com sucesso!' } 
   }
 

  async remove(id: number): Promise<IResponseMessage> {
    const pedido = await this.findOne(id);  

 
    await this.pedidoRepository.remove(pedido);
    return { message: 'Pedido deletado com sucesso!' } 
  }
}
