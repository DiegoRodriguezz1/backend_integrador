const pool = require('../db');

async function getCategoriasByUsuario(usuario_id) {
  const res = await pool.query('SELECT * FROM categorias WHERE usuario_id = $1', [usuario_id]);
  return res.rows;
}

async function createCategoria({ color_hex, nombre, usuario_id }) {
  const res = await pool.query(
    'INSERT INTO categorias (color_hex, nombre, usuario_id) VALUES ($1, $2, $3) RETURNING *',
    [color_hex, nombre, usuario_id]
  );
  return res.rows[0];
}

async function updateCategoria(id, { color_hex, nombre }) {
  const res = await pool.query(
    'UPDATE categorias SET color_hex = $1, nombre = $2 WHERE id = $3 RETURNING *',
    [color_hex, nombre, id]
  );
  return res.rows[0];
}

async function deleteCategoria(id) {
  const res = await pool.query('DELETE FROM categorias WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

async function getCategoriaById(id) {
  const res = await pool.query('SELECT * FROM categorias WHERE id = $1', [id]);
  return res.rows[0];
}

module.exports = {
  getCategoriasByUsuario,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  getCategoriaById,
};