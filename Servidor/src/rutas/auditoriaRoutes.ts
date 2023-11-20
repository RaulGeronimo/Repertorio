import { Router } from "express";
import auditoriaController from "../controllers/auditoriaController";

class AuditoriaRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', auditoriaController.lista);
    }
}

const auditoriaRoutes = new AuditoriaRoutes();
export default auditoriaRoutes.router;