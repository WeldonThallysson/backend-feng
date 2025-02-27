"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const item_entity_1 = require("./item.entity");
let ItemService = class ItemService {
    itemRepository;
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async create(item) {
        const data = {
            ...item,
            valor_unitario: Number(item.valor_unitario)
        };
        await this.itemRepository.save(data);
        return { message: 'Item cadastrado com sucesso!' };
    }
    async findAll() {
        return this.itemRepository.find();
    }
    async findOne(id) {
        const item = await this.itemRepository.findOne({
            where: {
                id: id
            }
        });
        if (!item) {
            throw new common_1.NotFoundException(`Item com id ${id} não encontrado`);
        }
        return item;
    }
    async update(id, itemData) {
        const item = await this.findOne(id);
        const data = {
            ...itemData,
            valor_unitario: Number(itemData.valor_unitario)
        };
        Object.assign(item, data);
        await this.itemRepository.save(item);
        return { message: 'Item atualizado com sucesso!' };
    }
    async remove(id) {
        const item = await this.findOne(id);
        await this.itemRepository.remove(item);
        return { message: 'Item deletado com sucesso!' };
    }
};
exports.ItemService = ItemService;
exports.ItemService = ItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(item_entity_1.Item)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ItemService);
//# sourceMappingURL=item.service.js.map