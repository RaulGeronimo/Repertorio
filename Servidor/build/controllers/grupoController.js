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
class GrupoController {
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const grupo = yield database_1.default.query("SELECT * FROM Vista_Grupo");
            res.json(grupo);
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //await pool.query('INSERT INTO Grupo SET ?', [req.body]);
            const values = [
                req.body.Nombre,
                req.body.Origen,
                req.body.Genero,
                req.body.Inicio,
                req.body.Fin,
                req.body.Sellos,
                req.body.Estado,
                req.body.SitioWeb,
                req.body.Idioma,
                req.body.Logo,
                req.body.Usuario,
            ];
            yield database_1.default.query("CALL crear_grupo(?)", [values]);
            res.json({ message: "Se guardo un Grupo" });
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idGrupo } = req.params;
            //await pool.query("UPDATE Grupo SET ? WHERE idGrupo = ?", [ req.body, idGrupo ]);
            const values = [
                req.body.Nombre,
                req.body.Origen,
                req.body.Genero,
                req.body.Inicio,
                req.body.Fin,
                req.body.Sellos,
                req.body.Estado,
                req.body.SitioWeb,
                req.body.Idioma,
                req.body.Logo,
                req.body.Usuario,
            ];
            yield database_1.default.query("CALL actualizar_grupo(?,?)", [idGrupo, values]);
            res.json({ message: "Se modifico un Grupo" });
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idGrupo } = req.params;
            const { Usuario } = req.params;
            //await pool.query("DELETE FROM Grupo WHERE idGrupo = ?", [idGrupo]);
            yield database_1.default.query("CALL eliminar_grupo(?,?)", [idGrupo, Usuario]);
            res.json({ message: "Se elimino un Grupo" });
        });
    }
    buscar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idGrupo } = req.params;
            const grupo = yield database_1.default.query('SELECT *, DATE_FORMAT(Inicio, "%Y-%m-%d") AS Inicio FROM Grupo WHERE idGrupo = ?', [idGrupo]);
            /* const grupo = await pool.query('SELECT * FROM Vista_Grupo WHERE idGrupo = ?', [idGrupo]); */
            if (grupo.length > 0) {
                return res.json(grupo[0]);
            }
            res.status(404).json({ message: "No existe el Grupo" });
        });
    }
}
const grupoController = new GrupoController(); //devuelve un objeto
exports.default = grupoController; //importa la instancia
