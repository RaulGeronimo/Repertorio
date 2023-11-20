"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_mysql_1 = require("promise-mysql");
const data_1 = require("./data");
exports.pool = (0, promise_mysql_1.createPool)({
    host: data_1.DB_HOST,
    user: data_1.DB_USER,
    password: data_1.DB_PASSWORD,
    database: data_1.DB_NAME,
    port: data_1.DB_PORT,
});
//instalar promise-mysql@3.3.1 si sale error en el getConnection
exports.pool.getConnection().then((connection) => {
    exports.pool.releaseConnection(connection);
    /* pool.query("SET lc_time_names = 'es_MX'"); */
    console.log("Conexion exitosa con:", data_1.DB_NAME);
    console.log("Usuario:", data_1.DB_USER);
});
exports.default = exports.pool;
