"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', userController_1.default.add);
        this.router.get('/:Usuario/:Password', userController_1.default.login);
        this.router.get('/:Correo', userController_1.default.validar);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
