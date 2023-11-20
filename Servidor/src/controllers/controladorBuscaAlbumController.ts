import { Request, Response } from "express";
import pool from "../database";

class BuscaAlbumController {
  public async buscar(req: Request, res: Response) {
    const { idAlbum } = req.params;
    const lista = await pool.query(
      "SELECT * FROM Vista_Album WHERE idAlbum = ?",
      [idAlbum]
    );
    if (lista.length > 0) {
      return res.json(lista[0]);
    }
    res.status(404).json({ message: "No se encontro el Álbum" });
  }
}

const buscaAlbumController = new BuscaAlbumController(); //devuelve un objeto
export default buscaAlbumController; //importa la instancia
