import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';
export declare class ClienteController {
    private readonly clienteService;
    constructor(clienteService: ClienteService);
    create(item: Cliente): Promise<import("../interfaces/interface.response").IResponseMessage>;
    findAll(): Promise<import("../interfaces/interface.clientes").IResponseGetAllClientes[]>;
    findOne(id: number): Promise<Cliente>;
    update(id: number, itemData: Partial<Cliente>): Promise<import("../interfaces/interface.response").IResponseMessage>;
    remove(id: number): Promise<import("../interfaces/interface.response").IResponseMessage>;
}
