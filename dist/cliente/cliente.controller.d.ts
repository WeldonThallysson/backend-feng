import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';
export declare class ClienteController {
    private readonly clienteService;
    constructor(clienteService: ClienteService);
    create(item: Cliente): Promise<Cliente>;
    findAll(): Promise<Cliente[]>;
    findOne(id: number): Promise<Cliente>;
    update(id: number, itemData: Partial<Cliente>): Promise<Cliente>;
    remove(id: number): Promise<void>;
}
