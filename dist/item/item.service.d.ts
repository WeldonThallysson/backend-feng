import { Repository } from 'typeorm';
import { Item } from './item.entity';
export declare class ItemService {
    private itemRepository;
    constructor(itemRepository: Repository<Item>);
    create(item: Item): Promise<Item>;
    findAll(): Promise<Item[]>;
    findOne(id: number): Promise<Item>;
    update(id: number, itemData: Partial<Item>): Promise<Item>;
    remove(id: number): Promise<void>;
}
