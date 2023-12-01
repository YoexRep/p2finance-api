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
const {ping, createSecuencia } = require("../controllers/general.controller");
router.get("/ping", ping);

router.post("/createSecuencia", createSecuencia);


//Login
const { validarLogin } = require("../controllers/login.controller");
router.post("/validarLogin", validarLogin);



//Usuarios
const { verificarUser, createUser } = require("../controllers/usuarios.controller");
router.post("/createUser", createUser);
router.get('/verificarUser/:usu', verificarUser);


//roles_permisos
const {Limpiar_Rol_vs_Permiso, getPermisosRol, create_Rol_vs_Permiso, createPermiso, createRol } = require("../controllers/roles_permisos.controller");
router.post("/createRol", createRol);
router.post("/createPermiso", createPermiso);
router.post("/create_Rol_vs_Permiso", create_Rol_vs_Permiso);
router.get('/getPermisosRol/:rol', getPermisosRol);
router.delete('/Limpiar_Rol_vs_Permiso', Limpiar_Rol_vs_Permiso);

module.exports = router;
