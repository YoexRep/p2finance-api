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

const createSecuencia = async (req, res) => {
  const { f_tabla, f_secuencia_string, f_secuencia_numerica } = req.body;

  try {
    

    const response = await pool.query(
      'INSERT INTO "public".t_secuencias (f_tabla, f_secuencia_string, f_secuencia_numerica ) VALUES ($1, $2, $3) RETURNING f_tabla',
      [f_tabla, f_secuencia_string, f_secuencia_numerica]
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

const createIdioma = async (req, res) => {
  const { f_idioma, f_activo } = req.body;

  try {
    

    const response = await pool.query(
      'INSERT INTO "public".t_idiomas (f_idioma, f_activo ) VALUES ($1, $2) RETURNING f_codigo_idioma',
      [f_idioma, f_activo]
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


const createElemento = async (req, res) => {
  const { f_elemento, f_activo } = req.body;

  try {
    

    const response = await pool.query(
      'INSERT INTO "public".t_elementos (f_elemento, f_activo ) VALUES ($1, $2) RETURNING f_codigo_elemento',
      [f_elemento, f_activo]
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

const createTraduccion = async (req, res) => {
  const { f_codigof_idioma, f_codigof_elemento, f_traduccion } = req.body;

  try {
    

    const response = await pool.query(
      'INSERT INTO "public".t_traducciones (f_codigof_idioma, f_codigof_elemento, f_traduccion  ) VALUES ($1, $2, $3) RETURNING f_codigo_traduccion',
      [f_codigof_idioma, f_codigof_elemento, f_traduccion ]
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

const getTraducciones = async (req, res) => {

  const response = await pool.query('select * "public".t_traducciones '); 
  res.status(200).json(response.rows); 


}





  




module.exports = {
  ping,
  createSecuencia,
  createIdioma,
  createElemento,
  createTraduccion,
  getTraducciones
};
