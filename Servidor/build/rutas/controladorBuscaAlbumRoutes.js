"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controladorBuscaAlbumController_1 = __importDefault(require("../controllers/controladorBuscaAlbumController"));
class BuscaAlbumRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/:idAlbum", controladorBuscaAlbumController_1.default.buscar);
    }
}
const buscaAlbumRoutes = new BuscaAlbumRoutes();
exports.default = buscaAlbumRoutes.router;
