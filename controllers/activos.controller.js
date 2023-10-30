const ConexionBD = require("../util/conexionbd");
const pool = ConexionBD.GetBdPool();

const getActivos = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query(
      "SELECT m.id_usuario, m.criptomoneda as id, SUM(m.cantidad) as value, a.label, a.color FROM public.micartera AS m JOIN public.activos AS a ON m.criptomoneda = a.id_activo WHERE m.id_usuario=$1 GROUP BY m.id_usuario, m.criptomoneda, a.label, a.color",
      [id]
    );
    res.json(response.rows);
  };
  
  
  module.exports = {
    getActivos
  
  };
  