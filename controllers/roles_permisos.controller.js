const ConexionBD = require("../util/conexionbd");
const pool = ConexionBD.GetBdPool();

const createRol = async (req, res) => {
  const { f_rol, f_estado } = req.body;

  try {
    

    const response = await pool.query(
      'INSERT INTO "public".t_roles (f_rol, f_estado) VALUES ($1, $2) RETURNING f_codigo_rol',
      [f_rol, f_estado]
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

const createPermiso = async (req, res) => {
  const { f_permiso, f_estado } = req.body;

  try {
    

    const response = await pool.query(
      'INSERT INTO "public".t_permisos (f_permiso, f_estado) VALUES ($1, $2) RETURNING f_codigo_permiso',
      [f_permiso, f_estado]
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


const create_Rol_vs_Permiso = async (req, res) => {
  const { f_codigof_rol, f_codigof_permiso } = req.body;

  try {
    

    const response = await pool.query(
      'INSERT INTO "public".t_roles_vs_permisos(f_codigof_rol, f_codigof_permiso) VALUES ($1, $2) RETURNING f_codigof_permiso',
      [f_codigof_rol, f_codigof_permiso]
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

const getPermisosRol = async (req, res) => {
  const codigoRol = req.params.rol;
  const response = await pool.query('select rol.f_rol, per.f_permiso from "public".t_roles rol inner join "public".t_roles_vs_permisos rolVsPer on rol.f_codigo_rol = rolVsPer.f_codigof_rol inner join "public".t_permisos per on per.f_codigo_permiso = rolVsPer.f_codigof_permiso   where rol.f_codigo_rol =$1', [codigoRol]); 
  res.status(200).json(response.rows); 


}








module.exports = {
  createRol,
  createPermiso,
  create_Rol_vs_Permiso,
  getPermisosRol
};
