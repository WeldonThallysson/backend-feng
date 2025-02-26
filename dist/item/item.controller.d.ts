import { ItemService } from './item.service';
import { Item } from './item.entity';
export declare class ItemController {
    private readonly itemService;
    constructor(itemService: ItemService);
    create(item: Item): Promise<Item>;
    findAll(): Promise<Item[]>;
    findOne(id: number): Promise<Item>;
    update(id: number, itemData: Partial<Item>): Promise<Item>;
    remove(id: number): Promise<void>;
}
