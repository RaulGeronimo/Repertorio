"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controladorBuscaGrupoController_1 = __importDefault(require("../controllers/controladorBuscaGrupoController"));
class BuscaGrupoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/:idGrupo", controladorBuscaGrupoController_1.default.buscar);
    }
}
const buscaGrupoRoutes = new BuscaGrupoRoutes();
exports.default = buscaGrupoRoutes.router;
