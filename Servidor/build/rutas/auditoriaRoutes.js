"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auditoriaController_1 = __importDefault(require("../controllers/auditoriaController"));
class AuditoriaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', auditoriaController_1.default.lista);
    }
}
const auditoriaRoutes = new AuditoriaRoutes();
exports.default = auditoriaRoutes.router;
