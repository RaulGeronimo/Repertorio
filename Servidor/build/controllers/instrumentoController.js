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
class InstrumentoController {
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const album = yield database_1.default.query('SELECT * FROM Instrumento ORDER BY Nombre');
            /* const album = await pool.query('SELECT idInstrumento, Nombre, Foto, LEFT(Descripcion, 100) AS Descripcion FROM Instrumento ORDER BY Nombre'); */
            res.json(album);
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* await pool.query('INSERT INTO Instrumento SET ?', [req.body]); */
            const values = [
                req.body.Nombre,
                req.body.Descripcion,
                req.body.Foto,
                req.body.Usuario,
            ];
            yield database_1.default.query('CALL crear_instrumento(?)', [values]);
            res.json({ message: 'Se guardo un Instrumento' });
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstrumento } = req.params;
            /* await pool.query('UPDATE Instrumento SET ? WHERE idInstrumento = ?', [req.body, idInstrumento]); */
            const values = [
                req.body.Nombre,
                req.body.Descripcion,
                req.body.Foto,
                req.body.Usuario,
            ];
            yield database_1.default.query("CALL actualizar_instrumento(?,?)", [idInstrumento, values]);
            res.json({ message: 'Se modifico un Instrumento' });
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstrumento } = req.params;
            const { Usuario } = req.params;
            //await pool.query('DELETE FROM Instrumento WHERE idInstrumento = ?', [idInstrumento]);
            yield database_1.default.query("CALL eliminar_instrumento(?,?)", [idInstrumento, Usuario]);
            res.json({ message: 'Se elimino un Instrumento' });
        });
    }
    buscar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstrumento } = req.params;
            const album = yield database_1.default.query('SELECT * FROM Instrumento WHERE idInstrumento = ?', [idInstrumento]);
            if (album.length > 0) {
                return res.json(album[0]);
            }
            res.status(404).json({ message: 'No existe el Instrumento' });
        });
    }
}
const instrumentoController = new InstrumentoController(); //devuelve un objeto
exports.default = instrumentoController; //importa la instancia
