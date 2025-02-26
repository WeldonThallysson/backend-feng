import { PedidoService } from './pedido.service';
import { Pedido } from './pedido.entity';
export declare class PedidoController {
    private readonly pedidoService;
    constructor(pedidoService: PedidoService);
    findAll(startDate?: string, endDate?: string, value?: number, clienteName?: string): Promise<Pedido[]>;
    create(body: {
        client_id: number;
        itens_id: number[];
    }): Promise<Pedido>;
    findOne(id: number): Promise<Pedido>;
    update(id: number, pedidoData: Partial<{
        client_id: number;
        itens_id: number[];
    }>, req: any): Promise<Pedido>;
    remove(id: number): Promise<void>;
}
