import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { IResponseMessage } from 'src/interfaces/interface.response';
export declare class ItemService {
    private itemRepository;
    constructor(itemRepository: Repository<Item>);
    create(item: Item): Promise<IResponseMessage>;
    findAll(): Promise<Item[]>;
    findOne(id: number): Promise<Item>;
    update(id: number, itemData: Partial<Item>): Promise<IResponseMessage>;
    remove(id: number): Promise<IResponseMessage>;
}
