import { Request, Response } from "express";
import pool from "../database";

class GrupoController {
  public async lista(req: Request, res: Response) {
    const grupo = await pool.query("SELECT * FROM Vista_Grupo");
    res.json(grupo);
  }

  public async crear(req: Request, res: Response) {
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

    await pool.query("CALL crear_grupo(?)", [values]);
    res.json({ message: "Se guardo un Grupo" });
  }

  public async actualizar(req: Request, res: Response) {
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
  
      await pool.query("CALL actualizar_grupo(?,?)", [idGrupo, values]);
    res.json({ message: "Se modifico un Grupo" });
  }

  public async eliminar(req: Request, res: Response) {
    const { idGrupo } = req.params;
    const { Usuario } = req.params;
    //await pool.query("DELETE FROM Grupo WHERE idGrupo = ?", [idGrupo]);
    await pool.query("CALL eliminar_grupo(?,?)", [idGrupo, Usuario]);
    res.json({ message: "Se elimino un Grupo" });
  }

  public async buscar(req: Request, res: Response) {
    const { idGrupo } = req.params;
    const grupo = await pool.query(
      'SELECT *, DATE_FORMAT(Inicio, "%Y-%m-%d") AS Inicio FROM Grupo WHERE idGrupo = ?',
      [idGrupo]
    );
    /* const grupo = await pool.query('SELECT * FROM Vista_Grupo WHERE idGrupo = ?', [idGrupo]); */
    if (grupo.length > 0) {
      return res.json(grupo[0]);
    }
    res.status(404).json({ message: "No existe el Grupo" });
  }
}

const grupoController = new GrupoController(); //devuelve un objeto
export default grupoController; //importa la instancia
