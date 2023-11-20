import { Request, Response } from "express";
import pool from "../database";

class AuditoriaController{
    public async lista(req: Request, res:Response){
        const auditoria = await pool.query('SELECT * FROM Auditorias');
        res.json(auditoria)
    }
}
const auditoriaController = new AuditoriaController();
export default auditoriaController;