const mysql = require('mysql');
const {promisify} = require('util');


const basededatos={
    host: "mysqlrinzler.mysql.database.azure.com",
    user: "sebas@mysqlrinzler",
    password: "uno234567_Diez",
    database: "forumug"     
}

const pool = mysql.createPool(basededatos);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('CONECCION DE LA BASE DE DATOS FUE CERRADA');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE MUCHAS CONECCIONES');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('CONECCION A LA BASE DE DATOS FUE RECHAZADA');
        }
    }

    if(connection) connection.release();
    console.log('DB conectada');
    return 
});

//promisify pool query
pool.query = promisify(pool.query);

module.exports = pool;