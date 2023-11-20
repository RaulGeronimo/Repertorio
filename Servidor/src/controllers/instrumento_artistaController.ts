import { query, Request, Response } from "express";
import pool from "../database";

class Instrumento_artistaController{
    public async lista(req: Request, res: Response){
        const grupo = await pool.query('SELECT * FROM Vista_InstrumentoIntegrantes');
        res.json(grupo);
    }

    public async crear(req: Request, res:Response){
        await pool.query('INSERT INTO Instrumento_Artista SET ?', [req.body]);
        res.json({message: 'Se agrego un Instrumento a un Artista'});
    }

    public async actualizar(req: Request, res: Response){
        const { Codigo } = req.params;
        await pool.query('UPDATE Instrumento_Artista SET ? WHERE Codigo = ?', [req.body, Codigo]);
        res.json({message: 'Se modifico un Instrumento a un Artista'});
    }

    public async eliminar(req: Request, res: Response){
        const { Codigo } = req.params;
        await pool.query('DELETE FROM Instrumento_Artista WHERE Codigo = ?', [Codigo]);
        res.json({message: 'Se elimino un Instrumento a un Artista'});
    }

    public async buscar(req: Request, res: Response){
        const { Codigo } = req.params;
        const album = await pool.query('SELECT * FROM Instrumento_Artista WHERE Codigo = ?', [Codigo]);
        if(album.length > 0){
            return res.json(album[0]);
        }
        res.status(404).json({message: 'No existe el Artista'});
    }
}

const instrumento_artistaController = new Instrumento_artistaController();
export default instrumento_artistaController;