const ConexionBD = require("../util/conexionbd");
const pool = ConexionBD.GetBdPool();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const validarLogin = async (req, res) => {
  const { f_usuario, f_clave } = req.body;

  const response = await pool.query(
    'select * from "public".t_usuarios where f_usuario=$1',
    [f_usuario]
  );

  let usuario, claveCorrecta;

  if (response.rows.length > 0) {
    usuario = response.rows[0];

    claveCorrecta =
      usuario === null ? false : await bcrypt.compare(f_clave, usuario.f_clave);
    //Verifico si la clava pasada y luego encriptada, es la misma que la clave encriptada que tengo guardada.
  }

  if (!(usuario && claveCorrecta)) {
    response.status(401).json({
      error: "Usuario o clave invalida",
    });
  } else {
    //Devolvemos el token al usuario

    const usuarioDataToken = {
      codigo: usuario.f_codigo_usuario,
      usuario: usuario.f_usuario,
    };

    const token = jwt.sign(usuarioDataToken, process.env.SECRET, {
      expiresIn: 60 * 60 * 24 * 7,
    });

    res.send({
      usuario: usuario.f_usuario,
      token,
    });

    //res.json(response.rows);
  }
};

module.exports = {
  validarLogin,
};
