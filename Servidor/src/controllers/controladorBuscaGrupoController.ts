import { Request, Response } from "express";
import pool from "../database";

class BuscaGrupoController {
  public async buscar(req: Request, res: Response) {
    const { idGrupo } = req.params;
    const lista = await pool.query(
      "SELECT * FROM Vista_Grupo WHERE idGrupo = ?",
      [idGrupo]
    );
    if (lista.length > 0) {
      return res.json(lista[0]);
    }
    res.status(404).json({ message: "No se encontro el Álbum" });
  }
}

const buscaGrupoController = new BuscaGrupoController(); //devuelve un objeto
export default buscaGrupoController; //importa la instancia
