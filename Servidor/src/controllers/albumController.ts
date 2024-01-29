import { Request, Response } from "express";
import pool from "../database";

class AlbumController {
  public async lista(req: Request, res: Response) {
    const album = await pool.query("SELECT * FROM Vista_Album");
    res.json(album);
  }

  public async crear(req: Request, res: Response) {
    //await pool.query('INSERT INTO Album SET ?', [req.body]);

    const values = [
      req.body.idGrupo,
      req.body.idDisquera,
      req.body.Nombre,
      req.body.Duracion,
      req.body.Lanzamiento,
      req.body.Grabacion,
      req.body.Genero,
      req.body.Portada,
      req.body.Usuario,
    ];

    await pool.query("CALL crear_album(?)", [values]);
    res.json({ message: "Se guardo un Album" });
  }

  public async actualizar(req: Request, res: Response) {
    const { idAlbum } = req.params;
    //await pool.query("UPDATE Album SET ? WHERE idAlbum = ?", [ req.body, idAlbum ]);
    const values = [
      req.body.idGrupo,
      req.body.idDisquera,
      req.body.Nombre,
      req.body.Duracion,
      req.body.Lanzamiento,
      req.body.Grabacion,
      req.body.Genero,
      req.body.Portada,
      req.body.Usuario,
    ];

    await pool.query("CALL actualizar_album(?,?)", [idAlbum, values]);
    res.json({ message: "Se modifico un Album" });
  }

  public async eliminar(req: Request, res: Response) {
    const { idAlbum } = req.params;
    const { Usuario } = req.params;
    //await pool.query("DELETE FROM Album WHERE idAlbum = ?", [idAlbum]);
    await pool.query("CALL eliminar_album(?,?)", [idAlbum, Usuario]);

    res.json({ message: "Se elimino un Album" });
  }

  public async buscar(req: Request, res: Response) {
    const { idAlbum } = req.params;
    /* const album = await pool.query('SELECT * FROM Vista_Album WHERE idAlbum = ?', [idAlbum]); */
    const album = await pool.query( "SELECT *, DATE_FORMAT(Lanzamiento, '%Y-%m-%d') AS Lanzamiento FROM Album WHERE idAlbum = ?", [idAlbum] );

    if (album.length > 0) {
      return res.json(album[0]);
    }
    res.status(404).json({ message: "No existe el Album" });
  }
}

const albumController = new AlbumController(); //devuelve un objeto
export default albumController; //importa la instancia
