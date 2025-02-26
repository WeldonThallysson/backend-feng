import { Cliente } from './cliente.entity';
import { Repository } from 'typeorm';
export declare class ClienteService {
    private cliente;
    constructor(cliente: Repository<Cliente>);
    create(item: Cliente): Promise<Cliente>;
    findAll(): Promise<Cliente[]>;
    findOne(id: number): Promise<Cliente>;
    update(id: number, itemData: Partial<Cliente>): Promise<Cliente>;
    remove(id: number): Promise<void>;
}
