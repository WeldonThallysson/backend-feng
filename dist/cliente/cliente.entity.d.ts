import { Pedido } from '../pedido/pedido.entity';
export declare class Cliente {
    id: number;
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    isAdmin: boolean;
    pedidos: Pedido[];
}
