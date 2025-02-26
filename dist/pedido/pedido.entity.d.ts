import { Cliente } from 'src/cliente/cliente.entity';
import { Item } from 'src/item/item.entity';
export declare class Pedido {
    id: number;
    data: string;
    cliente: Cliente;
    itens: Item[];
}
