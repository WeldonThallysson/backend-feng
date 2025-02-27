import { PedidoService } from './pedido.service';
import { Pedido } from './pedido.entity';
import { IResponseMessage } from 'src/interfaces/interface.response';
export declare class PedidoController {
    private readonly pedidoService;
    constructor(pedidoService: PedidoService);
    findAll(startDate?: string, endDate?: string, value?: number, clienteName?: string): Promise<Pedido[]>;
    create(body: {
        client_id: number;
        itens_id: number[];
    }): Promise<IResponseMessage>;
    findOne(id: number): Promise<Pedido>;
    update(id: number, pedidoData: Partial<{
        client_id: number;
        itens_id: number[];
    }>, req: any): Promise<IResponseMessage>;
    remove(id: number): Promise<IResponseMessage>;
}
