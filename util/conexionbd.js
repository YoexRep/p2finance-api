
require('dotenv').config(); //Para poder utilizar las variables de entorno

module.exports = {
    GetBdPool: function() {

        const { Pool} = require('pg'); //Export desde el driver pg, el objeto Pool, para hacer peticiones a la base de datos.

    
        //Aqui instacion el pool, y le paso los datos de conexion a la bd
        const pool = new Pool ({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
          
        
        });


 
       return pool;


    }
 }

