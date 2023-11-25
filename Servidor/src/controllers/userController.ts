import { Request, Response } from "express";
import pool from "../database";

class UserController{
    public async add(req: Request, res: Response){
        const values = [
            req.body.Nombre, 
            req.body.ApellidoPaterno, 
            req.body.ApellidoMaterno, 
            req.body.Usuario,
            req.body.Correo,
            req.body.Password
          ]
        await pool.query('CALL crear_usuario (?)', [values]);
        res.json({message: 'Se guardo un Usuario'});
    }

    public async lista(req: Request, res: Response){
        const usuario = await pool.query('SELECT * FROM Usuario ORDER BY Registro');
        res.json(usuario);
    }

    public async login(req: Request, res: Response){
        const Usuario =  req.params.Usuario;
        const Password =  req.params.Password;
        const user = await pool.query('SELECT * FROM Usuario WHERE (Usuario = ? AND Password = MD5(?)) OR (Correo = ? AND Password = MD5(?))', [Usuario, Password,Usuario, Password]);
        const email = await pool.query('SELECT @Correo :=  Correo FROM Usuario WHERE (Usuario = ? AND Password = MD5(?)) OR (Correo = ? AND Password = MD5(?))', [Usuario, Password,Usuario, Password]);
        console.log(email)
        res.json(user[0]);
    }

    public async validar(req: Request, res: Response){
        const Correo =  req.params.Correo;
        const user = await pool.query('SELECT * FROM Usuario WHERE Correo = ?', [Correo]);
        res.json(user);
    }

    public async validarUsuario(req: Request, res: Response){
        const Usuario =  req.params.Usuario;
        const user = await pool.query('SELECT * FROM Usuario WHERE Usuario = ?', [Usuario]);
        res.json(user);
    }
}

const userController = new UserController(); //devuelve un objeto
export default userController; //importa la instancia