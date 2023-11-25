import { Router } from "express";
import userController from "../controllers/userController";

class UserRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/', userController.add);
        this.router.get('/', userController.lista);
        this.router.get('/login/:Usuario/:Password', userController.login);
        this.router.get('/email/:Correo', userController.validar);
        this.router.get('/username/:Usuario', userController.validarUsuario);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;