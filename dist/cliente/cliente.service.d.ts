import { Cliente } from './cliente.entity';
import { Repository } from 'typeorm';
import { IResponseMessage } from 'src/interfaces/interface.response';
import { IResponseGetAllClientes } from 'src/interfaces/interface.clientes';
export declare class ClienteService {
    private cliente;
    constructor(cliente: Repository<Cliente>);
    create(item: Cliente): Promise<IResponseMessage>;
    findAll(): Promise<IResponseGetAllClientes[]>;
    findOne(id: number): Promise<Cliente>;
    update(id: number, itemData: Partial<Cliente>): Promise<IResponseMessage>;
    remove(id: number): Promise<IResponseMessage>;
}
