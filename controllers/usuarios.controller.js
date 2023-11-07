const ConexionBD = require("../util/conexionbd");
const pool = ConexionBD.GetBdPool();
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { f_usuario, f_clave,f_correo, f_nombre_completo, f_fecha_nacimiento,  f_estado } = req.body;

  try {
    
    //hasheamos la clave antes de guardarla
    const saltRounds = 10;
    const claveHasheada = await bcrypt.hash(f_clave, saltRounds);

    const response = await pool.query(
      'INSERT INTO "public".t_usuarios (f_usuario, f_clave,f_correo, f_nombre_completo, f_fecha_nacimiento,  f_estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING f_codigo_usuario',
      [f_usuario, claveHasheada,f_correo, f_nombre_completo, f_fecha_nacimiento,  f_estado]
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



  const verificarUser = async (req, res) => {
    const usu = req.params.usu;
    const response = await pool.query('select f_usuario from "public".t_usuarios where f_usuario=$1', [usu]); 
    res.status(200).json(response.rows); 
  
  
  }




module.exports = {
  createUser,
  verificarUser
};
