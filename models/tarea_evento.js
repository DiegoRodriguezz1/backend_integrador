const pool = require('../db');

async function getTareasEventosByUsuario(usuario_id) {
  const res = await pool.query('SELECT * FROM tareas_eventos WHERE usuario_id = $1', [usuario_id]);
  return res.rows;
}

async function createTareaEvento(data) {
  const {
    categoria, descripcion, fecha_fin, fecha_inicio, prioridad,
    recordatorio, recurrencia, titulo, usuario_id
  } = data;
  const res = await pool.query(
    `INSERT INTO tareas_eventos
    (categoria, descripcion, fecha_fin, fecha_inicio, prioridad, recordatorio, recurrencia, titulo, usuario_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [categoria, descripcion, fecha_fin, fecha_inicio, prioridad, recordatorio, recurrencia, titulo, usuario_id]
  );
  return res.rows[0];
}

async function updateTareaEvento(id, data) {
  const {
    categoria, descripcion, fecha_fin, fecha_inicio, prioridad,
    recordatorio, recurrencia, titulo
  } = data;
  const res = await pool.query(
    `UPDATE tareas_eventos SET
      categoria=$1, descripcion=$2, fecha_fin=$3, fecha_inicio=$4,
      prioridad=$5, recordatorio=$6, recurrencia=$7, titulo=$8
      WHERE id=$9 RETURNING *`,
    [categoria, descripcion, fecha_fin, fecha_inicio, prioridad, recordatorio, recurrencia, titulo, id]
  );
  return res.rows[0];
}

async function deleteTareaEvento(id) {
  const res = await pool.query('DELETE FROM tareas_eventos WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

async function getTareaEventoById(id) {
  const res = await pool.query('SELECT * FROM tareas_eventos WHERE id = $1', [id]);
  return res.rows[0];
}

module.exports = {
  getTareasEventosByUsuario,
  createTareaEvento,
  updateTareaEvento,
  deleteTareaEvento,
  getTareaEventoById,
};