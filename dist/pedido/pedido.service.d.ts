import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Cliente } from 'src/cliente/cliente.entity';
import { Item } from 'src/item/item.entity';
export declare class PedidoService {
    private pedidoRepository;
    private clienteRepository;
    private itemRepository;
    constructor(pedidoRepository: Repository<Pedido>, clienteRepository: Repository<Cliente>, itemRepository: Repository<Item>);
    findAll(startDate?: string, endDate?: string, value?: number, clienteName?: string): Promise<Pedido[]>;
    findOne(id: number): Promise<Pedido>;
    create(data: {
        client_id: number;
        itens_id: number[];
    }): Promise<Pedido>;
    update(id: number, pedidoData: Partial<{
        client_id: number;
        itens_id: number[];
    }>, userLogged: Cliente): Promise<Pedido>;
    remove(id: number): Promise<void>;
}
