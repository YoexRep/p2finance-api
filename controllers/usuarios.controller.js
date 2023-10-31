const ConexionBD = require("../util/conexionbd");
const pool = ConexionBD.GetBdPool();
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { f_usuario, f_clave, f_estado } = req.body;

  try {
    //Intruccion
    //hasheamos la clave antes de guardarla
    const saltRounds = 10;
    const claveHasheada = await bcrypt.hash(f_clave, saltRounds);

    const response = await pool.query(
      'INSERT INTO "public".t_usuarios ( f_usuario, f_clave, f_estado) VALUES ($1, $2, $3) RETURNING f_codigo_usuario',
      [f_usuario, claveHasheada, f_estado]
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
  createUser,
};
