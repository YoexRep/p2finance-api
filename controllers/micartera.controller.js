const ConexionBD = require("../util/conexionbd");
const pool = ConexionBD.GetBdPool();

const ping = async (err, res) => {
  const response = await pool.query("SELECT 1 as Result");
  if (err) {
    console.error("Error al hacer ping a la base de datos:", err);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
  res.json(response.rows);
};

const getMiCartera = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await pool.query(
    "SELECT * FROM micartera where id_usuario = $1",
    [id]
  );
  res.json(response.rows);
};

const setMiCartera = async (req, res) => {
  const { tipo, criptomoneda, cantidad, precio_compra, id_usuario, comision } =
    req.body;

  try {
    await pool.query("BEGIN");

    //Intruccion

    const response = await pool.query(
      'INSERT INTO "public".micartera ( tipo, criptomoneda, cantidad, precio_compra, id_usuario, comision  ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [tipo, criptomoneda, cantidad, precio_compra, id_usuario, comision]
    );

    if (response.rowCount > 0) {
      await pool.query("COMMIT");

      res.status(200).json(response.rows);
    }
  } catch (e) {
    console.log(e);
    res.status(400);
  } finally {
    await pool.query("ROLLBACK");
  }
};

module.exports = {
  getMiCartera,
  setMiCartera,
  ping,
};

// const CreateConfigAlmacen = async (req, res) => {

// const { f_codigof_almacen, f_codigof_ubicacion} = req.body;

// try {

//   await pool.query('BEGIN');

//   //Intruccion

//   const response = await pool.query('INSERT INTO "mangosoft".t_almacen_principal ( f_codigof_almacen, f_codigof_ubicacion ) VALUES ($1, $2) RETURNING f_codigo_almacen_principal', [ f_codigof_almacen, f_codigof_ubicacion ]);

//   if(response.rowCount  > 0 ){

//     await pool.query('COMMIT');

//     res.status(200).json(response.rows);
//   }

// }
// catch (e) {
//   console.log(e);
//   res.status(400);
// }
// finally {

//   await pool.query('ROLLBACK');

// }

// };

// const UpdateAlmacenConfig = async (req, res) => {
// const id = parseInt(req.params.id);
// const {f_codigof_almacen,  f_codigof_ubicacion} = req.body;

// try {

//   await pool.query('BEGIN');

//   //Intruccion

//   const response =await pool.query('UPDATE "mangosoft".t_almacen_principal SET f_codigof_almacen = $1, f_codigof_ubicacion = $2 WHERE f_codigo_almacen_principal = $3', [
//     f_codigof_almacen,  f_codigof_ubicacion, id
//   ]);

//   if(response.rowCount  > 0 ){

//     await pool.query('COMMIT');

//     res.status(200).json('Almacen actualizado');
//   }

// }
// catch (e) {
//   console.log(e);
//   res.status(400);
// }
// finally {

//   await pool.query('ROLLBACK');

// }

// };

// const getAlmacenConfig = async (req, res) => {

// const response = await pool.query('select almconfig.f_codigo_almacen_principal, alm.f_iddepto, alm.f_descripcion,ualm.f_codigo_ubicacion, ualm.f_descripcion_ubicacion  from "mangosoft".t_almacen_principal almconfig left join "public".t_almacen alm on alm.f_iddepto = almconfig.f_codigof_almacen left join "public".t_ubicaciones_almacen ualm on ualm.f_codigo_ubicacion = almconfig.f_codigof_ubicacion');
// res.json(response.rows);
// };
