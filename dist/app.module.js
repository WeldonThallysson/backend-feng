"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const pedido_module_1 = require("./pedido/pedido.module");
const cliente_module_1 = require("./cliente/cliente.module");
const item_module_1 = require("./item/item.module");
const cliente_entity_1 = require("./cliente/cliente.entity");
const item_entity_1 = require("./item/item.entity");
const pedido_entity_1 = require("./pedido/pedido.entity");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: 'postgresql://neondb_owner:npg_a0b1jNvlMYuq@ep-flat-rain-a8lohvry.eastus2.azure.neon.tech/neondb?sslmode=require',
                entities: [cliente_entity_1.Cliente, pedido_entity_1.Pedido, item_entity_1.Item],
                synchronize: true,
            }),
            pedido_module_1.PedidoModule,
            cliente_module_1.ClienteModule,
            item_module_1.ItemModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map