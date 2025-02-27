"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
async function handler(req, res) {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.init();
    app.getHttpAdapter().getInstance()(req, res);
}
//# sourceMappingURL=main.js.map