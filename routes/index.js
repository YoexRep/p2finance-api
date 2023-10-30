//Aqui se define las URL que tendra nuestro servidor API - GET,delete, put, etc

//Necesito un objeto de express para trabajar con las rutas (Router)

const { Router } = require("express");

const router = Router();

// router.post('/CreateAlmacen', CreateAlmacen);

// router.get('/getAlmacenByDescripcion/:des', getAlmacenByDescripcion);
// router.post('/CreateConfigAlmacen', CreateConfigAlmacen);
// router.put('/UpdateAlmacen/:id', UpdateAlmacen);
// router.put('/UpdateAlmacenConfig/:id', UpdateAlmacenConfig);
// router.post('/CreateUbiacionesVsAlmacen', CreateUbiacionesVsAlmacen);

// router.get('/getUbicacionDefecto/:id', getUbicacionDefecto);
// router.get('/getAlmacenConfig', getAlmacenConfig);
// router.get('/getUbicacionesVsAlmacen/:id', getUbicacionesVsAlmacen);
// router.delete('/DeleteUbicaciones_vs_almacen/:id', DeleteUbicaciones_vs_almacen);

// router.put('/UpdateUbiacionesVsAlmacen/:id', UpdateUbiacionesVsAlmacen);

//Micartera
const {
  getMiCartera,
  setMiCartera,
  ping
} = require("../controllers/micartera.controller");
router.get("/getMiCartera/:id", getMiCartera);
router.get("/ping", ping);

router.post("/setMiCartera", setMiCartera);


//Activos
const {
  getActivos
} = require("../controllers/activos.controller");
router.get("/getActivos/:id", getActivos);




module.exports = router;
