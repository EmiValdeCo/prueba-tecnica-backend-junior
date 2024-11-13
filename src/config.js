// Variables seguras desde un archivo .env 
require('dotenv').config();

module.exports = {
    // Variables exportadas para la configuracion del servidor
    app: {
        port: process.env.PORT,
    },
    // Variables exportadas para la conexion con la base de datos
    mysql:{
        host: process.env.MYSQL_HOST, 
        user: process.env.MYSQL_USER, 
        password: process.env.MYSQL_PASSWORD, 
        database: process.env.MYSQL_DB ,
    },
}