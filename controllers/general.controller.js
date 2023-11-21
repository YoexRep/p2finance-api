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






  




module.exports = {
  ping,
  createSecuencia
};
