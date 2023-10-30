require("dotenv").config(); //Para poder utilizar las variables de entorno

const express = require("express"); //Para utilizar el servidor de express
var cors = require("cors");

const app = express();

//midlewares -- Son funciones que se ejecutan antes de que lleguen a las rutas
app.use(express.json({ limit: "500mb" }));
//app.use(express.urlencoded({limit: '100mb'}));
app.use(express.json()); //Esto es para que el servidor entienda los formatos JSON.
app.use(express.urlencoded({ extended: false })); //Esto es para que el servidor entienda tambien los formularios enviados. el atributo extended es para que no se acepte imagenes, solo texto plano

/*const whitelist = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://dashfinance-api-production.up.railway.app",
]; // Solo los dominios que ponga aqui en mi white list podran hacer peticiones a mi api
*/
//app.use(cors({ origin: whitelist }));
app.use(cors()); // Si no le indico un whilelist, la api permitira todas las peticiones de cualquier origen

// UTC +00:00
//console.log(new Date());

//Routes -- Importo el archivo de las rutas
app.use(require("../routes/index"));

const Puerto = process.env.PORT || 5000;

app.listen(Puerto); // Se le asigna el puerto en el que estara escuchando esta API

console.log("Server on port " + Puerto);

//El comando para correr el proyecto es el "npm run API"- esta en el packagejson
