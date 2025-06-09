const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Jl20031718@2711",
    database: "notas_db"
});

conexion.connect((err) => {
    if (err) {
        console.error('Error de conexión a MySQL:', err);
        return;
    }
    console.log('Conectado a MySQL');
});

module.exports = conexion;
