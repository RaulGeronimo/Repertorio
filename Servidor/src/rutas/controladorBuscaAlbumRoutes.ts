import { Router } from "express";
import buscaAlbumController from "../controllers/controladorBuscaAlbumController";

class BuscaAlbumRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/:idAlbum", buscaAlbumController.buscar);
  }
}

const buscaAlbumRoutes = new BuscaAlbumRoutes();
export default buscaAlbumRoutes.router;
