import { Request, Response } from "express";
import pool from "../database";

class ArtistaController{
    public async lista(req: Request, res: Response){
        const artista = await pool.query('SELECT * FROM Vista_Artista');
        res.json(artista);
    }

    public async crear(req: Request, res:Response){
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
          await pool.query("CALL crear_artista(?)", [values]);
        res.json({message: 'Se guardo un Artista'});
    }

    public async actualizar(req: Request, res: Response){
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
          await pool.query("CALL actualizar_artista(?,?)", [idArtista, values]);
        res.json({message: 'Se modifico un Artista'});
    }

    public async eliminar(req: Request, res: Response){
        const { idArtista } = req.params;
        const { Usuario } = req.params;
        //await pool.query('DELETE FROM Artista WHERE idArtista = ?', [idArtista]);
        await pool.query("CALL eliminar_artista(?,?)", [idArtista, Usuario]);
        res.json({message: 'Se elimino un Artista'});
    }

    public async buscar(req: Request, res: Response){
        const { idArtista } = req.params;
        const album = await pool.query('SELECT *, DATE_FORMAT(FechaNacimiento, \'%Y-%m-%d\') AS FechaNacimiento FROM Artista WHERE idArtista = ?', [idArtista]);
        if(album.length > 0){
            return res.json(album[0]);
        }
        res.status(404).json({message: 'No existe el Artista'});
    }
}

const artistaController = new ArtistaController(); //devuelve un objeto
export default artistaController; //importa la instancia