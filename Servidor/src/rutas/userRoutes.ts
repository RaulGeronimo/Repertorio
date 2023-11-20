import { Router } from "express";
import userController from "../controllers/userController";

class UserRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/', userController.add);
        this.router.get('/:Usuario/:Password', userController.login);
        this.router.get('/:Correo', userController.validar);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;