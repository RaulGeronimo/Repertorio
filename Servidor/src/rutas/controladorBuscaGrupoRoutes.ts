import { Router } from "express";
import buscaGrupoController from "../controllers/controladorBuscaGrupoController";

class BuscaGrupoRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/:idGrupo", buscaGrupoController.buscar);
  }
}

const buscaGrupoRoutes = new BuscaGrupoRoutes();
export default buscaGrupoRoutes.router;
