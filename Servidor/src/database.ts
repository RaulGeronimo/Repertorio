import { createPool } from "promise-mysql";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./data";

export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT as number,
});

//instalar promise-mysql@3.3.1 si sale error en el getConnection
pool.getConnection().then((connection: any) => {
  pool.releaseConnection(connection);
  /* pool.query("SET lc_time_names = 'es_MX'"); */
  console.log("Conexion exitosa con:", DB_NAME);
  console.log("Usuario:", DB_USER);
});

export default pool;
