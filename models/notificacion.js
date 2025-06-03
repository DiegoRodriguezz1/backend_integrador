const pool = require('../db');

async function getNotificacionesByUsuario(usuario_id) {
  const res = await pool.query('SELECT * FROM notificaciones WHERE usuario_id = $1', [usuario_id]);
  return res.rows;
}

async function createNotificacion({ estado, fecha_envio, mensaje, usuario_id }) {
  const res = await pool.query(
    'INSERT INTO notificaciones (estado, fecha_envio, mensaje, usuario_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [estado, fecha_envio, mensaje, usuario_id]
  );
  return res.rows[0];
}

async function updateEstadoNotificacion(id, estado) {
  const res = await pool.query(
    'UPDATE notificaciones SET estado = $1 WHERE id = $2 RETURNING *',
    [estado, id]
  );
  return res.rows[0];
}

async function getNotificacionById(id) {
  const res = await pool.query('SELECT * FROM notificaciones WHERE id = $1', [id]);
  return res.rows[0];
}

module.exports = {
  getNotificacionesByUsuario,
  createNotificacion,
  updateEstadoNotificacion,
  getNotificacionById,
};