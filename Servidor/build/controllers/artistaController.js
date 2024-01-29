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
class ArtistaController {
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const artista = yield database_1.default.query('SELECT * FROM Vista_Artista');
            res.json(artista);
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //await pool.query('INSERT INTO Artista SET ?', [req.body]);
            const values = [
                req.body.Nombre,
                req.body.NombreArtistico,
                req.body.Genero,
                req.body.FechaNacimiento,
                req.body.FechaFinado,
                req.body.Estatura,
                req.body.idNacionalidad,
                req.body.Instrumentos,
                req.body.TipoVoz,
                req.body.Foto,
                req.body.Usuario,
            ];
            yield database_1.default.query("CALL crear_artista(?)", [values]);
            res.json({ message: 'Se guardo un Artista' });
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idArtista } = req.params;
            //await pool.query('UPDATE Artista SET ? WHERE idArtista = ?', [req.body, idArtista]);
            const values = [
                req.body.Nombre,
                req.body.NombreArtistico,
                req.body.Genero,
                req.body.FechaNacimiento,
                req.body.FechaFinado,
                req.body.Estatura,
                req.body.idNacionalidad,
                req.body.Instrumentos,
                req.body.TipoVoz,
                req.body.Foto,
                req.body.Usuario,
            ];
            yield database_1.default.query("CALL actualizar_artista(?,?)", [idArtista, values]);
            res.json({ message: 'Se modifico un Artista' });
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idArtista } = req.params;
            const { Usuario } = req.params;
            //await pool.query('DELETE FROM Artista WHERE idArtista = ?', [idArtista]);
            yield database_1.default.query("CALL eliminar_artista(?,?)", [idArtista, Usuario]);
            res.json({ message: 'Se elimino un Artista' });
        });
    }
    buscar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idArtista } = req.params;
            const album = yield database_1.default.query('SELECT *, DATE_FORMAT(FechaNacimiento, \'%Y-%m-%d\') AS FechaNacimiento FROM Artista WHERE idArtista = ?', [idArtista]);
            if (album.length > 0) {
                return res.json(album[0]);
            }
            res.status(404).json({ message: 'No existe el Artista' });
        });
    }
}
const artistaController = new ArtistaController(); //devuelve un objeto
exports.default = artistaController; //importa la instancia
