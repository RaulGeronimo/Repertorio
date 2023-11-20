import { Router } from "express";
import instrumento_artistaController from "../controllers/instrumento_artistaController";

class Instrumento_ArtistaRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/',instrumento_artistaController.lista);
        this.router.post('/', instrumento_artistaController.crear);
        this.router.put('/:Codigo', instrumento_artistaController.actualizar);
        this.router.delete('/:Codigo', instrumento_artistaController.eliminar);
        this.router.get('/:Codigo',instrumento_artistaController.buscar);
    }
}

const instrumento_ArtistaRoutes = new Instrumento_ArtistaRoutes();
export default instrumento_ArtistaRoutes.router;