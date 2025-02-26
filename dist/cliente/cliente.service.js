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
exports.ClienteService = void 0;
const common_1 = require("@nestjs/common");
const cliente_entity_1 = require("./cliente.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const validations_utils_1 = require("../utils/validations.utils");
let ClienteService = class ClienteService {
    cliente;
    constructor(cliente) {
        this.cliente = cliente;
    }
    async create(item) {
        if (!validations_utils_1.ValidationUtils.isValidEmail(item.email)) {
            throw new common_1.BadRequestException('Email inválido');
        }
        if (validations_utils_1.ValidationUtils.isValidPhone(item.telefone)) {
            throw new common_1.BadRequestException('Telefone inválido. Seu número deve ter até 11 ou 10 digitos.');
        }
        if (!validations_utils_1.ValidationUtils.isValidPassword(item.senha)) {
            throw new common_1.BadRequestException('Senha deve ter pelo menos 8 caracteres');
        }
        const data = {
            nome: item.nome,
            email: item.email,
            telefone: item.telefone,
            senha: await bcrypt.hash(item.senha, 10),
        };
        return this.cliente.save(data);
    }
    async findAll() {
        return this.cliente.find();
    }
    async findOne(id) {
        const item = await this.cliente.findOne({
            where: {
                id: id,
            },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Cliente com id ${id} não encontrado`);
        }
        return item;
    }
    async update(id, itemData) {
        const item = await this.cliente.findOne({
            where: { id },
        });
        if (itemData.email && !validations_utils_1.ValidationUtils.isValidEmail(itemData.email)) {
            throw new common_1.BadRequestException('Email inválido');
        }
        if (itemData.telefone && !validations_utils_1.ValidationUtils.isValidPhone(itemData.telefone)) {
            throw new common_1.BadRequestException('Telefone inválido. Use o formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX');
        }
        if (itemData.senha && !validations_utils_1.ValidationUtils.isValidPassword(itemData.senha)) {
            throw new common_1.BadRequestException('Senha deve ter pelo menos 8 caracteres');
        }
        if (!itemData.senha) {
            itemData.senha = item?.senha;
        }
        else {
            itemData.senha = await bcrypt.hash(itemData.senha, 10);
        }
        const dataUpdate = {
            nome: itemData.nome,
            email: itemData.email,
            telefone: itemData.telefone,
            senha: await bcrypt.hash(itemData.senha ?? '', 10),
            isAdmin: itemData.isAdmin
        };
        Object.assign(item, dataUpdate);
        return this.cliente.save(dataUpdate);
    }
    async remove(id) {
        const item = await this.findOne(id);
        await this.cliente.remove(item);
    }
};
exports.ClienteService = ClienteService;
exports.ClienteService = ClienteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(cliente_entity_1.Cliente)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ClienteService);
//# sourceMappingURL=cliente.service.js.map