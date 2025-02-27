import { Pedido } from '../pedido/pedido.entity';
export declare class Item {
    id: number;
    nome: string;
    descricao: string;
    valor_unitario: number;
    pedido: Pedido[];
}
