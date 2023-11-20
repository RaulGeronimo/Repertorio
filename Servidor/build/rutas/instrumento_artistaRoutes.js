"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const instrumento_artistaController_1 = __importDefault(require("../controllers/instrumento_artistaController"));
class Instrumento_ArtistaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', instrumento_artistaController_1.default.lista);
        this.router.post('/', instrumento_artistaController_1.default.crear);
        this.router.put('/:Codigo', instrumento_artistaController_1.default.actualizar);
        this.router.delete('/:Codigo', instrumento_artistaController_1.default.eliminar);
        this.router.get('/:Codigo', instrumento_artistaController_1.default.buscar);
    }
}
const instrumento_ArtistaRoutes = new Instrumento_ArtistaRoutes();
exports.default = instrumento_ArtistaRoutes.router;
