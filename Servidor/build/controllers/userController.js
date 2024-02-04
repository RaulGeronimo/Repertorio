"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class UserController {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = [
                req.body.Nombre,
                req.body.ApellidoPaterno,
                req.body.ApellidoMaterno,
                req.body.Usuario,
                req.body.Correo,
                req.body.Password,
                req.body.FechaNacimiento
            ];
            yield database_1.default.query('CALL crear_usuario (?)', [values]);
            res.json({ message: 'Se guardo un Usuario' });
        });
    }
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield database_1.default.query('SELECT * FROM Vista_Usuarios');
            res.json(usuario);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = [
                req.params.Usuario,
                req.params.Password
            ];
            const user = yield database_1.default.query('CALL buscar_usuario (?)', [values]);
            res.json(user[0]);
        });
    }
    validar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Correo = req.params.Correo;
            const user = yield database_1.default.query('SELECT * FROM Usuario WHERE Correo = ?', [Correo]);
            res.json(user);
        });
    }
    validarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Usuario = req.params.Usuario;
            const user = yield database_1.default.query('SELECT * FROM Usuario WHERE Usuario = ?', [Usuario]);
            res.json(user);
        });
    }
}
const userController = new UserController(); //devuelve un objeto
exports.default = userController; //importa la instancia
