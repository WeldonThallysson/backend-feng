import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Cliente } from 'src/cliente/cliente.entity';
import { Item } from 'src/item/item.entity';

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

  // Buscar todos os pedidos com filtros
  async findAll(
    startDate?: Date,
    endDate?: Date,
    value?: number,  // Agora, será apenas o valor
    clienteName?: string,
  ): Promise<Pedido[]> {
    const queryBuilder = this.pedidoRepository.createQueryBuilder('pedido')
      .leftJoinAndSelect('pedido.cliente', 'cliente')  // Join com cliente
      .leftJoinAndSelect('pedido.itens', 'item');  // Join com itens

    // Filtro por Data de Início
    if (startDate) {
      queryBuilder.andWhere('pedido.data >= :startDate', { startDate });
    }

    // Filtro por Data de Fim
    if (endDate) {
      queryBuilder.andWhere('pedido.data <= :endDate', { endDate });
    }

    // Filtro por Valor Unitário do Item
    if (value !== undefined) {
      queryBuilder.andWhere('item.valor_unitario = :value', { value });
    }

    // Filtro por Nome do Cliente
    if (clienteName) {
      queryBuilder.andWhere('cliente.nome LIKE :clienteName', {
        clienteName: `%${clienteName}%`,
      });
    }

    return await queryBuilder.getMany();
  }

  // Buscar um pedido por ID
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

  // Criar um novo pedido
  async create(data: { client_id: number, itens_id: number[], data: Date }): Promise<Pedido> {
    const { client_id, itens_id, data: pedidoData } = data;

    // Buscar o cliente pelo id (com a correção no parâmetro)
    const cliente = await this.clienteRepository.findOne({
      where: { id: client_id },  // Use 'where' para especificar a condição
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente com id ${client_id} não encontrado`);
    }

    // Buscar os itens pelo id
    const itens = await this.itemRepository.findByIds(itens_id);
    if (!itens || itens.length === 0) {
      throw new NotFoundException(`Itens não encontrados`);
    }

    // Criar o pedido
    const pedido = this.pedidoRepository.create({
      data: pedidoData,
      cliente,
      itens,
    });

    return await this.pedidoRepository.save(pedido);
  }


  async update(id: number, pedidoData: Partial<Pedido>): Promise<Pedido> {
    const pedido = await this.findOne(id);  
    Object.assign(pedido, pedidoData);  
    return this.pedidoRepository.save(pedido);  
  }

  async remove(id: number): Promise<void> {
    const pedido = await this.findOne(id);  
    await this.pedidoRepository.remove(pedido);
  }
}
