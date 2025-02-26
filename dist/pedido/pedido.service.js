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
exports.PedidoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pedido_entity_1 = require("./pedido.entity");
const cliente_entity_1 = require("../cliente/cliente.entity");
const item_entity_1 = require("../item/item.entity");
const date_fns_1 = require("date-fns");
const date_fns_tz_1 = require("date-fns-tz");
const fusoHorarioBrasilia = 'America/Sao_Paulo';
let PedidoService = class PedidoService {
    pedidoRepository;
    clienteRepository;
    itemRepository;
    constructor(pedidoRepository, clienteRepository, itemRepository) {
        this.pedidoRepository = pedidoRepository;
        this.clienteRepository = clienteRepository;
        this.itemRepository = itemRepository;
    }
    async findAll(startDate, endDate, value, clienteName) {
        const queryBuilder = this.pedidoRepository
            .createQueryBuilder('pedido')
            .leftJoinAndSelect('pedido.cliente', 'cliente')
            .leftJoinAndSelect('pedido.itens', 'item');
        if (startDate) {
            const start = (0, date_fns_tz_1.toZonedTime)(new Date(startDate), fusoHorarioBrasilia);
            if (isNaN(start.getTime())) {
                throw new common_1.BadRequestException(`Data de início não é válida: ${startDate}`);
            }
            queryBuilder.andWhere('pedido.data >= :startDate', {
                startDate: (0, date_fns_1.format)(start, 'yyyy-MM-dd HH:mm:ss'),
            });
        }
        if (endDate) {
            const end = (0, date_fns_tz_1.toZonedTime)(new Date(endDate), fusoHorarioBrasilia);
            if (isNaN(end.getTime())) {
                throw new common_1.BadRequestException(`Data final não é válida: ${endDate}`);
            }
            queryBuilder.andWhere('pedido.data <= :endDate', {
                endDate: (0, date_fns_1.format)(end, 'yyyy-MM-dd HH:mm:ss'),
            });
        }
        if (value) {
            queryBuilder.andWhere('item.valor_unitario = :value', { value });
        }
        if (clienteName) {
            queryBuilder.andWhere('cliente.nome LIKE :clienteName', {
                clienteName: `%${clienteName}%`,
            });
        }
        const response = await queryBuilder.getMany();
        return response.map((item) => ({
            ...item,
            data: (0, date_fns_1.format)((0, date_fns_tz_1.toZonedTime)(item.data, fusoHorarioBrasilia), 'yyyy-MM-dd HH:mm'),
        }));
    }
    async findOne(id) {
        const pedido = await this.pedidoRepository.findOne({
            where: { id },
            relations: ['cliente', 'itens'],
        });
        if (!pedido) {
            throw new common_1.NotFoundException(`Pedido com id ${id} não encontrado`);
        }
        return pedido;
    }
    async create(data) {
        const { client_id, itens_id } = data;
        const dataCurrent = (0, date_fns_1.format)((0, date_fns_tz_1.toZonedTime)(new Date(), fusoHorarioBrasilia), 'yyyy-MM-dd HH:mm');
        const cliente = await this.clienteRepository.findOne({
            where: { id: client_id },
        });
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente com id ${client_id} não encontrado`);
        }
        const itens = await this.itemRepository.findBy({
            id: (0, typeorm_2.In)(itens_id),
        });
        const pedido = this.pedidoRepository.create({
            data: dataCurrent,
            cliente,
            itens,
        });
        return await this.pedidoRepository.save(pedido);
    }
    async update(id, pedidoData, userLogged) {
        const pedido = await this.findOne(id);
        const dataCurrent = (0, date_fns_1.format)((0, date_fns_tz_1.toZonedTime)(new Date(), fusoHorarioBrasilia), 'yyyy-MM-dd HH:mm');
        if (pedidoData.client_id && pedidoData.client_id !== pedido.cliente.id) {
            if (!userLogged.isAdmin) {
                throw new common_1.ForbiddenException('Você não tem permissão para alterar o cliente desde pedido.');
            }
        }
        if (pedidoData.client_id) {
            const cliente = await this.clienteRepository.findOne({
                where: {
                    id: pedidoData.client_id
                }
            });
            if (!cliente) {
                throw new common_1.NotFoundException(`Cliente com id ${pedidoData.client_id} não encontrado`);
            }
            pedido.cliente = cliente;
        }
        if (pedidoData.itens_id && pedidoData.itens_id.length > 0) {
            const itens = await this.itemRepository.findBy({ id: (0, typeorm_2.In)(pedidoData.itens_id) });
            if (!itens || itens.length === 0) {
                throw new common_1.NotFoundException(`Itens não encontrados`);
            }
            pedido.itens = itens;
        }
        const dataUpdated = {
            ...pedido,
            data: dataCurrent
        };
        Object.assign(pedido, pedidoData);
        return this.pedidoRepository.save(dataUpdated);
    }
    async remove(id) {
        const pedido = await this.findOne(id);
        await this.pedidoRepository.remove(pedido);
    }
};
exports.PedidoService = PedidoService;
exports.PedidoService = PedidoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pedido_entity_1.Pedido)),
    __param(1, (0, typeorm_1.InjectRepository)(cliente_entity_1.Cliente)),
    __param(2, (0, typeorm_1.InjectRepository)(item_entity_1.Item)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PedidoService);
//# sourceMappingURL=pedido.service.js.map