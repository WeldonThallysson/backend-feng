import { Pedido } from "src/pedido/pedido.entity";



export interface IResponseGetAllClientes {
    id:  number,
    nome: string,
    email: string,
    telefone: string,
    isAdmin: boolean,
    pedidos: Pedido[],

}