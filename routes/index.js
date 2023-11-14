//Aqui se define las URL que tendra nuestro servidor API - GET,delete, put, etc

//Necesito un objeto de express para trabajar con las rutas (Router)

const userExtractor = require('../middleware/userExtractor')

const { Router } = require("express");

const router = Router();


// router.get('/getUbicacionDefecto/:id', getUbicacionDefecto);
// router.get('/getAlmacenConfig', getAlmacenConfig);
// router.get('/getUbicacionesVsAlmacen/:id', getUbicacionesVsAlmacen);
// router.delete('/DeleteUbicaciones_vs_almacen/:id', DeleteUbicaciones_vs_almacen);
// router.put('/UpdateUbiacionesVsAlmacen/:id', UpdateUbiacionesVsAlmacen);

//General
const {ping, createSecuencia, createIdioma, createElemento, createTraduccion,getTraducciones } = require("../controllers/general.controller");
router.get("/ping", ping);

router.post("/createSecuencia", createSecuencia);
router.post("/createIdioma", createIdioma);
router.post("/createElemento", createElemento);
router.post("/createTraduccion", createTraduccion);
router.get('/getTraducciones', getTraducciones);

//Login
const { validarLogin } = require("../controllers/login.controller");
router.post("/validarLogin", validarLogin);


//Usuarios
const { verificarUser, createUser } = require("../controllers/usuarios.controller");
router.post("/createUser", createUser);
router.get('/verificarUser/:usu', verificarUser);




module.exports = router;
